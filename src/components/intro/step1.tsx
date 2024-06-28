import React, { useState } from "react";
import { useRouter } from "next/router";

interface Step1Props {
  onNext: (color: string) => void;
  onPrevious: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext, onPrevious }) => {
  const [color, setColor] = useState("");

  return (
    <div className="flex flex-col items-center justify-center  p-4 ">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">
        คุณชอบสีอะไร ?
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { name: "สีชมพู", colorClass: "bg-pink-400" },
          { name: "สีฟ้า", colorClass: "bg-blue-200" },
          { name: "สีน้ำเงิน", colorClass: "bg-blue-600" },
          { name: "สีเขียว", colorClass: "bg-green-600" },
          { name: "สีเหลือง", colorClass: "bg-yellow-500" },
          { name: "สีส้ม", colorClass: "bg-orange-500" },
          { name: "สีแดง", colorClass: "bg-red-500" },
          { name: "สีม่วง", colorClass: "bg-purple-500" },
          { name: "สีโอโรส", colorClass: "bg-core-coral" }
        ].map((colorOption) => (
          <div
            key={colorOption.name}
            onClick={() => {
              setColor(colorOption.name);
              onNext(colorOption.name);
            }}
            className={`w-full ${colorOption.colorClass} ${
              color === colorOption.name ? "" : ""
            } p-4 rounded-lg text-white text-lg border-0 text-center font-bold cursor-pointer`}
          >
            {colorOption.name}
          </div>
        ))}
      </div>
      <button
        onClick={() => onNext(color)}
        className="btn btn-primary bg-core-lightBlue text-white text-lg rounded-full"
      >
        ถัดไป
      </button>
    </div>
  );
};

export default Step1;
