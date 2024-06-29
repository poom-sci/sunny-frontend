import React, { useState } from "react";

import IconBack from "@/components/icons/back";
interface Step4Props {
  onNext: (gender: string) => void;
  onPrevious: () => void;
}

const Step4: React.FC<Step4Props> = ({ onNext, onPrevious }) => {
  const [gender, setGender] = useState("");

  return (
    <div className="flex flex-col items-center justify-center  p-4 ">
      <button
        onClick={onPrevious}
        className="self-start m-2  rounded-lg hover:opacity-60"
      >
        <IconBack className="" width={24} height={24} color="#979797" />
      </button>
      <h2 className="text-2xl font-bold mb-4 text-green-500">
        (ชื่อ)นิยามตัวเองว่าเป็นเพศอะไร ?
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {["ชาย", "หญิง", "LGBTQ", "ไม่ต้องการระบุ"].map((option) => (
          <div
            key={option}
            onClick={() => setGender(option)}
            className={`w-full p-4 rounded-lg text-lg border-0 text-center font-bold cursor-pointer ${
              gender === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {option}
          </div>
        ))}
      </div>
      <button
        onClick={() => onNext(gender)}
        className="btn btn-primary bg-core-lightBlue text-white text-lg rounded-full"
      >
        ถัดไป
      </button>
    </div>
  );
};

export default Step4;
