import React, { useState } from "react";
import IconBack from "@/components/icons/back";

interface Step5Props {
  onNext: (friendType: string) => void;
  onPrevious: () => void;
}

const Step5: React.FC<Step5Props> = ({ onNext, onPrevious }) => {
  const [friendType, setFriendType] = useState("");

  return (
    <div className="flex flex-col items-center justify-center  p-4 ">
       <button
        onClick={onPrevious}
        className="self-start m-2  rounded-lg hover:opacity-60"
      >
        <IconBack className="" width={24} height={24} color="#979797" />
      </button>
      <h2 className="text-2xl font-bold mb-4 text-pink-500">
        เธออยากจะให้ Sunny เป็นเพื่อนแบบไหน ?
      </h2>
      <div className="grid grid-cols-1 gap-4 mb-4">
        {[
          "เพื่อนที่คอยให้คำปรึกษา",
          "เพื่อนที่คอยปลอบโยน",
          "เพื่อนที่คอยให้กำลังใจ",
          "เพื่อนที่สามารถคุยอะไรก็ได้"
        ].map((option) => (
          <div
            key={option}
            onClick={() => setFriendType(option)}
            className={`w-full p-4 rounded-lg text-lg border-0 text-center font-bold cursor-pointer ${
              friendType === option
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {option}
          </div>
        ))}
      </div>
      <button
        onClick={() => onNext(friendType)}
        className="btn btn-primary bg-core-lightBlue text-white text-lg rounded-full"
      >
        ถัดไป
      </button>
    </div>
  );
};

export default Step5;
