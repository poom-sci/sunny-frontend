import React from "react";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/th";
import RandomBackgroundImages from "@/components/RandomBackground";

import { useEffect, useState } from "react";
import CustomRadialBarChart from "@/components/RadialBarChart";

import useUserStore from "@/stores/user";
import app from "@/lib/firebase";
import { getAuth } from "firebase/auth";

// api
import {
  getUser,
  getMoodCurrentWeek,
  getAllSummary,
  getGoal
} from "@/api/auth";
import userStore from "@/stores/user";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loadingLottie from "public/icons/lottie_loading.json";

app();

moment.locale("th");

interface Goal {
  id: number;
  title: string;
  count: number;
  duration: number;
  icon: string;
  bgColor: string;
  textColor: string;
}

// const goals: Goal[] = [
//   {
//     id: 1,
//     title: "ทำงานบ้าน",
//     progress: 10,
//     total: 10,
//     icon: "📖",
//     bgColor: "bg-core-orange",
//     textColor: "text-white"
//   },
//   {
//     id: 2,
//     title: "ออกกำลังกาย",
//     progress: 9,
//     total: 10,
//     icon: "📖",
//     bgColor: "bg-core-lightBlue",
//     textColor: "text-white"
//   },
//   {
//     id: 3,
//     title: "อ่านหนังสือ",
//     progress: 7,
//     total: 10,
//     icon: "📖",
//     bgColor: "bg-core-coral",
//     textColor: "text-white"
//   },
//   {
//     id: 4,
//     title: "ดูซีรี่ย์",
//     progress: 4,
//     total: 10,
//     icon: "📖",
//     bgColor: "bg-core-lightGreen",
//     textColor: "text-white"
//   }
// ];

const Greeting = ({ name }) => {
  const [greeting, setGreeting] = useState("");
  const [color, setColor] = useState("purple-100");

  useEffect(() => {
    const updateGreeting = () => {
      const hours = new Date().getHours();
      if (hours >= 5 && hours < 12) {
        setGreeting("สวัสดียามเช้า☀️");
        setColor("misc-600");
      } else if (hours >= 12 && hours < 18) {
        setGreeting("สวัสดียามบ่าย🌤️");
        setColor("misc-500");
      } else if (hours >= 18 && hours < 21) {
        setGreeting("สวัสดียามเย็น");
        setColor("core-grey");
      } else {
        setGreeting("สวัสดียามค่ำคืน⭐️");
        setColor("purple-100");
      }
    };

    updateGreeting();
  }, []);

  return (
    <div className="flex justify-between items-center">
      <h2 className={`text-xl font-bold text-${color}`}>
        {greeting} <span className="text-black font-bold">{name}</span>
      </h2>
      <i className="fa fa-bell text-gray-500"></i>
    </div>
  );
};

const Button = ({ color, text, icon, onClick }) => (
  <button
    className="w-full text-2xl flex items-center justify-between p-4 text-white rounded-tl-md rounded-bl-2xl rounded-tr-2xl rounded-br-md hover:opacity-80 shadow-lg"
    style={{ backgroundColor: color }}
    onClick={onClick}
  >
    <span className="font-semibold">{text}</span>
    <i className={`fa ${icon}`}></i>
  </button>
);

const HistoryItem = ({ date, text, color, mood, chatId }) => {
  const formattedDate = moment(date).format("DD MMMM YYYY");
  const router = useRouter();
  return (
    <div
      className={`flex items-center space-x-4 min-w-max px-4 py-6 border-2 border-[${color}] rounded-tl-md rounded-bl-2xl rounded-tr-2xl rounded-br-md shadow-lg cursor-pointer`}
      onClick={() => {
        router.push(`/chat/${chatId}`);
      }}
    >
      {/* <img
        // src={image}
        alt={text}
        className="w-12 h-12 rounded-full object-cover"
      /> */}
      <div>
        <p className="text-gray-700">{formattedDate}</p>
        <p className="text-orange-500">{mood}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  const [summaryList, setSummaryList] = useState([]);

  // const historyData = [
  //   {
  //     date: "2023-06-26",
  //     text: "ความสุขสันต์",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/en/f/fd/Pusheen_the_Cat.png",
  //     color: "#FA805F"
  //   },
  //   {
  //     date: "2023-06-27",
  //     text: "ความสุขสันต์",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/en/f/fd/Pusheen_the_Cat.png",
  //     color: "#FA805F"
  //   }
  //   // Add more items as needed
  // ];

  // const fetchUserInfo = async () => {
  //   const auth = getAuth();
  //   const currentUser = auth.currentUser;
  //   if (currentUser) {
  //     const token = await currentUser.getIdToken();
  //     const DbUser = await getUser(currentUser.uid, token);

  //     await setUser({
  //       id: DbUser.data.userId,
  //       email: DbUser.data.email,
  //       userName: DbUser.data.userName,
  //       uid: DbUser.data.firebaseUid,
  //       token: token,
  //       displayImage: DbUser.data.displayImage,
  //       isEmailVerified: DbUser.data.isEmailVerified
  //     });
  //   } else {
  //     console.log("logout");
  //   }
  // };

  const [goals, setGoals] = useState([]);
  const fetchSummaryAll = async () => {
    const auth = getAuth();

    // const currentUser = auth.currentUser;

    auth.onAuthStateChanged(async (user) => {
      const summary = await getAllSummary(user.uid);

      console.log("asdfasdf", summaryList);
      setSummaryList(summary.data);
    });

    // const currentUser = auth.currentUser;
    // if (currentUser) {
    //   const token = await currentUser.getIdToken();
    //   const DbUser = await getUser(currentUser.uid, token);

    //   await setUser({
    //     id: DbUser.data.userId,
    //     email: DbUser.data.email,
    //     userName: DbUser.data.userName,
    //     uid: DbUser.data.firebaseUid,
    //     token: token,
    //     displayImage: DbUser.data.displayImage,
    //     isEmailVerified: DbUser.data.isEmailVerified
    //   });

    //   const moodCurrentWeek = await getMoodCurrentWeek(
    //     currentUser.uid,
    //     token
    //   );
    //   console.log("moodCurrentWeek", moodCurrentWeek);

    //   const summaryAll = await getAllSummary(currentUser.uid, token);
    //   console.log("summaryAll", summaryAll);
    // } else {
    //   console.log("logout");
    // }
  };

  useEffect(() => {
    fetchSummaryAll();

    if (!user) return;

    const fetchGoal = async () => {
      const resp = await getGoal(user.uid);
      setGoals(resp.data);
    };

    fetchGoal();
  }, [user]);

  if (!user) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-IBMPlexSanThai my-4">
      <div className="">
        <RandomBackgroundImages />
      </div>
      <div className="w-full max-w-[80vw] p-4 bg-white shadow-md rounded-lg z-10">
        <Greeting name={user.userName} />
        <div className="flex justify-center m-4 h-[250px]">
          <CustomRadialBarChart />
        </div>

        {goals.length > 0 ? (
          <>
            <hr className="my-4" />
            <div className="flex flex-row overflow-x-auto">
              {goals?.map((goal) => (
                <div
                  key={goal.id}
                  className={`p-4 rounded-lg shadow-lg flex flex-col min-w-[120px] m-2 items-center bg-core-lightBlue`}
                  // onClick={() => {
                  //   // Goal click functionality here
                  // }}
                >
                  <div className="text-3xl">{goal.icon}</div>
                  <div className="flex-1 flex-col items-center justify-center">
                    <h2 className={`text-lg font-semibold ${goal.textColor}`}>
                      {goal.title}
                    </h2>
                    <div className="text-white text-center">
                      {goal.count}/{goal.duration}
                    </div>
                    {/* <div className="btn btn-circle shadow-xl">✅</div> */}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
        <hr className="my-4" />
        <div className="space-y-4">
          <Button
            color="#77C59B"
            text="ข้อมูลของฉัน"
            icon="fa-user"
            onClick={() => {
              router.push("/account");
            }}
          />
          <Button
            color="#60B2DA"
            text="พูดคุยกับซันนี่"
            icon="fa-comment"
            onClick={() => {
              router.push("/chat");
            }}
          />
          <Button
            color="#FA805F"
            text="ปฏิทินอารมณ์"
            icon="fa-calendar-alt"
            onClick={() => {
              router.push("/calendar");
            }}
          />
          <Button
            color="#F69D2C"
            text="เป้าหมายของฉัน"
            icon="fa-bullseye"
            onClick={() => {
              router.push("/goal");
            }}
          />
        </div>
        {summaryList.length !== 0 ? (
          <div className="mt-6">
            <h3 className="text-gray-700">ประวัติการพูดคุย</h3>
            <p className="text-gray-500 text-sm">การสนทนาก่อนหน้ากับซันนี่</p>

            <div className="mt-4 pb-4 flex space-x-4 overflow-x-auto ">
              {summaryList.map((item, index) => (
                <HistoryItem
                  key={index}
                  date={item.date}
                  text={item.summary}
                  mood={item.color}
                  chatId={item.chatId}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
