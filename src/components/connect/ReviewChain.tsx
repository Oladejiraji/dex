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
    <div className="flex flex-col justify-center items-center gap-2 bg-[#0D0E0F] rounded-[0.94rem] px-3 py-2 w-[13.00rem] h-[8.75rem]">
      <div className="w-[1.88rem] h-[1.88rem]">
        <RemoteImage src={asset.logoURI} width={32} height={32} />
      </div>

      <h3 className="text-[0.94rem] font-geist-medium">
        {stringToFixed(removeDecimal(asset.decimals, amount), 8)} {asset.symbol}
      </h3>
      <h4 className="text-[#7D7D7D] text-[0.88rem] font-geist-regular">
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
