import React from "react";

interface IProps {
  width?: string;
  height?: string;
  className?: string;
}

function Clock({ width, height, className }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "14"}
      height={height || "14"}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        className={className}
        d="M8.333 7.535V3.333A.324.324 0 0 0 8.003 3a.33.33 0 0 0-.238.096.32.32 0 0 0-.099.237v4.274q0 .128.047.227a.7.7 0 0 0 .134.187l2.997 2.997q.12.12.238.117.118-.001.251-.135.133-.133.133-.243t-.14-.248zm-.33 7.632a7 7 0 0 1-2.784-.56 7.219 7.219 0 0 1-3.826-3.826q-.56-1.305-.56-2.788 0-1.484.56-2.79a7.1 7.1 0 0 1 1.54-2.279 7.3 7.3 0 0 1 2.285-1.53q1.305-.56 2.788-.56 1.485 0 2.791.563 1.308.565 2.274 1.532a7.2 7.2 0 0 1 1.531 2.274q.564 1.308.564 2.794 0 1.48-.559 2.783a7.3 7.3 0 0 1-1.53 2.285 7.09 7.09 0 0 1-5.075 2.102"
      ></path>
    </svg>
  );
}

export default Clock;
