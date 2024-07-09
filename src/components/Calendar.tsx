// components/Calendar.tsx
import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval
} from "date-fns";
import { th } from "date-fns/locale";

interface DailySummary {
  date: Date;
  color: string;
  // moods: string[];
  // description: string[];
}

interface CalendarProps {
  summaries: DailySummary[];
  onDateSelect: (date: Date) => void;
}

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

const Calendar: React.FC<CalendarProps> = ({ summaries, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={prevMonth}
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
        <span className="font-semibold text-lg">
          {format(currentDate, "MMMM yyyy", { locale: th })}
        </span>
        <button
          onClick={nextMonth}
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4 border-2 border-core-grey p-2 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl">
        {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const summary = summaries.find(
            (s) =>
              s.date.getDate() === day.getDate() &&
              s.date.getMonth() === day.getMonth()
          );
          return (
            <button
              key={day.toString()}
              className={`p-2 text-center rounded-xl ${
                summary
                  ? "" + moodToColorClass(summary.color)
                  : "bg-gray-100 btn-disabled text-core-grey"
              }`}
              onClick={() => onDateSelect(day)}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
