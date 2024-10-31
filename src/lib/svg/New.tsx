import React from "react";

interface IProps {
  width?: string;
  height?: string;
  className?: string;
}

function New({ width, height, className }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "14"}
      height={height || "14"}
      fill="none"
      viewBox="0 0 9 13"
    >
      <path
        className={className}
        d="M3.962 7.666H1.433a.41.41 0 0 1-.397-.233.46.46 0 0 1 .012-.464L5.156.32A.37.37 0 0 1 5.41.103a.6.6 0 0 1 .336.019.54.54 0 0 1 .273.2q.105.146.08.335l-.545 4.676h2.718q.287 0 .413.256a.45.45 0 0 1-.038.488l-4.532 5.857a.52.52 0 0 1-.27.181.44.44 0 0 1-.322-.038.53.53 0 0 1-.24-.227.41.41 0 0 1-.029-.313z"
      ></path>
    </svg>
  );
}

export default New;
