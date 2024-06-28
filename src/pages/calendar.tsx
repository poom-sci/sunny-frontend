// pages/index.tsx
import type { NextPage } from "next";
import { useState } from "react";
import Calendar from "@/components/Calendar";
import DailySummary from "@/components/DailySummary";
import { useRouter } from "next/router";
import RandomBackgroundImages from "@/components/RandomBackground";

interface DailySummaryType {
  date: Date;
  mood: "happy" | "excited" | "neutral" | "sad";
  activities: string[];
}

const Home: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();

  // ตัวอย่างข้อมูล (ในการใช้งานจริงควรดึงจาก API หรือฐานข้อมูล)
  const summaries: DailySummaryType[] = [
    {
      date: new Date(2024, 5, 11), // 11 มิถุนายน 2024
      mood: "happy",
      activities: ["ทำบุญตักบาตร", "ออกกำลังกาย", "อ่านหนังสือ"]
    },
    {
      date: new Date(2024, 5, 12), // 12 มิถุนายน 2024
      mood: "excited",
      activities: ["ไปเที่ยวทะเล", "ทานอาหารอร่อย", "ถ่ายรูปสวยๆ"]
    }
    // เพิ่มข้อมูลวันอื่นๆ ตามต้องการ
  ];

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
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg z-10 opacity-95">
        <div className="flex items-center mb-4">
          <button
            onClick={() => router.back()}
            className="text-gray-500 focus:outline-none"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-orange-500 ml-2">
            ปฏิทินอารมณ์
          </h1>
        </div>
        <Calendar summaries={summaries} onDateSelect={setSelectedDate} />
        <DailySummary summary={selectedSummary} />
        <button className="mt-4 w-full py-2 bg-blue-100 text-white rounded-full shadow-md hover:bg-blue-300 transition duration-300 ease-in-out">
          ย้อนดูประวัติการพูดคุย
        </button>
      </div>
    </div>
  );
};

export default Home;
