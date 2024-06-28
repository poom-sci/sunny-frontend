import React, { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step7 from "./step7";
import RandomBackgroundImages from "@/components/RandomBackground";
import { useRouter } from "next/router";
import { updateIntroComplete } from "@/api/auth";
import useUserStore from "@/stores/user";
import { toast } from "react-toastify";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loadingLottie from "public/icons/lottie_loading.json";

const App: React.FC = () => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [friendType, setFriendType] = useState("");
  const [dream, setDream] = useState("");
  const [dream2, setDream2] = useState("");

  const handleNextStep = async (value: string) => {
    switch (step) {
      case 1:
        setColor(value);
        break;
      case 2:
        setName(value);
        break;
      case 3:
        setAge(value);
        break;
      case 4:
        setGender(value);
        break;
      case 5:
        setFriendType(value);
        break;
      case 6:
        setDream(value);
        break;
      case 7:
        // call api to upadte personal info
        setDream2(value);

        try {
          setLoading(true);

          const ageNumber = parseInt(age);

          const res = await updateIntroComplete({
            uid: user.uid,
            token: "123",
            color,
            age: ageNumber,
            gender,
            sunnyCategory: friendType,
            futureMe: dream,
            futureMeIdeal: dream2
          });
          await router.push("/home");
          setLoading(false);
        } catch (error) {
          console.error(error);
          toast.error(error.message || "Something went wrong!");
          setLoading(false);
        }

        break;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full flex justify-center items-center">
          <Lottie
            animationData={loadingLottie}
            className="flex flex-1 justify-center items-center w-48 h-48"
            loop={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center  bg-gray-100 font-IBMPlexSanThai my-4">
      <div className="">
        <RandomBackgroundImages />
      </div>
      <div className="flex w-full max-w-sm p-4 bg-white shadow-md rounded-lg z-10 min-h-[80vh] items-center justify-center align-middle">
        {step === 1 && (
          <Step1 onNext={handleNextStep} onPrevious={handlePreviousStep} />
        )}
        {step === 2 && (
          <Step2 onNext={handleNextStep} onPrevious={handlePreviousStep} />
        )}
        {step === 3 && (
          <Step3 onNext={handleNextStep} onPrevious={handlePreviousStep} />
        )}
        {step === 4 && (
          <Step4 onNext={handleNextStep} onPrevious={handlePreviousStep} />
        )}
        {step === 5 && (
          <Step5 onNext={handleNextStep} onPrevious={handlePreviousStep} />
        )}
        {step === 6 && (
          <Step6 onNext={handleNextStep} onPrevious={handlePreviousStep} />
        )}
        {step === 7 && (
          <Step7 onNext={handleNextStep} onPrevious={handlePreviousStep} />
        )}
      </div>
    </div>
  );
};

export default App;
