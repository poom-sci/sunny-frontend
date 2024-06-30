// pages/index.tsx
import type { NextPage } from "next";
import { useState } from "react";
import Calendar from "@/components/Calendar";
import DailySummary from "@/components/DailySummary";
import { useRouter } from "next/router";
import RandomBackgroundImages from "@/components/RandomBackground";
import IconBack from "@/components/icons/back";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { getUser, getMoodCurrentWeek, getAllSummary } from "@/api/auth";

interface DailySummaryType {
  date: Date;
  moods: string[];
  description: string[];
}

const Home: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();
  const [summaries, setSummaryList] = useState([]);

  const fetchSummaryAll = async (chatId) => {
    const auth = getAuth();

    // const currentUser = auth.currentUser;

    auth.onAuthStateChanged(async (user) => {
      const summary = await getAllSummary(user.uid);

      // console.log("asdfasdf", summaryList);
      setSummaryList(
        summary.data.map((s: any) => ({ ...s, date: new Date(s.date) }))
      );

      // set summaryList(summary.data); if query have chatId that match
      // console.log("chatId", summary);
      if (chatId) {
        const selectedSummary = summary.data
          .map((s: any) => ({ ...s, date: new Date(s.date) }))
          .find((s) => s.chatId === chatId.toString());

        console.log("--asfasdf", chatId, summary);
        if (!selectedSummary) return;

        setSelectedDate(selectedSummary.date);
      }
    });
  };

  useEffect(() => {
    // console.log("asdfasdfas", chatId);

    // setTimeout(() => {
    const chatId = router.query.chatId;
    fetchSummaryAll(chatId);
    // }, 400);
  }, [router.query]);
  // Example data (in real usage, fetch from API or database)
  // const summaries: DailySummaryType[] = [
  //   {
  //     date: new Date(2024, 5, 10),
  //     moods: ["ความสุข", "ตื่นเต้น"],
  //     description: ["ทำบุญตักบาตร", "ออกกำลังกาย", "อ่านหนังสือ"]
  //   },
  //   {
  //     date: new Date(2024, 5, 11),
  //     moods: ["ตื่นเต้น", "ความสุข"],
  //     description: ["ไปเที่ยวทะเล", "ทานอาหารอร่อย", "ถ่ายรูปสวยๆ"]
  //   }
  // ];

  const selectedSummary = selectedDate
    ? summaries.find(
        (s) =>
          s.date.getDate() === selectedDate.getDate() &&
          s.date.getMonth() === selectedDate.getMonth()
      )
    : null;

  return (
    <div className="flex items-center justify-center min-h-screen font-IBMPlexSanThai my-4">
      <div className="absolute inset-0 z-0">
        <RandomBackgroundImages />
      </div>
      <div className="w-[80vw] p-8 bg-white shadow-md rounded-lg z-10 opacity-95">
        <div className="flex items-center mb-4">
          <button
            onClick={() => router.back()}
            className="self-start m-2  rounded-lg hover:opacity-60"
          >
            <IconBack className="" width={24} height={24} color="#979797" />
          </button>
          <h1 className="text-xl font-semibold text-core-coral ml-2">สถิติ</h1>
        </div>
        <Calendar summaries={summaries} onDateSelect={setSelectedDate} />
        <DailySummary summary={selectedSummary} />
        <button
          className="mt-4 w-full py-2 bg-blue-100 text-white rounded-full shadow-md hover:bg-blue-300 transition duration-300 ease-in-out"
          onClick={() => {
            router.push("/chat?chatId=" + selectedSummary.chatId);
          }}
        >
          ย้อนดูประวัติการคุย
        </button>
      </div>
    </div>
  );
};

export default Home;
