import React, { useState } from "react";

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
        className="self-start mb-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        <i className="fa fa-arrow-left mr-2"></i>Back
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
