import React from "react";

interface IProps {
  width?: string;
  height?: string;
  className?: string;
}

function Up({ width, height, className }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "12"}
      height={height || "7"}
      fill="none"
      viewBox="0 0 12 7"
    >
      <path
        className={className}
        d="M6 .68q.159 0 .289.054a.7.7 0 0 1 .248.182L10.88 5.26a.43.43 0 0 1 .143.316.44.44 0 0 1-.146.333.46.46 0 0 1-.325.147.45.45 0 0 1-.321-.147L6 1.677l-4.23 4.23a.46.46 0 0 1-.313.138.43.43 0 0 1-.334-.137.47.47 0 0 1-.156-.324.43.43 0 0 1 .143-.325L5.453.916A.8.8 0 0 1 5.71.734.7.7 0 0 1 6 .68"
      ></path>
    </svg>
  );
}

export default Up;
