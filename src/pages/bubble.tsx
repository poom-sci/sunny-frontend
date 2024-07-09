import React from "react";
import BubbleChart from "@/components/Bubble";

const data = [
  { id: 1, label: "Cat", r: 2 * 20, color: "rgba(255, 99, 132, 0.6)" },
  { id: 2, label: "Rabbit", r: 2 * 20, color: "rgba(54, 162, 235, 0.6)" },
  { id: 3, label: "Frog", r: 1 * 20, color: "rgba(75, 192, 192, 0.6)" },
  { id: 4, label: "Duck", r: 5 * 20, color: "rgba(153, 102, 255, 0.6)" },
  { id: 5, label: "Dog", r: 3 * 20, color: "rgba(255, 159, 64, 0.6)" },
  { id: 6, label: "Horse", r: 2 * 20, color: "rgba(255, 205, 86, 0.6)" }
  // เพิ่มข้อมูลสัตว์อื่นๆ ตามที่ต้องการ
];

const App: React.FC = () => {
  return (
    <div className="p-4">
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold">Positive Journal</h1>
      </header>
      <main>
        <section className="mb-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              สวัสดี! พร้อมที่จะสร้างวันที่ดีไปด้วยกันหรือยัง?
            </h2>
            <button className="btn btn-primary">ตั้งเป้าหมายประจำวัน</button>
          </div>
        </section>
        <section className="mb-8">
          <div className="card shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-2">จด Journal ประจำวัน</h2>
            <p>
              คุยกับ Chatbot เพื่อจดบันทึกความรู้สึกและประสบการณ์ของคุณวันนี้
            </p>
            <button className="btn btn-outline btn-primary mt-4">
              เริ่มคุยกับ Chatbot
            </button>
          </div>
        </section>
        <section className="mb-8">
          <div className="card shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-2">สรุปความรู้สึกวันนี้</h2>
            <p>สรุปอารมณ์และความรู้สึกที่คุณจดบันทึกไว้ในวันนี้</p>
            <BubbleChart data={data} />
          </div>
        </section>
        <section className="mb-8">
          <div className="card shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-2">กิจกรรมแนะนำ</h2>
            <ul className="list-disc list-inside">
              <li>เขียนจดหมายขอบคุณ</li>
              <li>ตั้งเป้าหมายประจำวัน</li>
              <li>มีปฏิสัมพันธ์ทางสังคม</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
