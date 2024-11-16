import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import Input from "../shared/Input";
import RenderIf from "../shared/RenderIf";
import { ChainSelect } from "./ChainSelect";
import { ChainPopover } from "./ChainPopover";
import { useSocketTokensRead } from "@/services/queries/coins";
import {
  ChainType,
  SocketToken,
  TokenBalance,
} from "@/services/queries/coins/types";
import {
  formatNumber,
  formatNumberWithComma,
  removeDecimal,
  stringToFixed,
} from "@/utils/helpers";
import { useExchangeContext } from "@/context/ExchangeContext";
import NumberFlow from "@number-flow/react";

interface IProps {
  type: "from" | "to";
  value: string;
  calculatedValue: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  blockId: number;
  balance?: TokenBalance;
  currChain: ChainType;
}

const TransferBlock = ({
  type,
  value,
  calculatedValue,
  handleInputChange,
  blockId,
  currChain,
  balance,
}: IProps) => {
  const { updateChain, reverseChain, chainFrom, chainTo } =
    useExchangeContext();

  const [isPopOpen, setIsPopOpen] = useState(false);
  const { data, isSuccess } = useSocketTokensRead(currChain.chainId);
  useEffect(() => {
    if (isSuccess && data) {
      if (type === "from") {
        // const usdcData = data.find((ed) => ed.symbol === "MATIC");
        updateChain("from", data[0]);
      }
      if (type === "to") {
        // const ethData = data.find((ed) => ed.symbol === "USDC");
        updateChain("to", data[1]);
      }
    }
  }, [isSuccess]);

  const handleChainUpdate = (chain: SocketToken) => {
    updateChain(type, chain);
  };

  const activeChain = type === "from" ? chainFrom : chainTo;
  return (
    <>
      <ChainPopover
        type={type}
        isPopOpen={isPopOpen}
        setIsPopOpen={setIsPopOpen}
        handleChainUpdate={handleChainUpdate}
        currChain={currChain}
      />
      <div className="flex flex-col gap-4 bg-primary-300 px-4 py-[18px] rounded-[10px]  relative">
        <div className="flex items-center justify-between w-full">
          {type === "from" ? (
            <div>
              <Input
                className="bg-transparent border-none font-geist-medium text-2xl text-grey-300 p-0"
                onChange={handleInputChange}
                value={
                  type === "from"
                    ? formatNumber(value)
                    : formatNumber(calculatedValue)
                }
                placeholder="0.00"
                // disabled={!walletInfo || type === "to"}
              />
            </div>
          ) : (
            <div>
              <NumberFlow
                value={parseFloat(calculatedValue)}
                format={{ notation: "standard", maximumFractionDigits: 10 }} // Intl.NumberFormat options
                locales="en-US" // Intl.NumberFormat locales
                className="text-grey-300 font-geist-medium text-2xl"
              />
            </div>
          )}

          <div>
            <ChainSelect value={activeChain} setIsPopOpen={setIsPopOpen} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* {activeChain && (
            <div>
              <p className="font-geist-regular text-xs text-grey-300">
                $
                {formatNumberWithComma(
                  (parseFloat(value) * activeChain.current_price).toString()
                ) || "0.00"}
              </p>
            </div>
          )} */}
          <div />
          {balance && type === "from" ? (
            <div className="flex items-center gap-2">
              <p className="font-geist-regular text-xs text-grey-300">Bal:</p>
              <p className="font-geist-regular text-xs text-grey-300">
                {stringToFixed(
                  removeDecimal(balance.decimals, balance?.balance)
                )}{" "}
                {balance?.symbol}
              </p>
              <p className="font-geist-medium text-[10px] text-white">MAX</p>
            </div>
          ) : null}
        </div>
        <RenderIf condition={blockId === 1}>
          <button
            className="absolute bottom-[-18px] translate-x-[-50%] bg-[#0D0E0F] border-[3px] border-[#060708] flex items-center justify-center rounded-[8px] left-[50%] w-8 h-8 z-[10]"
            onClick={reverseChain}
          >
            <div className="w-[10px] h-[10px]">
              <Image src={MainAssets.Up} alt="Up icon" />
            </div>
          </button>
        </RenderIf>
      </div>
    </>
  );
};

export default TransferBlock;
