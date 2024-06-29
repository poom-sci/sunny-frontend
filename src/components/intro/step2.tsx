import React, { useState } from "react";

import IconBack from "@/components/icons/back";

interface Step2Props {
  onNext: (name: string) => void;
  onPrevious: () => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onPrevious }) => {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <button
        onClick={onPrevious}
        className="self-start m-2  rounded-lg hover:opacity-60"
      >
        <IconBack className="" width={24} height={24} color="#979797" />
      </button>
      {/* <button
        onClick={onPrevious}
        className="self-start mb-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        <i className="fa fa-arrow-left mr-2"></i>Back
      </button> */}
      <h2 className="text-2xl font-bold mb-4 text-pink-500">เธอชื่ออะไร?</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ชื่อผู้ใช้งาน"
        className="input input-bordered w-full max-w-xs mb-4 border-solid border-2 border-green-400"
      />
      <button
        onClick={() => onNext(name)}
        className="btn btn-primary bg-core-lightBlue text-white text-lg rounded-full"
      >
        ถัดไป
      </button>
    </div>
  );
};

export default Step2;
