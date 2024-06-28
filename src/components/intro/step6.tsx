import React, { useState } from "react";

interface Step6Props {
  onNext: (dream: string) => void;
  onPrevious: () => void;
}

const Step6: React.FC<Step6Props> = ({ onNext, onPrevious }) => {
  const [dream, setDream] = useState("");

  return (
    <div className="flex flex-col items-center justify-center  p-4 ">
      <button
        onClick={onPrevious}
        className="self-start mb-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        <i className="fa fa-arrow-left mr-2"></i>Back
      </button>
      <h2 className="text-2xl font-bold mb-4 text-orange-500">
        มองตัวเราในอีก 5 ปีข้างหน้าเป็นอย่างไรบ้าง เรากำลังทำอะไรอยู่ ?
      </h2>
      <textarea
        value={dream}
        onChange={(e) => setDream(e.target.value)}
        placeholder="เล่าให้ฉันฟังหน่อยได้ไหม ?"
        className="textarea textarea-bordered w-full max-w-xs mb-4 border-solid border-2 border-green-400"
      />
      <button
        onClick={() => onNext(dream)}
        className="btn btn-primary bg-core-lightBlue text-white text-lg rounded-full"
      >
        ถัดไป
      </button>
    </div>
  );
};

export default Step6;
