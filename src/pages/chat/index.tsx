import React, { useEffect, useState, useRef, useCallback } from "react";
import { database } from "@/lib/firebase";
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  get,
  onValue,
  endBefore
} from "firebase/database";
import { useRouter } from "next/router";
import axios from "axios";
import useUserStore from "@/stores/user";
import { useInView } from "react-intersection-observer";
import RandomBackgroundImages from "@/components/RandomBackground";
import IconBack from "@/components/icons/back";
import { summaryChat } from "@/api/auth";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loadingLottie from "public/icons/lottie_loading.json";

interface Message {
  user: string;
  text: string;
  timestamp: number;
  status: string;
  created_at: number;
  updated_at: number;
  created_by: string;
}

const moods = [
  { name: "ความสุข", color: "bg-green-500" },
  { name: "ความรัก", color: "bg-pink-500" },
  { name: "ความโกรธ", color: "bg-red-500" },
  { name: "ความเศร้า", color: "bg-blue-500" },
  { name: "ความกลัว", color: "bg-yellow-500" },
  { name: "ประหลาดใจ", color: "bg-purple-500" }
];

const Chat: React.FC = () => {
  const router = useRouter();
  const storeUser = useUserStore((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [moodSelected, setMoodSelected] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const lastMessageTimestamp = useRef<number | null>(null);
  const { ref: topRef, inView } = useInView({
    root: chatRef.current,
    threshold: 1
  });

  const [userColor, setUserColor] = useState<string>("core-lightBlue");
  const [sendingMessage, setSendingMessage] = useState(false);

  const fetchMoreMessages = useCallback(async () => {
    if (!chatId || loading || !lastMessageTimestamp.current) return;

    // setLoading(true);
    const messagesRef = ref(database, `Chat/${chatId}/messages`);
    const messagesQuery = query(
      messagesRef,
      limitToLast(21),
      orderByChild("created_at"),
      endBefore(lastMessageTimestamp.current)
    );
    const snapshot = await get(messagesQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const newMessages = Object.values(data) as Message[];
      if (newMessages.length > 0) {
        setMoodSelected(true);
        lastMessageTimestamp.current = newMessages[0].created_at;
        setMessages((prevMessages) =>
          [...newMessages.slice(0, -1), ...prevMessages].sort(
            (a, b) => a.created_at - b.created_at
          )
        );
      }
    }

    setLoading(false);
  }, [chatId, loading]);

  useEffect(() => {
    const fetchInitialData = async () => {
      console.log("storeUser", storeUser);
      try {
        const response = await axios.post<{ data: { chat: { id: string } } }>(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/chat/today`,
          { uid: storeUser?.uid }
        );

        console.log("fetchInitialData", response);
        const chatId = response.data.data.chat.id;
        // setLoading(true);
        setChatId(chatId);

        const messagesRef = ref(database, `Chat/${chatId}/messages`);
        const messagesQuery = query(
          messagesRef,
          limitToLast(20),
          orderByChild("created_at")
        );

        // Use onValue for real-time updates
        const unsubscribe = onValue(messagesQuery, (snapshot) => {
          const updatedMessages: Message[] = [];

          setMoodSelected(true);
          snapshot.forEach((childSnapshot) => {
            updatedMessages.push(childSnapshot.val() as Message);
          });

          if (updatedMessages.length > 0) {
            lastMessageTimestamp.current = updatedMessages[0].created_at;
            setMessages(
              updatedMessages.sort((a, b) => a.created_at - b.created_at)
            );
            // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        });

        setLoading(false);
        // Return the unsubscribe function
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    let unsubscribe: (() => void) | undefined;

    if (storeUser) {
      fetchInitialData().then((unsub) => {
        unsubscribe = unsub;
      });
    }

    setLoading(false);

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [storeUser]);

  useEffect(() => {
    if (inView && !loading) {
      fetchMoreMessages();
    }
    // setLoading(false);
  }, [inView, loading, fetchMoreMessages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !sendingMessage) {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "" || sendingMessage) return;

    setSendingMessage(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/chat/send`, {
        chatId,
        uid: storeUser?.uid,
        text: newMessage
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      // Update the message status to "failed" in case of an error
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const messageIndex = updatedMessages.findIndex(
          (msg) =>
            msg.text === newMessage &&
            msg.created_by !== "user" &&
            msg.status === "pending"
        );
        if (messageIndex !== -1) {
          updatedMessages[messageIndex].status = "failed";
        }
        return updatedMessages;
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const selectMood = async (mood) => {
    setMoodSelected(true);
    // Handle mood selection logic here
    console.log("Selected mood:", mood);
    await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/chat/send`, {
      chatId,
      uid: storeUser?.uid,
      text: "สวัสดี sunny วันนี้ฉันรู้สึก" + mood
    });
  };

  if (loading && !chatId) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full flex justify-center items-center">
          <Lottie
            animationData={loadingLottie}
            className="flex flex-1 justify-center items-center w-48 h-48"
            loop={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-IBMPlexSanThai">
      <div className="">
        <RandomBackgroundImages />
      </div>
      <div className="w-[80vw] p-4 shadow-md rounded-lg z-10 min-h-[80vh] flex flex-col bg-white/80">
        <div className="navbar p-4">
          <div>
            <button
              onClick={() => router.back()}
              className="self-start mr-2 rounded-lg hover:opacity-60"
            >
              <IconBack className="" width={24} height={24} color="#979797" />
            </button>
          </div>

          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold"></h1>
          </div>
          <div
            className="btn btn-primary hover:transform hover:scale-105 transition-transform duration-300 shadow-lg"
            onClick={async () => {
              setLoading(true); // Set loading state to true
              try {
                const res = await summaryChat(storeUser?.uid);

                await router.push("/calendar?chatId=" + chatId);
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false); // Set loading state to false
              }
            }}
          >
            สรุปเรื่องราวในวันนี้
          </div>
        </div>
        <div
          className="flex-grow overflow-y-auto p-4 rounded-lg bg-core-grey/10"
          ref={chatRef}
        >
          <div ref={messageEndRef} />

          <div className="space-y-4 flex-grow">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.created_by !== "user"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`rounded-lg p-2 max-w-xs ${
                    message.created_by !== "user"
                      ? "bg-core-orange text-white"
                      : `bg-${userColor} text-white`
                  }`}
                >
                  {(message.created_by === "user" &&
                    message.status === "pending") ||
                  (message.created_by === "system" &&
                    (message.status === "pending" ||
                      message.status === "processing")) ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : message.status === "failed" && !message.text ? (
                    <span className="text-red-500">Failed to send message</span>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
          </div>
          <div ref={topRef} />
        </div>
        <div className="p-4">
          {messages.length == 0 && !moodSelected ? (
            <div className="space-y-4">
              <h2 className="text-center text-lg font-semibold">
                เลือกอารมณ์ของวันนี้ ?
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.name}
                    className={`p-2 rounded-lg text-white ${mood.color}`}
                    onClick={() => selectMood(mood.name)}
                  >
                    {mood.name}
                  </button>
                ))}
              </div>
              <button
                className="mt-4 w-full py-2 bg-gray-300 text-white rounded-full shadow-md hover:bg-gray-400 transition duration-300 ease-in-out"
                onClick={() => setMoodSelected(true)}
              >
                ยืนยัน
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`flex-grow p-2 rounded-lg focus:outline-none border-${userColor} border-2`}
                placeholder="ส่ง..."
                disabled={sendingMessage}
              />
              <button
                onClick={sendMessage}
                className={`p-2 bg-${userColor} text-white rounded-lg`}
                disabled={sendingMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
