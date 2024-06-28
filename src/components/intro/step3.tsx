import React, { useState } from "react";

interface Step3Props {
  onNext: (age: string) => void;
  onPrevious: () => void;
}

const Step3: React.FC<Step3Props> = ({ onNext, onPrevious }) => {
  const [age, setAge] = useState("");

  return (
    <div className="flex flex-col items-center justify-center  p-4 ">
      <button
        onClick={onPrevious}
        className="self-start mb-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        <i className="fa fa-arrow-left mr-2"></i>Back
      </button>
      <h2 className="text-2xl font-bold mb-4 text-blue-500">
        (ชื่อ)ตอนนี้อายุเท่าไหร่?
      </h2>
      <input
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="อายุของคุณ"
        className="input input-bordered w-full max-w-xs mb-4 border-solid border-2 border-green-400"
      />
      <button
        onClick={() => onNext(age)}
        className="btn btn-primary bg-core-lightBlue text-white text-lg rounded-full"
      >
        ถัดไป
      </button>
    </div>
  );
};

export default Step3;
