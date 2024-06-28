import React from "react";
import { useRouter } from "next/router";
import { useSpring, animated } from "@react-spring/web";
import RandomBackgroundImages from "@/components/RandomBackground";

interface Goal {
  id: number;
  title: string;
  progress: number;
  total: number;
  icon: string;
  bgColor: string;
  textColor: string;
}

const goals: Goal[] = [
  {
    id: 1,
    title: "ทำงานบ้าน",
    progress: 10,
    total: 10,
    icon: "📖",
    bgColor: "bg-core-orange",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "ออกกำลังกาย",
    progress: 9,
    total: 10,
    icon: "📖",
    bgColor: "bg-core-lightBlue",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "อ่านหนังสือ",
    progress: 7,
    total: 10,
    icon: "📖",
    bgColor: "bg-core-coral",
    textColor: "text-white"
  },
  {
    id: 4,
    title: "ดูซีรี่ย์",
    progress: 4,
    total: 10,
    icon: "📖",
    bgColor: "bg-core-lightGreen",
    textColor: "text-white"
  }
];

const GoalsPage = () => {
  const router = useRouter();

  const getAdjustedProgress = (progress: number, total: number) => {
    const actualProgress = (progress / total) * 100;
    return 50 + actualProgress / 2; // Map the progress to a range of 50% to 100%
  };

  const handleGoalClick = (id: number) => {
    router.push(`/goal/${id}`);
  };

  const handleAddGoal = () => {
    // Implement logic to add a new goal
    alert("Add new goal functionality to be implemented");
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-IBMPlexSanThai my-4">
      <div className="">
        <RandomBackgroundImages />
      </div>
      <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg z-10 relative">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 hover:opacity-80"
        >
          <i className="fa fa-arrow-left"></i>
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center text-core-green-400">
          เป้าหมายของฉัน
        </h1>
        <div className="flex justify-between items-center mb-4">
          <span>เป้าหมาย {goals.length} อย่าง</span>
          <button
            onClick={handleAddGoal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            เพิ่มเป้าหมาย
          </button>
        </div>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`p-4 rounded-lg shadow-lg flex items-center ${goal.bgColor} cursor-pointer`}
              onClick={() => handleGoalClick(goal.id)}
            >
              <div className="text-3xl mr-4">{goal.icon}</div>
              <div className="flex-1">
                <h2 className={`text-lg font-semibold ${goal.textColor}`}>
                  {goal.title}
                </h2>
                <div className="flex items-center mt-2">
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <AnimatedProgress
                      progress={getAdjustedProgress(goal.progress, goal.total)}
                    />
                  </div>
                  <div className={`ml-4 ${goal.textColor}`}>
                    {goal.progress} / {goal.total}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnimatedProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const props = useSpring({
    width: `${progress}%`,
    from: { width: "0%" },
    config: { duration: 500 }
  });

  return <animated.div className="h-full bg-core-grey/60" style={props} />;
};

export default GoalsPage;
