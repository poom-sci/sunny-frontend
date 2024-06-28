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
  mood: "happy" | "excited" | "neutral" | "sad";
  activities: string[];
}

interface CalendarProps {
  summaries: DailySummary[];
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ summaries, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">ปฏิทิน</h2>
        <div className="flex justify-between items-center">
          <button className="btn btn-circle" onClick={prevMonth}>
            ❮
          </button>
          <span>{format(currentDate, "MMMM yyyy", { locale: th })}</span>
          <button className="btn btn-circle" onClick={nextMonth}>
            ❯
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mt-4">
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
                className={`btn btn-sm ${
                  summary
                    ? "btn-primary"
                    : "btn-ghost btn-disabled bg-slate-200/20"
                }`}
                onClick={() => onDateSelect(day)}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
