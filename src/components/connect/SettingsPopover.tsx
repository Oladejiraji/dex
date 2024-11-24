import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import Select from "../shared/Select";

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
}

const priorityOptions = [
  { value: "max", label: "Maximum Return" },
  { value: "fastest", label: "Fastest Route" },
];

export function SettingsPopover({ isPopOpen, setIsPopOpen }: IProps) {
  const [priority, setPriority] = useState(priorityOptions[0].value);
  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="absolute left-0 top-0 z-[50] backdrop-blur-[4px] bg-transparent w-full h-full pt-[66px] pb-[43px] flex items-start text-white"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-[470px] mx-auto w-full relative p-[1px] h-fit ">
            <div className="gradient_bg absolute inset-0 w-full h-full rounded-[6px]" />

            <div className="relative select_gradient rounded-[6px] flex-1 flex flex-col ">
              <div className=" flex items-center justify-between bg-[#0D0E0F] py-2 px-5 rounded-t-[10px]">
                <h1 className="text-base font-geist-medium text-[#f9f9f9]">
                  Transaction Settings
                </h1>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-[#272727] bg-[#08090A]"
                  onClick={() => setIsPopOpen(false)}
                >
                  <div className="w-[9px] h-[9px]">
                    <Image src={MainAssets.X} alt="X icon" />
                  </div>
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[15px] font-geist-medium leading-[18px]">
                      Route Sorting priority
                    </p>
                    <p className="text-[14px] font-geist-medium leading-[17px] text-[#7D7D7D]">
                      Sort by highest output
                    </p>
                  </div>
                  <div>
                    <Select
                      selData={priorityOptions}
                      value={priority}
                      onChange={(value: string) => setPriority(value)}
                      className="border border-solid border-[#272727] rounded-[6px] text-[15px] font-geist-medium text-[#AFAFAF] h-10 w-[173px] gap-0"
                      itemClassName="text-[#5F5F5F] font-geist-medium text-[15px] px-0 justify-center  h-10 w-[173px]"
                      listClassName="bg-[#0F0F0F] border border-[#272727] rounded-[6px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
