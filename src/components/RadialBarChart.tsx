import React from "react";
import dynamic from "next/dynamic";
// import { ResponsiveRadar } from "@nivo/radar";
const ResponsiveRadar = dynamic(
  () => import("@nivo/radar").then((mod) => mod.ResponsiveRadar),
  { ssr: false }
);

const data = [
  {
    subject: "Work",
    value: 4,
    fullMark: 5
  },
  {
    subject: "Play",
    value: 3,
    fullMark: 5
  },
  {
    subject: "Love",
    value: 5,
    fullMark: 5
  },
  {
    subject: "Health",
    value: 2,
    fullMark: 5
  },
  {
    subject: "Learn",
    value: 2,
    fullMark: 5
  }
];

const CustomRadarChart: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full w-full font-IBMPlexSanThai">
      <div style={{ height: 400, width: 400 }}>
        <ResponsiveRadar
          data={data}
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
    </div>
  );
};

export default CustomRadarChart;
