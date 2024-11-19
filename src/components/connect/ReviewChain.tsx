import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React from "react";
import RemoteImage from "../shared/RemoteImage";
import { AssetType, RouteType } from "@/services/queries/coins/types";
import { removeDecimal, stringToFixed } from "@/utils/helpers";

interface IProps {
  asset: AssetType;
  amount: string;
  type: "From" | "To";
  activeRoute: RouteType;
}

const ReviewChain = ({ asset, amount, type, activeRoute }: IProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-[#0D0E0F] rounded-[15px] px-3 py-2 w-[208px] h-[140px]">
      <div className="w-[30px] h-[30px]">
        <RemoteImage src={asset.logoURI} width={32} height={32} />
      </div>

      <h3 className="text-[15px] font-geist-medium">
        {stringToFixed(removeDecimal(asset.decimals, amount), 8)} {asset.symbol}
      </h3>
      <h4 className="text-[#7D7D7D] text-[14px] font-geist-regular">
        $
        {stringToFixed(
          type === "From"
            ? activeRoute.inputValueInUsd.toString()
            : activeRoute.outputValueInUsd.toString(),
          6
        )}
      </h4>
    </div>
  );
};

export default ReviewChain;
