import MainAssets from '@/lib/assets/main';
import { TransactionHistory } from '@/services/queries/coins/types';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import RemoteImage from '../shared/RemoteImage';
import { concatenateString } from '@/services/helper';
import { formatDistanceToNow } from 'date-fns';

interface IProps {
  transaction: TransactionHistory;
  setActiveHistory: Dispatch<SetStateAction<`0x${string}` | null>>;
}

const HistoryItem = ({ transaction, setActiveHistory }: IProps) => {
  return (
    <button
      className="flex items-center justify-center gap-[1.375rem]"
      onClick={() => setActiveHistory(transaction.hash)}
    >
      <div className="flex w-[6.25rem] items-center gap-2">
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
          <h3 className="text-left font-geist-medium text-sm leading-[0.875rem] text-[#D7D7D7]">
            {concatenateString(transaction.route.userTxs[0].protocol.displayName, 4)}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:w-[12.5rem]">
        <div className="flex items-center gap-2">
          <div className="h-[1.625rem] w-[1.625rem]">
            <Image src={MainAssets.Eth} alt="Token to be transformed" />
          </div>
          <div className="hidden sm:block">
            <p className="font-geist-regular text-xs leading-3 text-[#7D7D7D]">FROM</p>
            <p className="font-geist-medium text-sm leading-[0.875rem] text-[#D7D7D7]">
              {concatenateString(transaction.route.userTxs[0].fromAsset.symbol, 4)}
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
          <div className="hidden sm:block">
            <p className="font-geist-regular text-xs leading-3 text-[#7D7D7D]">FROM</p>
            <p className="font-geist-medium text-sm leading-[0.875rem] text-[#D7D7D7]">
              {concatenateString(transaction.route.userTxs[0].fromAsset.symbol, 4)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[6.25rem]">
        <p className="hidden text-left font-geist-medium text-sm text-[#9B9B9B] sm:block">
          {concatenateString(formatDistanceToNow(transaction.timestamp, { addSuffix: true }), 18)}
        </p>
        <p className="block text-left font-geist-medium text-xs text-[#9B9B9B] sm:hidden">
          {concatenateString(formatDistanceToNow(transaction.timestamp, { addSuffix: true }), 18).replace(
            'minutes',
            'mins'
          )}
        </p>
      </div>
    </button>
  );
};

export default HistoryItem;
