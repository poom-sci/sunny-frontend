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

interface Message {
  user: string;
  text: string;
  timestamp: number;
  status: string;
  created_at: number;
  updated_at: number;
  created_by: string;
}

const Chat: React.FC = () => {
  const router = useRouter();
  const storeUser = useUserStore((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const lastMessageTimestamp = useRef<number | null>(null);
  const { ref: topRef, inView } = useInView({
    root: chatRef.current,
    threshold: 1
  });

  const [userColor, setUserColor] = useState<string>("core-lightBlue");

  const fetchMoreMessages = useCallback(async () => {
    if (!chatId || loading || !lastMessageTimestamp.current) return;

    setLoading(true);
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
    const chatId = router.query.id as string;
    const fetchInitialData = async () => {
      try {
        // const response = await axios.post<{ data: { chat: { id: string } } }>(
        //   `${process.env.NEXT_PUBLIC_API_ENDPOINT}/chat/today`,
        //   { uid: storeUser?.uid }
        // );

        // console.log("fetchInitialData", response);
        // const chatId = chatId
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
          snapshot.forEach((childSnapshot) => {
            updatedMessages.push(childSnapshot.val() as Message);
          });

          if (updatedMessages.length > 0) {
            lastMessageTimestamp.current = updatedMessages[0].created_at;
            setMessages(
              updatedMessages.sort((a, b) => a.created_at - b.created_at)
            );
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        });

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
  }, [inView, loading, fetchMoreMessages]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

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
          updatedMessages[messageIndex].status = "pending";
        }
        return updatedMessages;
      });
    }
  };

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
            onClick={() => {
              router.push("/calendar?chatId=" + chatId);
              //   summaryChat(storeUser?.uid);
            }}
          >
            อ่านสรุปเรื่องราว
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
        {/* <div className="p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={`flex-grow p-2 rounded-lg focus:outline-none border-${userColor} border-2`}
              placeholder="ส่ง..."
            />
            <button
              onClick={sendMessage}
              className={`p-2 bg-${userColor} text-white rounded-lg`}
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
        </div> */}
      </div>
    </div>
  );
};

export default Chat;
