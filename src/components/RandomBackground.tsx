import React, { useEffect, useState, useMemo } from "react";
import Circle from "./circle";

const colors = [
  "bg-green-200", // Light green
  "bg-green-400", // Green
  "bg-blue-200", // Light blue
  "bg-orange-300", // Orange
  "bg-pink-200", // Coral
  "bg-pink-400", // Pink
  "bg-yellow-200", // Yellow
  "bg-purple-200" // Purple
];

const RandomBackgroundImages: React.FC<{}> = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const imageElements = useMemo(() => {
    if (!isClient) return null;

    const elements: JSX.Element[] = [];
    const numberOfCircles = Math.ceil(window.innerHeight / 100); // Number of circles based on page height

    for (let i = 0; i < numberOfCircles; i++) {
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 200 + 100; // Circle size between 50 and 150
      const top = Math.random() * window.innerHeight - size / 2;
      const left = Math.random() * window.innerWidth - size / 2; // Random position within the width of the page

      elements.push(
        <Circle
          key={i}
          colorClass={colorClass}
          size={size}
          top={top}
          left={left}
        />
      );
    }

    return elements;
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
        // zIndex: -1, // Ensure the background is behind other content
        // overflow: "hidden"
      }}
      className="blur-[60px]"
    >
      {imageElements}
    </div>
  );
};

export default React.memo(RandomBackgroundImages);
