import React from "react";

interface IProps {
  width?: string;
  height?: string;
  className?: string;
}

function OnChain({ width, height, className }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "14"}
      height={height || "14"}
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        className={className}
        d="M6.988 14C10.86 14 14 10.866 14 7s-3.14-7-7.012-7A7.01 7.01 0 0 0 0 6.411h9.269V7.59H0A7.01 7.01 0 0 0 6.988 14"
      ></path>
    </svg>
  );
}

export default OnChain;
