import React from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import RandomBackgroundImages from "@/components/RandomBackground";

const MoodCard = ({ mood, colorClass, label }) => (
  <div
    className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-lg text-white ${colorClass} w-20 h-20`}
  >
    <div className="bg-white rounded-full w-10 h-10 mb-2" />
    <span className="text-xs">{label}</span>
  </div>
);

const moodToColorClass = (mood) => {
  switch (mood) {
    case "ความสุข":
      return "bg-green-500";
    case "ความตื่นเต้น":
      return "bg-yellow-200";
    case "เฉยๆ":
      return "bg-blue-400";
    case "ความเศร้า":
      return "bg-purple-300";
    case "ความโกรธ":
      return "bg-red-500";
    case "ความรัก":
      return "bg-pink-500";
    default:
      return "bg-gray-200";
  }
};

const DailySummary = ({ summary }) => {
  if (!summary) {
    return <p>ไม่มีข้อมูลสรุปสำหรับวันนี้</p>;
  }

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white">
      <h3 className="text-lg font-bold">สรุปประจำวัน</h3>
      <p>{format(summary.date, "PPPP", { locale: th })}</p>

      <div className="flex flex-row items-center justify-around my-4">
        <MoodCard
          mood={summary.color}
          colorClass={moodToColorClass(summary.color)}
          label={summary.color}
        />
        <MoodCard
          mood={summary.color1}
          colorClass={moodToColorClass(summary.color1)}
          label={summary.color1}
        />
        {/* {summary.moods.map((mood, index) => (
          <MoodCard
            key={index}
            mood={mood}
            colorClass={moodToColorClass(mood)}
            label={mood}
          />
        ))} */}
      </div>
      <div className="bg-green-100 text-white p-4 rounded-lg">
        {summary.summary}
      </div>
    </div>
  );
};

export default DailySummary;
