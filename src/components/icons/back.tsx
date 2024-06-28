import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
  color?: string;
}

const ArrowCircleIcon: React.FC<IconProps> = ({
  width = 40,
  height = 40,
  fill = "none",
  className = "",
  color = "#000"
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill={fill}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="19" stroke={color} strokeWidth="2" />
    <path
      d="M15.725 20.4879L23.075 27.8379C23.325 28.0879 23.4458 28.3796 23.4375 28.7129C23.4292 29.0462 23.3 29.3379 23.05 29.5879C22.8 29.8379 22.5083 29.9629 22.175 29.9629C21.8417 29.9629 21.55 29.8379 21.3 29.5879L13.6 21.9129C13.4 21.7129 13.25 21.4879 13.15 21.2379C13.05 20.9879 13 20.7379 13 20.4879C13 20.2379 13.05 19.9879 13.15 19.7379C13.25 19.4879 13.4 19.2629 13.6 19.0629L21.3 11.3629C21.55 11.1129 21.8458 10.9921 22.1875 11.0004C22.5292 11.0087 22.825 11.1379 23.075 11.3879C23.325 11.6379 23.45 11.9296 23.45 12.2629C23.45 12.5962 23.325 12.8879 23.075 13.1379L15.725 20.4879Z"
      fill={color}
    />
  </svg>
);

export default ArrowCircleIcon;
