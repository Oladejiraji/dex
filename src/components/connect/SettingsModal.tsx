import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import Select from "../shared/Select";
import { priorityOptions } from "@/utils/static";
import { cn } from "@/lib/utils";
import { errorToast } from "@/utils/helpers";

interface SlippageType {
  value: number;
  custom: boolean;
}
interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
  priority: string;
  setPriority: Dispatch<SetStateAction<string>>;
  slippage: SlippageType;
  setSlippage: Dispatch<SetStateAction<SlippageType>>;
}

const presetSlippageOptions = [
  { id: 1, value: 0.5, active: true },
  { id: 2, value: 1, active: false },
  { id: 3, value: 3, active: false },
  { id: 4, value: 3, active: false, editable: true },
];

export function SettingsModal({
  isPopOpen,
  setIsPopOpen,
  priority,
  setPriority,
  slippage,
  setSlippage,
}: IProps) {
  const activePriority = priorityOptions.find((pr) => pr.value === priority);

  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="absolute left-0 top-0 z-[50] backdrop-blur-[0.25rem] bg-transparent w-full h-full pt-[4.13rem] pb-[2.69rem] flex items-start text-white"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-[29.38rem] mx-auto w-full relative p-[0.06rem] h-fit ">
            <div className="gradient_bg absolute inset-0 w-full h-full rounded-[0.38rem]" />

            <div className="relative select_gradient rounded-[0.38rem] flex-1 flex flex-col ">
              <div className=" flex items-center justify-between bg-[#0D0E0F] py-2 px-5 rounded-t-[0.63rem]">
                <h1 className="text-base font-geist-medium text-[#f9f9f9]">
                  Transaction Settings
                </h1>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-[#272727] bg-[#08090A]"
                  onClick={() => setIsPopOpen(false)}
                >
                  <div className="w-[0.56rem] h-[0.56rem]">
                    <Image src={MainAssets.X} alt="X icon" />
                  </div>
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.94rem] font-geist-medium leading-[1.13rem]">
                      Route Sorting priority
                    </p>
                    <p className="text-[0.88rem] font-geist-medium leading-[1.06rem] text-[#7D7D7D]">
                      {activePriority?.info}
                    </p>
                  </div>
                  <div>
                    <Select
                      selData={priorityOptions}
                      value={priority}
                      onChange={(value: string) => setPriority(value)}
                      className="border border-solid border-[#272727] rounded-[0.38rem] text-[0.94rem] font-geist-medium text-[#AFAFAF] h-10 w-[10.81rem] gap-0"
                      itemClassName="text-[#5F5F5F] font-geist-medium text-[0.94rem] px-0 justify-center  h-10 w-[10.81rem] focus:bg-[#0A0B0C]"
                      listClassName="bg-[#0F0F0F] border border-[#272727] rounded-[0.38rem]"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 pt-2 pb-5">
                <div>
                  <h1 className="text-[0.94rem] font-geist-medium text-[#F9F9F9] leading-[1.13rem]">
                    Swap Slippage
                  </h1>
                  <h3 className="text-[0.88rem] font-geist-medium text-[#7D7D7D] leading-[1.06rem]">
                    Set swap Slippage
                  </h3>
                </div>
                <div className="pt-4 flex items-center gap-[0.88rem]">
                  {presetSlippageOptions.map((option) => {
                    return option.editable ? (
                      <div
                        key={option.id}
                        className="relative text-[#5F5F5F] font-geist-medium text-[0.94rem]"
                      >
                        <input
                          type="number"
                          className={cn(
                            "bg-[#0F0F0F] border-[0.5px] border-[#272727] w-[15.88rem] h-[3.13rem] rounded-[0.38rem] px-2",
                            {
                              "border border-[#636363]": slippage.custom,
                            }
                          )}
                          placeholder="Custom"
                          value={slippage.custom ? slippage.value : ""}
                          onChange={(e) => {
                            console.log(e);
                            if (parseFloat(e.target.value) > 50) {
                              errorToast("Slippage cannot be more than 50%");
                            } else if (e.target.value) {
                              setSlippage({
                                custom: true,
                                value: parseFloat(e.target.value),
                              });
                            } else {
                              setSlippage({
                                custom: false,
                                value: 0.5,
                              });
                            }
                          }}
                        />
                        <span className="absolute right-3 top-[30%] ">%</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSlippage({
                            custom: false,
                            value: option.value,
                          });
                        }}
                        type="button"
                        key={option.id}
                        className={cn(
                          "w-[2.88rem] h-[3.13rem] transition text-[#AFAFAF] text-[0.94rem] bg-[#0F0F0F] font-geist-medium flex items-center justify-center  border-[0.5px] border-[#272727] rounded-[0.38rem] cursor-pointer",
                          {
                            "border border-[#636363]":
                              option.value === slippage.value &&
                              !slippage.custom,
                          }
                        )}
                      >
                        {option.value}%
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
