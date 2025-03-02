import MainAssets from '@/lib/assets/main';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import Select from '../shared/Select';
import { priorityOptions } from '@/utils/static';
import { cn } from '@/lib/utils';
import { errorToast } from '@/utils/helpers';
import { MODAL_ANIMATION_VARIANTS } from '@/animation/variants';

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

export function SettingsModal({ isPopOpen, setIsPopOpen, priority, setPriority, slippage, setSlippage }: IProps) {
  const activePriority = priorityOptions.find((pr) => pr.value === priority);

  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="absolute left-0 top-[4rem] z-[50] flex h-full w-full items-start bg-transparent pb-[2.69rem] pt-[4.13rem] text-white backdrop-blur-[0.25rem]"
          variants={MODAL_ANIMATION_VARIANTS}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <div className="relative mx-auto h-fit w-full max-w-[29.38rem] p-[0.06rem]">
            <div className="gradient_bg absolute inset-0 h-full w-full rounded-[0.38rem]" />

            <div className="select_gradient relative flex flex-1 flex-col rounded-[0.38rem]">
              <div className="flex items-center justify-between rounded-t-[0.63rem] px-5 py-2 lg:bg-[#0D0E0F]">
                <h1 className="font-geist-medium text-base text-[#f9f9f9]">Transaction Settings</h1>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#272727] bg-[#08090A]"
                  onClick={() => setIsPopOpen(false)}
                >
                  <div className="h-[0.56rem] w-[0.56rem]">
                    <Image src={MainAssets.X} alt="X icon" />
                  </div>
                </button>
              </div>
              <div className="p-5">
                <div className="flex flex-col justify-between gap-[0.875rem] lg:flex-row lg:items-center lg:gap-0">
                  <div className="flex flex-col gap-1 lg:gap-0">
                    <p className="font-geist-medium text-[0.94rem] leading-[1.13rem]">Route Sorting priority</p>
                    <p className="font-geist-medium text-[0.88rem] leading-[1.06rem] text-[#7D7D7D]">
                      {activePriority?.info}
                    </p>
                  </div>
                  <div>
                    <Select
                      selData={priorityOptions}
                      value={priority}
                      onChange={(value: string) => setPriority(value)}
                      className="h-10 gap-0 rounded-[0.38rem] border border-solid border-[#272727] font-geist-medium text-[0.94rem] text-[#AFAFAF] lg:w-[10.81rem]"
                      itemClassName="text-[#5F5F5F] font-geist-medium text-[0.94rem] px-0 justify-center  h-10 w-[10.81rem] focus:bg-[#0A0B0C]"
                      listClassName="bg-[#0F0F0F] border border-[#272727] rounded-[0.38rem]"
                    />
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2">
                <div className="flex flex-col gap-1 lg:gap-0">
                  <h1 className="font-geist-medium text-[0.94rem] leading-[1.13rem] text-[#F9F9F9]">Swap Slippage</h1>
                  <h3 className="font-geist-medium text-[0.88rem] leading-[1.06rem] text-[#7D7D7D]">
                    Set swap Slippage
                  </h3>
                </div>
                <div className="flex items-center gap-[0.88rem] pt-4">
                  {presetSlippageOptions.map((option) => {
                    return option.editable ? (
                      <div key={option.id} className="relative flex-1 font-geist-medium text-[0.94rem] text-[#5F5F5F]">
                        <input
                          type="number"
                          className={cn(
                            'h-[3.13rem] w-full rounded-[0.38rem] border-[0.5px] border-[#272727] bg-[#0F0F0F] px-2',
                            // 'h-[3.13rem] w-[10.1875rem] rounded-[0.38rem] border-[0.5px] border-[#272727] bg-[#0F0F0F] px-2 lg:w-[15.88rem]',
                            {
                              'border border-[#636363]': slippage.custom,
                            }
                          )}
                          placeholder="Custom"
                          value={slippage.custom ? slippage.value : ''}
                          onChange={(e) => {
                            console.log(e);
                            if (parseFloat(e.target.value) > 50) {
                              errorToast('Slippage cannot be more than 50%');
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
                        <span className="absolute right-3 top-[30%]">%</span>
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
                          'flex h-[3.13rem] w-[2.88rem] cursor-pointer items-center justify-center rounded-[0.38rem] border-[0.5px] border-[#272727] bg-[#0F0F0F] font-geist-medium text-[0.875rem] text-[#AFAFAF] transition lg:text-[0.94rem]',
                          {
                            'border border-[#636363]': option.value === slippage.value && !slippage.custom,
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
