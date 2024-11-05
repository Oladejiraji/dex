import {
  QuoteResponse,
  QuoteResponseResult,
} from "@/services/queries/coins/types";
import React, { useState } from "react";
import Loader2 from "../shared/Loader/loader2";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import { minimizeAddress, removeDecimal, stringToFixed } from "@/utils/helpers";
import { ChainPopover } from "./ChainPopover";
import { RecipientPopover } from "./RecipientPopover";
import { useExchangeContext } from "@/context/ExchangeContext";

interface IProps {
  isPending: boolean;
  quoteData?: QuoteResponseResult;
}

const RouteBlock = ({ isPending, quoteData }: IProps) => {
  const [isPopOpen, setIsPopOpen] = useState(false);
  const { recipientAddress } = useExchangeContext();
  return (
    <>
      <RecipientPopover isPopOpen={isPopOpen} setIsPopOpen={setIsPopOpen} />
      <div className="mt-4 rounded-[10px] border border-grey-200">
        {isPending && !quoteData && (
          <div className="flex justify-center py-4 items-center gap-2">
            <p>Finding the best route for you</p>
            <Loader2 />
          </div>
        )}
        {!isPending && quoteData?.routes.length === 0 && (
          <div className="flex justify-center py-4 items-center gap-2 ">
            <div className="h-9 w-9">
              <Image src={MainAssets.Broken} alt="broken routes image" />
            </div>
            <p>No routes found for your desired transfer</p>
          </div>
        )}
        {!isPending && quoteData && quoteData?.routes.length > 0 && (
          <>
            <div className="flex items-center justify-between bg-primary-300 px-4 py-3 rounded-t-[10px]">
              <h3 className="font-geist-regular text-grey-300 text-sm">
                Recipient address
              </h3>
              <button
                className="flex items-center gap-2"
                onClick={() => setIsPopOpen(true)}
              >
                {recipientAddress ? (
                  <div className="flex items-center bg-primary-200 rounded-full py-1 px-3 border border-[#32323240] gap-2 font-geist-medium text-sm">
                    <h3 className="font-geist-medium text-grey-400 text-sm">
                      {minimizeAddress(recipientAddress)}
                    </h3>
                    <p className="underline text-grey-400">Edit</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-geist-medium text-grey-400 text-sm">
                      Add Recipient Address
                    </h3>
                    <div className="w-[14px] h-[14px]">
                      <Image src={MainAssets.YellowPlus} alt="Plus button" />
                    </div>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center  justify-between px-4 py-3 border-b border-grey-200">
              <div className="flex items-center justify-center gap-2">
                <div className="w-6 h-6">
                  <Image src={MainAssets.Ox} alt="Ox icon" />
                </div>
                <p className="font-geist-regular text-grey-300">OX</p>
              </div>
              <p className="text-grey-400 text-sm font-geist-regular text-right">
                {quoteData.routes[0]?.routeId}
              </p>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b border-grey-200">
              <p className="font-geist-regular text-sm text-grey-300">
                Est. Output
              </p>
              <p className="text-grey-400 font-geist-regular text-sm">
                {quoteData.toAsset.symbol}{" "}
                {stringToFixed(
                  removeDecimal(
                    quoteData.toAsset.decimals,
                    quoteData.routes[0]?.toAmount
                  )
                )}
              </p>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b border-grey-200">
              <p className="font-geist-regular text-sm text-grey-300">
                Gas Fees
              </p>
              <p className="text-grey-300 font-geist-regular">
                $
                {stringToFixed(
                  quoteData.routes[0]?.totalGasFeesInUsd.toString()
                )}
              </p>
            </div>
            <div className="flex items-center gap-6 px-4 py-3">
              <p className="font-geist-medium text-xs text-grey-500">
                Gas Fees are lowest at this point
              </p>
              <p className="font-geist-medium text-xs text-grey-500 underline">
                Superbase Ai
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RouteBlock;
