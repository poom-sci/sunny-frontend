// components/DailySummary.tsx
import React from "react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
// import { DailySummary as DailySummaryType } from "../types";

interface DailySummary {
  date: Date;
  mood: "happy" | "excited" | "neutral" | "sad";
  activities: string[];
}

interface DailySummaryProps {
  summary: DailySummary | null;
}

const DailySummary: React.FC<DailySummaryProps> = ({ summary }) => {
  if (!summary) return null;

  const moodEmoji = {
    happy: "😊",
    excited: "😃",
    neutral: "😐",
    sad: "😢"
  };

  return (
    <div className="mt-4">
      <h3>
        สรุปประจำวันที่ {format(summary.date, "d MMMM yyyy", { locale: th })}
      </h3>
      <div className="flex gap-2 mt-2">
        <div className="badge badge-lg">
          {moodEmoji[summary.mood]} ความรู้สึกวันนี้
        </div>
      </div>
      <div className="alert mt-2">
        <ul>
          {summary.activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailySummary;
