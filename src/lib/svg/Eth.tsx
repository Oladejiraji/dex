import React from "react";

interface IProps {
  width?: string;
  height?: string;
}

function Eth({ width, height }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "24"}
      height={height || "24"}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#clip0_269_2491)">
        <path
          fill="#627EEA"
          d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
        ></path>
        <path
          stroke="#000"
          strokeOpacity="0.097"
          d="M23.5 12c0 6.351-5.149 11.5-11.5 11.5S.5 18.351.5 12 5.649.5 12 .5 23.5 5.649 23.5 12z"
        ></path>
        <path
          fill="#fff"
          fillOpacity="0.602"
          d="M12 4v5.915l4.999 2.233L12 4z"
        ></path>
        <path fill="#fff" d="M12 4l-5 8.148 5-2.233V4z"></path>
        <path
          fill="#fff"
          fillOpacity="0.602"
          d="M12 15.981V20l5.002-6.92L12 15.98z"
        ></path>
        <path fill="#fff" d="M12 20v-4.02l-5-2.9L12 20z"></path>
        <path
          fill="#fff"
          fillOpacity="0.2"
          d="M12 15.051l4.999-2.902L12 9.915v5.135z"
        ></path>
        <path
          fill="#fff"
          fillOpacity="0.602"
          d="M7 12.149l5 2.902V9.916l-5 2.232z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_269_2491">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Eth;
