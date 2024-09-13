import { Label } from "@/components/ui/label";
import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import cx from "classnames";
import Input from "../shared/Input";
import { ChainOptions } from "@/data/ChainOptions";
import RenderIf from "../shared/RenderIf";
import { useCoinsRead, useSocketTokensRead } from "@/services/queries/coins";
import {
  CoinData,
  RouteType,
  SocketToken,
} from "@/services/queries/coins/types";
import { useExchangeContext } from "@/context/ExchangeContext";
import { chainBaseData } from "@/utils/static";
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
}

export function SuccessPopover({
  isPopOpen,
  setIsPopOpen,
  activeRoute,
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
          className="absolute left-0 top-0 z-[50] backdrop-blur-[4px] bg-transparent w-full h-full pt-[66px] pb-[43px]"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-[470px] mx-auto w-full relative p-[1px] h-full">
            <div className="gradient_bg absolute inset-0 w-full h-full rounded-[20px]" />
            <div className="relative select_gradient rounded-[20px] h-full flex flex-col">
              <div className="flex items-center gap-2 px-6 justify-between rounded-t-[20px] bg-[#0D0E0F] py-3">
                <div className="font-geist-bold">
                  <h3 className="text-[#7D7D7D] text-sm">Activity</h3>
                  <h4 className="text-[#F9F9F9] text-base">
                    Transaction Details
                  </h4>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-[#32323240]"
                  onClick={() => setIsPopOpen(false)}
                >
                  <div className="w-[11px] h-[11px]">
                    <Image src={MainAssets.X} alt="X icon" />
                  </div>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center h-full gap-12">
                <div className="w-[80px] h-[80px]">
                  <Image src={MainAssets.Success} alt="Success icon" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-[#F9F9F9] font-geist-bold text-2xl">
                    Success
                  </h3>
                  <p className="text-[#F9F9F9] font-geist-bold text-sm">
                    Transaction successful view at{" "}
                    <Link
                      target="_blank"
                      className="underline"
                      href={`https://polygonscan.com/tx/${hashState}`}
                    >
                      Polygon
                    </Link>
                  </p>
                </div>
                <div className="border border-[#272727] border-dashed p-[6px] rounded-[4px]">
                  <div className="border border-[#272727] py-[6px] rounded-[4px]">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 border-y border-[#272727] h-[72px] px-6">
                        <div className="w-8 h-8">
                          <RemoteImage
                            src={fromAsset.logoURI}
                            width={32}
                            height={32}
                          />
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
                      <div className="border border-[#272727] flex items-center justify-center h-[72px]">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <Image src={MainAssets.Send} alt="SEND icon" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-y border-[#272727] h-[72px] px-6">
                        <div className="w-8 h-8">
                          <RemoteImage
                            src={toAsset.logoURI}
                            width={32}
                            height={32}
                          />
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
                    className="bg-[#575EFF] rounded-[10px] h-14 w-[240px]"
                    onClick={() => {
                      setIsPopOpen(false);
                      restartSwap();
                      setTimeout(() => {
                        router.push(AppRoutes.connect.path);
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
