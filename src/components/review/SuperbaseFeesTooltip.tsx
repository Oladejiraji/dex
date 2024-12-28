import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";

const SuperbaseFeesTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-[0.81rem] h-[0.81rem] cursor-pointer">
            <Image src={MainAssets.Info} alt="info icon" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Enjoy our services for free!!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SuperbaseFeesTooltip;
