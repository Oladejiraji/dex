import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

import { ChainType, RouteType } from "@/services/queries/coins/types";
import { useExchangeContext } from "@/context/ExchangeContext";
import RemoteImage from "../shared/RemoteImage";
import { removeDecimal, stringToFixed } from "@/utils/helpers";
import Button from "../shared/Button";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/utils/routes";
import Link from "next/link";

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
  activeRoute: RouteType;
  hashState: string;
  activeChain?: ChainType;
}

export function SuccessPopover({
  isPopOpen,
  setIsPopOpen,
  activeRoute,
  activeChain,
  hashState,
}: IProps) {
  const { userTxs, fromAmount, toAmount } = activeRoute;
  const { fromAsset, toAsset } = userTxs[0];
  const router = useRouter();
  const { restartSwap } = useExchangeContext();

  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="absolute left-0 top-0 z-[50] backdrop-blur-[0.25rem] bg-transparent w-full h-full pt-[4.13rem] pb-[2.69rem]"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-[36.69rem] mx-auto  relative p-[0.06rem] h-full">
            <div className="gradient_bg absolute inset-0 w-full h-full rounded-[1.25rem]" />
            <div className="relative select_gradient rounded-[1.25rem] h-full flex flex-col">
              <div className="flex items-center gap-2 px-6 justify-between rounded-t-[1.25rem] bg-[#0D0E0F] py-3">
                <div className="">
                  <h3 className="text-[#7D7D7D] text-sm font-geist-semibold pb-2">
                    Activity
                  </h3>
                  <h4 className="text-[#F9F9F9] text-base font-geist-semibold">
                    Transaction Details
                  </h4>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-[#32323240]"
                  onClick={() => setIsPopOpen(false)}
                >
                  <div className="w-[0.50rem] h-[0.50rem]">
                    <Image src={MainAssets.X} alt="X icon" />
                  </div>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center h-full gap-12">
                <div className="w-[5.00rem] h-[5.00rem]">
                  <Image src={MainAssets.Success} alt="Success icon" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-[#F9F9F9] font-geist-medium text-[1.50rem]">
                    Success
                  </h3>
                  <p className="text-[#7D7D7D] font-geist-semibold text-[0.94rem]">
                    Transaction successful view at{" "}
                    <Link
                      target="_blank"
                      className="underline"
                      href={`${activeChain?.explorers[0]}/tx/${hashState}`}
                    >
                      <span className="text-[#f9f9f9]">
                        {activeChain?.name}
                      </span>
                    </Link>
                  </p>
                </div>
                <div className="border border-[#272727] border-dashed p-[0.38rem] rounded-[0.25rem]">
                  <div className="border border-[#272727] py-[0.38rem] rounded-[0.25rem]">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 border-y border-[#272727] h-[4.50rem] w-[13.13rem] px-6">
                        <div className="relative">
                          <RemoteImage
                            src={fromAsset.logoURI}
                            width={24}
                            height={24}
                          />
                          <div className="absolute right-[-3px] bottom-[-3px] border border-black rounded-full">
                            <RemoteImage
                              src={activeChain?.icon || ""}
                              width={12}
                              height={12}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div className="font-geist-medium">
                          <h3 className="text-xs text-[#7D7D7D]">You sent</h3>
                          <h4 className="text-sm text-[#D7D7D7]">
                            {stringToFixed(
                              removeDecimal(fromAsset.decimals, fromAmount),
                              8
                            )}{" "}
                            {fromAsset.symbol}
                          </h4>
                        </div>
                      </div>
                      <div className="border border-[#272727] flex items-center justify-center h-[4.50rem] px-2">
                        <div className=" flex items-center justify-center relative">
                          <Image src={MainAssets.Send} alt="SEND icon" />
                          <div className="absolute right-[-3px] bottom-[-3px]">
                            <RemoteImage
                              src={activeRoute.userTxs[0].protocol.icon}
                              width={16}
                              height={16}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-y border-[#272727] h-[4.50rem] w-[13.13rem] px-6">
                        <div className="relative">
                          <RemoteImage
                            src={toAsset.logoURI}
                            width={24}
                            height={24}
                          />
                          <div className="absolute right-[-3px] bottom-[-3px] border border-black rounded-full">
                            <RemoteImage
                              src={activeChain?.icon || ""}
                              width={12}
                              height={12}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div className="font-geist-medium">
                          <h3 className="text-xs text-[#7D7D7D]">
                            You received
                          </h3>
                          <h4 className="text-sm text-[#D7D7D7]">
                            {stringToFixed(
                              removeDecimal(toAsset.decimals, toAmount),
                              8
                            )}{" "}
                            {toAsset.symbol}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    className="bg-[#575EFF] rounded-[0.63rem] h-14 w-[15.00rem] text-[0.94rem] font-semibold"
                    onClick={() => {
                      setIsPopOpen(false);
                      restartSwap();
                      setTimeout(() => {
                        router.push(AppRoutes.networks.path);
                      }, 500);
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
