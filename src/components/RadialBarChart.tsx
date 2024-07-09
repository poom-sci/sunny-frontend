import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useUserStore from "@/stores/user";
import { getMoodCurrentWeek } from "@/api/auth";

Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale, ChartDataLabels);

const initialData = [
  { subject: "work", value: 0, fullMark: 5 },
  { subject: "play", value: 0, fullMark: 5 },
  { subject: "relationship", value: 0, fullMark: 5 },
  { subject: "health", value: 0, fullMark: 5 },
  { subject: "study", value: 0, fullMark: 5 }
];

const CustomPolarAreaChart: React.FC = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [moodCurrentWeek, setMoodCurrentWeek] = useState(initialData);
  const [isOk, setIsOk] = useState(false);

  const fetchMoodCurrentWeek = async (user) => {
    if (user) {
      try {
        const moodCurrentWeekData = await getMoodCurrentWeek(
          user.uid,
          user.accessToken
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

  const chartData = {
    labels: moodCurrentWeek.map((mood) => mood.subject),
    datasets: [
      {
        // label: "Mood Levels",
        data: moodCurrentWeek.map((mood) => mood.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)"
        ],
        borderWidth: 0.5
      }
    ]
  };

  // const chartOptions = {
  //   responsive: true,

  //   scales: {
  //     r: {
  //       beginAtZero: true,
  //       max: 5
  //     }
  //   },
  //   plugins: {
  //     // hide datalabels
  //     legend: {
  //       display: false,
  //       position: "top"
  //     }

  //     // datalabels: {
  //     //   color: "#000",
  //     //   anchor: "end",
  //     //   align: "start",
  //     //   fontFamily: "var(--font-londrina)",
  //     //   formatter: (value, context) => {
  //     //     return context.chart.data.labels[context.dataIndex];
  //     //   }
  //     // }
  //   }
  // };
  const chartOptions = {
    scales: {
      r: {
        ticks: {
          display: false // Hide the numbers around the chart
        },
        // beginAtZero: true,
        max: 5,
        pointLabels: {
          display: true,
          centerPointLabels: true, // Adjust this to center the labels
          font: {
            size: 16
            //   // family: "var(--font-londrina)"
            //   // weight: "bold"
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full font-IBMPlexSanThai">
      <div className="h-60 w-60">
        <PolarArea data={chartData} options={chartOptions} />
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

export default CustomPolarAreaChart;
