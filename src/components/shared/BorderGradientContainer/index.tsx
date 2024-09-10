import React, { type ReactNode } from "react";

const BorderGradientContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-3xl p-px bg-gradient-to-b from-[#E62A7B]  to-[#D109FF] w-fit">
      <div className="bg-transparent rounded-[20px]">{children}</div>
    </div>
  );
};

export default BorderGradientContainer;
