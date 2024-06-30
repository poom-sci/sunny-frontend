import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RandomBackgroundImages from "@/components/RandomBackground";
import AnimatedProgress from "@/components/AnimatedProgress";
import IconBack from "@/components/icons/back";
import { getGoalById } from "@/api/auth";
import userStore from "@/stores/user";

interface Goal {
  id: number;
  title: string;
  count: number;
  total: number;
  duration: number;
  description: string;
}

const GoalInformationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [goal, setGoal] = useState<Goal | null>(null);
  const user = userStore((state) => state.user);

  const getAdjustedProgress = (progress: number, total: number) => {
    const actualProgress = (progress / total) * 100;
    return actualProgress;
  };

  useEffect(() => {
    if (!user || !id) return;

    const fetchGoal = async () => {
      const resp = await getGoalById(id as string);
      setGoal(resp.data);
    };

    fetchGoal();
  }, [user, id]);

  if (!user) {
    return null;
  }

  if (!goal) {
    return (
      <div className="flex items-center justify-center min-h-screen font-IBMPlexSanThai my-4">
        <div className="">
          <RandomBackgroundImages />
        </div>
        <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg z-10 relative">
          <button
            onClick={() => router.back()}
            className="self-start m-2 rounded-lg hover:opacity-60"
          >
            <IconBack className="" width={24} height={24} color="#979797" />
          </button>
          <h1 className="text-2xl font-bold mb-4 text-center text-core-green-400">
            ไม่พบเป้าหมาย
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen font-IBMPlexSanThai my-4">
      <div className="">
        <RandomBackgroundImages />
      </div>
      <div className="w-[80vw] max-w-sm p-4 bg-white shadow-md rounded-lg z-10 relative">
        <button
          onClick={() => router.back()}
          className="self-start m-2 rounded-lg hover:opacity-60"
        >
          <IconBack className="" width={24} height={24} color="#979797" />
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center text-core-green-400">
          เป้าหมายของฉัน
        </h1>
        <div className="text-center mb-4">
          <div className="p-4 rounded-lg shadow-lg inline-block bg-core-coral">
            <div className="text-3xl mb-2">{/* Goal Icon Here */}</div>
            <h2 className="text-lg font-semibold text-white">{goal.title}</h2>
            <div className="flex items-center justify-center mt-2">
              <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                <AnimatedProgress
                  progress={getAdjustedProgress(goal.count, goal.duration)}
                />
              </div>
              <div className="ml-4 text-white">
                {goal.count} / {goal.duration}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-core-coral text-white">
          {goal.description}
        </div>
      </div>
    </div>
  );
};

export default GoalInformationPage;
