import React, { ChangeEvent, useState } from "react";
import Select from "../shared/Select";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import { Eth, Usdt } from "@/lib/svg";
import Input from "../shared/Input";
import { useWalletInfo } from "@web3modal/wagmi/react";
import RenderIf from "../shared/RenderIf";
import { Combobox } from "../shared/Combobox";
import { ChainSelect } from "./ChainSelect";
import { ChainPopover } from "./ChainPopover";

const selData = [
  {
    label: "USDC.E",
    icon: Usdt,
    value: "usdt",
  },
  {
    label: "ETH",
    icon: Eth,
    value: "eth",
  },
];

interface IProps {
  type: "from" | "to";
}

const TransferBlock = ({ type }: IProps) => {
  const [value, setValue] = useState("");
  const { walletInfo } = useWalletInfo();

  const formatNumber = (value: string) => {
    const cleanValue = value.replace(/[^0-9.]/g, "");

    const [integerPart, decimalPart] = cleanValue.split(".");

    const formattedInteger = integerPart
      ? parseInt(integerPart, 10).toLocaleString()
      : "";

    return decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    const formattedValue = formatNumber(value);

    setValue(formattedValue);
  };

  return (
    <>
      <ChainPopover />
      <div className="flex flex-col gap-4 bg-primary-300 p-4 rounded-[10px] mt-[22px] relative">
        <div className="flex items-center justify-between w-full">
          <div>
            <Input
              className="bg-transparent border-none font-geist-medium text-2xl text-grey-300 p-0"
              onChange={handleInputChange}
              value={value}
              placeholder="0.00"
              disabled={!walletInfo}
            />
          </div>
          <div>
            <ChainSelect selData={selData} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-geist-regular text-xs text-grey-300">
              ${value || "0.00"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-geist-regular text-xs text-grey-300">
              9000 USDC available
            </p>
            <p className="font-geist-medium text-[10px] text-white">MAX</p>
          </div>
        </div>
        <RenderIf condition={type === "from"}>
          <div className="absolute bottom-[-24px] translate-x-[-50%] bg-primary-700 border border-primary-600 flex items-center justify-center rounded-full left-[50%] w-8 h-8">
            <div className="w-[10px] h-[10px]">
              <Image src={MainAssets.Up} alt="Up icon" />
            </div>
          </div>
        </RenderIf>
      </div>
    </>
  );
};

export default TransferBlock;
