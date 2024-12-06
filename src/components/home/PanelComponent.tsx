import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import cx from "classnames";
import { ChainType } from "@/services/queries/coins/types";
import { useLenis } from "lenis/react";
import MainAssets from "@/lib/assets/main";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/utils/routes";

interface IProps {
  index: number;
  isActive: boolean;
  reverseIndex: number;
  chain: ChainType;
  actualRotation: number[];
  setActiveScroll: Dispatch<SetStateAction<number>>;
  setActivePanel: Dispatch<SetStateAction<number>>;
  returnTransform: (index: number) => 0 | 450 | 50;
}

const PanelComponent = ({
  reverseIndex,
  index,
  isActive,
  chain,
  actualRotation,
  setActiveScroll,
  setActivePanel,
  returnTransform,
}: IProps) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const lenis = useLenis();

  return (
    <motion.div
      style={{ top: 142 * (index - 1), zIndex: index }}
      className="absolute flex gap-4"
      animate={{ translateY: returnTransform(index) }}
    >
      {/* Info for stability */}
      <div className="opacity-0">
        <div className="flex items-center gap-3">
          <div className="">
            <Image
              src={chain.icon}
              alt="Chain Icon"
              width={48}
              height={48}
              className="rounded-[8px]"
            />
          </div>
          <div className="">
            <p className="text-[#F0F0F0] text-[13px] font-geist-semibold">
              {chain.name}
            </p>
            <p className="text-[#919191] text-[13px] font-geist-medium">
              {chain.isL1 ? "L1 interaction" : "L2 interaction"}
            </p>
          </div>
        </div>
      </div>
      {/* Main Panel */}
      <motion.div
        id={`panel-${index}`}
        className={cx(" overflow-y-hidden panel_con cursor-pointer", {
          "h-[300px]": !isActive,
          "h-[585px]": isActive,
        })}
        // whileHover={{ scale: 1.02 }}
        onHoverStart={() => setActiveScroll(index)}
        onHoverEnd={() => setActiveScroll(0)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          if (isActive) {
            // setActivePanel(0);
            router.push(AppRoutes.connect.path(chain.chainId));
          } else {
            setActivePanel(index);
          }
          setTimeout(() => {
            lenis?.scrollTo(`#panel-${index}`, { offset: -100 });
          }, 300);
        }}
        animate={{
          scale: isHover ? 1.02 : 1,
          rotateX: isActive
            ? "0deg"
            : `-${actualRotation[reverseIndex - 1] + 20}deg`,
        }}
      >
        {/* Actual panel image */}
        <Image src={MainAssets.StraightPanel} alt="Panel" />
        {/* Chain icon */}
        <div className="absolute top-[50px] left-[100px] ">
          <div className="flex items-center gap-3">
            <div className="">
              <Image
                src={chain.icon}
                alt="Chain Icon"
                width={48}
                height={48}
                className="rounded-[8px]"
              />
            </div>
          </div>
        </div>
      </motion.div>
      {/* Info that shows on hover */}
      <motion.div
        className="mt-2 opacity-0"
        animate={{
          opacity: isHover ? 1 : 0,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12">
            <Image
              src={chain.icon}
              alt="Chain Icon"
              width={48}
              height={48}
              className="rounded-[8px]"
            />
          </div>
          <div className="">
            <p className="text-[#F0F0F0] text-[13px] font-geist-semibold">
              {chain.name}
            </p>
            <p className="text-[#919191] text-[13px] font-geist-medium whitespace-nowrap">
              {chain.isL1 ? "L1 interaction" : "L2 interaction"}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PanelComponent;
