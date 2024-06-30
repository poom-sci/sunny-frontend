import React, { useEffect } from "react";
import { useRouter } from "next/router";
import RandomBackgroundImages from "@/components/RandomBackground";
import AnimatedProgress from "@/components/AnimatedProgress";
import IconBack from "@/components/icons/back";
import { getGoal } from "@/api/auth";
import userStore from "@/stores/user";

interface Goal {
  id: number;
  title: string;
  count: number;
  duration: number;
  icon: string;
  bgColor: string;
  textColor: string;
}

const GoalsPage = ({ initialGoals }) => {
  const router = useRouter();
  const [goals, setGoals] = React.useState([]);
  const user = userStore((state) => state.user);

  const getAdjustedProgress = (progress: number, duration: number) => {
    const actualProgress = (progress / duration) * 100;
    return actualProgress;
  };

  const handleGoalClick = (id: number) => {
    router.push(`/goal/${id}`);
  };

  const handleAddGoal = () => {
    router.push("/goal/new");
  };

  useEffect(() => {
    if (!user) return;

    const fetchGoal = async () => {
      const resp = await getGoal(user.uid);
      setGoals(resp.data);
    };

    fetchGoal();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen font-IBMPlexSanThai my-4">
      <div className="">
        <RandomBackgroundImages />
      </div>
      <div className="w-[80vw] p-4 bg-white shadow-md rounded-lg z-10 relative">
        <button
          onClick={() => router.back()}
          className="self-start m-2  rounded-lg hover:opacity-60"
        >
          <IconBack className="" width={24} height={24} color="#979797" />
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center text-core-green-400">
          เป้าหมายของฉัน
        </h1>
        <div className="flex justify-between items-center mb-4">
          <span className="mr-4">เป้าหมาย {goals.length} อย่าง</span>
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
                      progress={getAdjustedProgress(goal.count, goal.duration)}
                    />
                  </div>
                  <div className={`ml-4 ${goal.textColor}`}>
                    {goal.count}/{goal.duration}
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

// export async function getServerSideProps(context) {
//   // Here, you would normally fetch data from an API or database
//   const user = {}; // Get user data from your authentication system
//   let goals = [];

//   if (user) {
//     const resp = await getGoal("");
//     goals = resp.data;
//   }

//   return {
//     props: {
//       initialGoals: goals
//     }
//   };
// }

export default GoalsPage;
