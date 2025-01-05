import MainAssets from '@/lib/assets/main';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

import { ChainType, RouteType } from '@/services/queries/coins/types';
import RemoteImage from '../shared/RemoteImage';
import { removeDecimal, stringToFixed } from '@/utils/helpers';
import Button from '../shared/Button';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/utils/routes';
import Link from 'next/link';
import { MODAL_ANIMATION_VARIANTS } from '@/animation/variants';

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
  activeRoute: RouteType;
  hashState: `0x${string}` | undefined;
  activeChain?: ChainType;
}

export function SuccessModal({ isPopOpen, setIsPopOpen, activeRoute, activeChain, hashState }: IProps) {
  const { userTxs, fromAmount, toAmount } = activeRoute;
  const { fromAsset, toAsset } = userTxs[0];
  const router = useRouter();

  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="fixed left-0 top-[2rem] z-[1050] h-full w-full bg-transparent pb-[2.69rem] pt-[4.13rem] backdrop-blur-[0.25rem]"
          variants={MODAL_ANIMATION_VARIANTS}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <div className="relative mx-auto h-full w-[36.69rem] p-[0.06rem]">
            <div className="gradient_bg absolute inset-0 h-full w-full rounded-[1.25rem]" />
            <div className="select_gradient relative flex h-full flex-col rounded-[1.25rem]">
              <div className="flex items-center justify-between gap-2 rounded-t-[1.25rem] bg-[#0D0E0F] px-6 py-3">
                <div className="">
                  <h3 className="pb-2 font-geist-semibold text-sm text-[#7D7D7D]">Activity</h3>
                  <h4 className="font-geist-semibold text-base text-[#F9F9F9]">Transaction Details</h4>
                </div>
                {/* <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#32323240]"
                  onClick={() => setIsPopOpen(false)}
                >
                  <div className="h-[0.50rem] w-[0.50rem]">
                    <Image src={MainAssets.X} alt="X icon" />
                  </div>
                </button> */}
              </div>
              <div className="flex h-full flex-col items-center justify-center gap-12">
                <div className="h-[5.00rem] w-[5.00rem]">
                  <Image src={MainAssets.Success} alt="Success icon" />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="font-geist-medium text-[1.50rem] text-[#F9F9F9]">Success</h3>
                  <p className="font-geist-semibold text-[0.94rem] text-[#7D7D7D]">
                    View Transaction at{' '}
                    <Link target="_blank" className="underline" href={`${activeChain?.explorers[0]}/tx/${hashState}`}>
                      <span className="text-[#f9f9f9]">{activeChain?.name}</span>
                    </Link>
                  </p>
                </div>
                <div className="rounded-[0.25rem] border border-dashed border-[#272727] p-[0.38rem]">
                  <div className="rounded-[0.25rem] border border-[#272727] py-[0.38rem]">
                    <div className="flex items-center">
                      <div className="flex h-[4.50rem] w-[13.13rem] items-center gap-2 border-y border-[#272727] px-6">
                        <div className="relative">
                          <RemoteImage src={fromAsset.logoURI} width={24} height={24} />
                          <div className="absolute bottom-[-3px] right-[-3px] rounded-full border border-black">
                            <RemoteImage
                              src={activeChain?.icon || ''}
                              width={12}
                              height={12}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div className="font-geist-medium">
                          <h3 className="text-xs text-[#7D7D7D]">You sent</h3>
                          <h4 className="text-sm text-[#D7D7D7]">
                            {stringToFixed(removeDecimal(fromAsset.decimals, fromAmount), 8)} {fromAsset.symbol}
                          </h4>
                        </div>
                      </div>
                      <div className="flex h-[4.50rem] items-center justify-center border border-[#272727] px-2">
                        <div className="relative flex items-center justify-center">
                          <Image src={MainAssets.Send} alt="SEND icon" />
                          <div className="absolute bottom-[-3px] right-[-3px]">
                            <RemoteImage
                              src={activeRoute.userTxs[0].protocol.icon}
                              width={16}
                              height={16}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex h-[4.50rem] w-[13.13rem] items-center gap-2 border-y border-[#272727] px-6">
                        <div className="relative">
                          <RemoteImage src={toAsset.logoURI} width={24} height={24} />
                          <div className="absolute bottom-[-3px] right-[-3px] rounded-full border border-black">
                            <RemoteImage
                              src={activeChain?.icon || ''}
                              width={12}
                              height={12}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div className="font-geist-medium">
                          <h3 className="text-xs text-[#7D7D7D]">You received</h3>
                          <h4 className="text-sm text-[#D7D7D7]">
                            {stringToFixed(removeDecimal(toAsset.decimals, toAmount), 8)} {toAsset.symbol}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    className="h-14 w-[15.00rem] rounded-[0.63rem] bg-[#575EFF] text-[0.94rem] font-semibold"
                    onClick={() => {
                      setIsPopOpen(false);
                      setTimeout(() => {
                        router.push(AppRoutes.networks.path);
                      }, 200);
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
