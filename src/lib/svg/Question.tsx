import React from "react";

interface IProps {
  width?: string;
  height?: string;
  className?: string;
}

function Question({ width, height, className }: IProps) {
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
        d="M8.063 12.359q.258 0 .438-.178a.6.6 0 0 0 .18-.436.6.6 0 0 0-.179-.438.6.6 0 0 0-.436-.18.6.6 0 0 0-.437.179.6.6 0 0 0-.18.436q0 .258.178.437.179.18.436.18m-.054 2.807a7 7 0 0 1-2.785-.559 7.2 7.2 0 0 1-2.289-1.54 7.2 7.2 0 0 1-1.541-2.286q-.56-1.305-.56-2.788 0-1.485.56-2.78a7.218 7.218 0 0 1 3.826-3.82q1.303-.56 2.787-.56 1.485 0 2.78.56a7.26 7.26 0 0 1 3.82 3.82q.56 1.3.56 2.778 0 1.479-.559 2.785a7.23 7.23 0 0 1-3.82 3.83 6.95 6.95 0 0 1-2.779.56m-.008-.666q2.708 0 4.604-1.896T14.5 8t-1.896-4.604T8 1.5 3.396 3.396 1.501 8t1.895 4.604Q5.293 14.5 8.001 14.5m.035-10.052q.639 0 1.102.398.462.396.462.992 0 .465-.247.835a3.3 3.3 0 0 1-.585.662q-.428.388-.764.875-.337.486-.364 1.068-.016.165.093.253a.4.4 0 0 0 .255.089.4.4 0 0 0 .26-.081.37.37 0 0 0 .134-.212q.105-.442.356-.778.252-.334.552-.634.432-.43.726-.958.294-.527.294-1.13 0-.92-.655-1.536a2.22 2.22 0 0 0-1.58-.618q-.687 0-1.264.335a3.2 3.2 0 0 0-.982.896.3.3 0 0 0-.049.29.32.32 0 0 0 .221.214.38.38 0 0 0 .312-.001q.147-.068.255-.153.277-.323.643-.564.364-.242.825-.242"
      ></path>
    </svg>
  );
}

export default Question;