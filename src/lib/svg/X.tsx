import React from "react";

interface IProps {
  width?: string;
  height?: string;
  className?: string;
}

function X({ width, height, className }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "15"}
      height={height || "15"}
      fill="none"
      viewBox="0 0 15 15"
    >
      <path
        className={className}
        d="M1.699 15.078.922 14.3l6.3-6.3-6.3-6.3.777-.778 6.3 6.3 6.3-6.3.777.777-6.3 6.3 6.3 6.3-.777.777-6.3-6.3z"
      ></path>
    </svg>
  );
}

export default X;
