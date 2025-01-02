import MainAssets from '@/lib/assets/main';
import { TransactionHistory } from '@/services/queries/coins/types';
import Image from 'next/image';
import React from 'react';
import RemoteImage from '../shared/RemoteImage';

const HistoryListItem = ({ transaction }: { transaction: TransactionHistory }) => {
  return (
    <div className="flex items-center justify-center gap-[1.375rem]">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6">
          <RemoteImage
            width={24}
            height={24}
            src={transaction.route.userTxs[0].protocol.icon}
            alt="route icon"
            className="rounded-[0.3125rem]"
          />
        </div>
        <div>
          <h1 className="font-geist-medium text-xs leading-3 text-[#7D7D7D]">BRIDGE</h1>
          <h3 className="font-geist-medium text-sm leading-[0.875rem] text-[#D7D7D7]">
            {transaction.route.userTxs[0].protocol.displayName}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-[1.625rem] w-[1.625rem]">
            <Image src={MainAssets.Eth} alt="Token to be transformed" />
          </div>
          <div>
            <p className="font-geist-regular text-xs leading-3 text-[#7D7D7D]">FROM</p>
            <p className="font-geist-medium text-sm leading-[0.875rem] text-[#D7D7D7]">
              {transaction.route.userTxs[0].fromAsset.symbol}
            </p>
          </div>
        </div>
        <div className="h-8 w-8">
          <Image src={MainAssets.RightShadowIcon} alt="Right Icon" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[1.625rem] w-[1.625rem]">
            <Image src={MainAssets.Usdc} alt="Token to be transformed" />
          </div>
          <div>
            <p className="font-geist-regular text-xs leading-3 text-[#7D7D7D]">FROM</p>
            <p className="font-geist-medium text-sm leading-[0.875rem] text-[#D7D7D7]">
              {transaction.route.userTxs[0].fromAsset.symbol}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="font-geist-medium text-sm text-[#9B9B9B]">5 MIN. AGO</p>
      </div>
    </div>
  );
};

export default HistoryListItem;
