import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React from "react";
import RemoteImage from "../shared/RemoteImage";
import { AssetType } from "@/services/queries/coins/types";
import { removeDecimal, stringToFixed } from "@/utils/helpers";

interface IProps {
  asset: AssetType;
  amount: string;
}

const ReviewChain = ({ asset, amount }: IProps) => {
  return (
    <div className="flex items-center gap-4 bg-primary-200 rounded-[4px] px-3 py-2 w-[200px]">
      <div className="w-8 h-8">
        <RemoteImage src={asset.logoURI} width={32} height={32} />
      </div>
      <div className="font-geist-medium text-sm">
        <h3>
          <span className="text-grey-300">From:</span> Polygon
        </h3>
        <h4>
          {stringToFixed(removeDecimal(asset.decimals, amount), 8)}{" "}
          {asset.symbol}
        </h4>
      </div>
    </div>
  );
};

export default ReviewChain;
