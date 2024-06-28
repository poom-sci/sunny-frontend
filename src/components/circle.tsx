import React from "react";

interface CircleProps {
  colorClass: string;
  size: number;
  top: number;
  left: number;
}

const Circle: React.FC<CircleProps> = ({ colorClass, size, top, left }) => {
  return (
    <div
      className={`absolute ${colorClass} rounded-full`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: size,
        height: size
      }}
    />
  );
};

export default Circle;
