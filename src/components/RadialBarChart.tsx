import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useUserStore from "@/stores/user";
import { getUser, getMoodCurrentWeek } from "@/api/auth";
import { getAuth } from "firebase/auth";
// import { ResponsiveRadar } from "@nivo/radar";
const ResponsiveRadar = dynamic(
  () => import("@nivo/radar").then((mod) => mod.ResponsiveRadar),
  { ssr: false }
);

const data = [
  {
    subject: "work",
    value: 0,
    fullMark: 5
  },
  {
    subject: "play",
    value: 0,
    fullMark: 5
  },
  {
    subject: "relationship",
    value: 0,
    fullMark: 5
  },
  {
    subject: "health",
    value: 0,
    fullMark: 5
  },
  {
    subject: "study",
    value: 0,
    fullMark: 5
  }
];

const CustomRadarChart: React.FC = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [moodCurrentWeek, setMoodCurrentWeek] = useState<any[]>(data);

  const [isOk, setIsOk] = useState(false);

  const fetchMoodCurrentWeek = async (user: any) => {
    // const auth = getAuth();
    // const currentUser = auth.currentUser;
    if (user) {
      // const token = await currentUser.getIdToken();

      try {
        console.log("dsafasdf", user);
        const moodCurrentWeek2 = await getMoodCurrentWeek(
          user.uid,
          user.accesssToken
        );

        console.log("asdfasf", moodCurrentWeek, moodCurrentWeek2);

        setMoodCurrentWeek((oldState) => {
          // map from {
          //   "work": 1,
          //   "play": 2,
          //   "study": 3,
          //   "relationships": 4,
          //   "health": 5
          // }

          return oldState.map((mood) => {
            const name = mood.subject;
            const value = moodCurrentWeek2.mood[name];

            console.log("---", name, value);
            // const subject = Object.keys(mood);
            // const value = Object.values(mood);
            return {
              subject: name,
              value: value,
              fullMark: 5
            };
          });
        });
        setIsOk(true);

        // console.log("asdfasdf", moodCurrentWeek.isIntroComplete);
      } catch (error) {
        console.error("Error fetching moodCurrentWeek:", error);
      }

      // setMoodCurrentWeek(moodCurrentWeek);
      // console.log(moodCurrentWeek);
    } else {
      console.log("logout");
    }
  };

  useEffect(() => {
    const auth = getAuth();

    // csrNavTrack.current += 1;

    auth.onAuthStateChanged(async (user) => {
      fetchMoodCurrentWeek(user);
    });
    // fetchMoodCurrentWeek();
    // console.log("data", data);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-full w-full font-IBMPlexSanThai">
      <div style={{ height: 300, width: 300 }}>
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
          //   dotSize={10}
          //   dotColor={{ theme: "background" }}
          //   dotBorderWidth={2}
          dotBorderColor={{ from: "color", modifiers: [] }}
          colors={{ scheme: "nivo" }}
          fillOpacity={0.25}
          blendMode="multiply"
          animate={true}
          motionConfig="wobbly"
          isInteractive={true}
        />
      </div>

      {!isOk ? (
        <div
          className="btn bg-core-lightGreen hover:bg-core-lightGreen hover:opacity-80"
          onClick={() => {
            router.push("/mood");
          }}
        >
          {isOk ? "ดูภาพรวม" : "เริ่มต้นรู้จักความรู้สึกของคุณ"}
        </div>
      ) : null}
    </div>
  );
};

export default CustomRadarChart;
