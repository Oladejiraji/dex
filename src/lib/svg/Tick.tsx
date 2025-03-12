import React from 'react';

interface IProps {
  width?: string;
  height?: string;
}

function Tick({ width, height }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '14'}
      height={height || '10'}
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        fill="#5CFE9D"
        d="M4.834 9.555.878 5.721a.827.827 0 1 1 1.16-1.178l2.796 2.796L11.909.285a.912.912 0 1 1 1.273 1.306z"
      ></path>
    </svg>
  );
}

export default Tick;
