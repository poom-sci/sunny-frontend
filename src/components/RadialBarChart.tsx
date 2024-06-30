import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useUserStore from "@/stores/user";
import { getUser, getMoodCurrentWeek } from "@/api/auth";
import { getAuth } from "firebase/auth";

const ResponsiveRadar = dynamic(
  () => import("@nivo/radar").then((mod) => mod.ResponsiveRadar),
  { ssr: false }
);

const initialData = [
  { subject: "work", value: 0, fullMark: 5 },
  { subject: "play", value: 0, fullMark: 5 },
  { subject: "relationship", value: 0, fullMark: 5 },
  { subject: "health", value: 0, fullMark: 5 },
  { subject: "study", value: 0, fullMark: 5 }
];

const CustomRadarChart: React.FC = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [moodCurrentWeek, setMoodCurrentWeek] = useState(initialData);
  const [isOk, setIsOk] = useState(false);

  const fetchMoodCurrentWeek = async (user) => {
    if (user) {
      try {
        const moodCurrentWeekData = await getMoodCurrentWeek(
          user.uid,
          user.accesssToken
        );
        if (!moodCurrentWeekData.mood) {
          return;
        }

        setMoodCurrentWeek((oldState) =>
          oldState.map((mood) => {
            const name = mood.subject;
            const value = moodCurrentWeekData.mood[name];
            return { subject: name, value, fullMark: 5 };
          })
        );

        setIsOk(true);
      } catch (error) {
        console.error("Error fetching moodCurrentWeek:", error);
      }
    } else {
      console.log("logout");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      fetchMoodCurrentWeek(user);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full font-IBMPlexSanThai">
      <div className="h-72 w-72">
        <ResponsiveRadar
          data={moodCurrentWeek}
          keys={["value"]}
          indexBy="subject"
          maxValue={5}
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor={{ from: "color" }}
          gridLabelOffset={36}
          dotBorderColor={{ from: "color", modifiers: [] }}
          colors={{ scheme: "nivo" }}
          fillOpacity={0.25}
          blendMode="multiply"
          animate={true}
          motionConfig="wobbly"
          isInteractive={true}
        />
      </div>

      {!isOk && (
        <div
          className="btn bg-core-lightGreen hover:bg-core-lightGreen hover:opacity-80 mt-4"
          onClick={() => {
            router.push("/mood");
          }}
        >
          {isOk ? "ดูภาพรวม" : "เริ่มต้นรู้จักความรู้สึกของคุณ"}
        </div>
      )}
    </div>
  );
};

export default CustomRadarChart;
