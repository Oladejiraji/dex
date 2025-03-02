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
    <div className="flex h-[6.5rem] w-full flex-row items-center gap-4 rounded-[0.94rem] bg-[#0D0E0F] px-6 py-2 lg:h-[8.75rem] lg:w-[13.00rem] lg:flex-col lg:justify-center lg:gap-2 lg:px-3">
      <div className="h-[1.88rem] w-[1.88rem]">
        <RemoteImage src={asset.logoURI} width={32} height={32} />
      </div>
      <div className="flex flex-col lg:items-center">
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
    </div>
  );
};

export default ReviewChain;
