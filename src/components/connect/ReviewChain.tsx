import React from 'react';
import RemoteImage from '../shared/RemoteImage';
import { AssetType, RouteType } from '@/services/queries/coins/types';
import { removeDecimal, stringToFixed } from '@/utils/helpers';

interface IProps {
  asset: AssetType;
  amount: string;
  type: 'From' | 'To';
  activeRoute: RouteType;
}

const ReviewChain = ({ asset, amount, type, activeRoute }: IProps) => {
  return (
    <div className="flex h-[8.75rem] w-[13.00rem] flex-col items-center justify-center gap-2 rounded-[0.94rem] bg-[#0D0E0F] px-3 py-2">
      <div className="h-[1.88rem] w-[1.88rem]">
        <RemoteImage src={asset.logoURI} width={32} height={32} />
      </div>

      <h3 className="font-geist-medium text-[0.94rem]">
        {stringToFixed(removeDecimal(asset.decimals, amount), 8)} {asset.symbol}
      </h3>
      <h4 className="font-geist-regular text-[0.88rem] text-[#7D7D7D]">
        $
        {stringToFixed(
          type === 'From' ? activeRoute.inputValueInUsd.toString() : activeRoute.outputValueInUsd.toString(),
          6
        )}
      </h4>
    </div>
  );
};

export default ReviewChain;
