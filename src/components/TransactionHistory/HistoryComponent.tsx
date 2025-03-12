import MainAssets from '@/lib/assets/main';
import { TransactionHistory } from '@/services/queries/coins/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import RemoteImage from '../shared/RemoteImage';
import { removeDecimal, stringToFixed } from '@/utils/helpers';
import Button from '../shared/Button';
import { concatenateString } from '@/services/helper';

interface IProps {
  activeHistoryData?: TransactionHistory;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
  setActiveHistory: Dispatch<SetStateAction<`0x${string}` | null>>;
}

const HistoryComponent = ({ activeHistoryData, setIsPopOpen, setActiveHistory }: IProps) => {
  return (
    <div className="relative mx-auto h-full w-full p-[0.06rem] lg:w-[36.69rem]">
      <div className="gradient_bg absolute inset-0 h-full w-full rounded-[1.25rem]" />
      <div className="select_gradient relative flex h-full w-full flex-col rounded-[1.25rem]">
        <div className="flex items-center justify-between gap-2 rounded-t-[1.25rem] bg-[#0D0E0F] px-6 py-3">
          <div className="">
            <h3 className="pb-0 font-geist-semibold text-sm text-[#7D7D7D] sm:pb-2">Activity</h3>
            <h4 className="pt-1 font-geist-bold text-[0.9375rem] leading-[1.125rem] text-[#999999] sm:text-xl sm:leading-[1.375rem]">
              Transaction Details
            </h4>
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full border-[#32323240] sm:border"
            onClick={() => {
              setIsPopOpen(false);
              setActiveHistory(null);
            }}
          >
            <div className="h-[0.50rem] w-[0.50rem]">
              <Image src={MainAssets.X} alt="X icon" />
            </div>
          </button>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 sm:gap-12">
          <div className="h-[5.00rem] w-[5.00rem]">
            <Image src={MainAssets.Success} alt="Success icon" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-geist-medium text-xl text-[#F9F9F9] sm:text-[1.50rem]">Success</h3>
            <p className="font-geist-semibold text-sm text-[#7D7D7D] sm:text-[0.94rem]">
              View Transaction at{' '}
              <Link
                target="_blank"
                className="underline"
                href={`${activeHistoryData?.chain?.explorers[0]}/tx/${activeHistoryData?.hash}`}
              >
                <span className="text-[#f9f9f9]">{activeHistoryData?.chain?.name}</span>
              </Link>
            </p>
          </div>
          <div className="mx-6 mb-10 mt-5 rounded-[0.25rem] border border-dashed border-[#272727] p-[0.38rem] sm:mx-0 sm:mb-0 sm:mt-0">
            <div className="rounded-[0.25rem] border border-[#272727] py-[0.38rem]">
              <div className="flex items-center">
                <div className="flex h-[4.50rem] w-[9.9rem] items-center justify-center gap-2 border-y border-[#272727] px-2 sm:w-[13.13rem] sm:justify-normal sm:px-6">
                  <div className="relative">
                    <RemoteImage
                      src={activeHistoryData?.route.userTxs[0].fromAsset.logoURI || ''}
                      width={24}
                      height={24}
                    />
                    <div className="absolute bottom-[-3px] right-[-3px] rounded-full border border-black">
                      <RemoteImage
                        src={activeHistoryData?.chain?.icon || ''}
                        width={12}
                        height={12}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="font-geist-medium">
                    <h3 className="text-xs text-[#7D7D7D]">You sent</h3>
                    <h4 className="hidden text-sm text-[#D7D7D7] sm:block">
                      {stringToFixed(
                        removeDecimal(
                          activeHistoryData?.route.userTxs[0].fromAsset.decimals || 0,
                          activeHistoryData?.route.userTxs[0].fromAmount
                        ),
                        8
                      )}{' '}
                      {activeHistoryData?.route.userTxs[0].fromAsset.symbol}
                    </h4>
                    <h4 className="block text-sm text-[#D7D7D7] sm:hidden">
                      {stringToFixed(
                        removeDecimal(
                          activeHistoryData?.route.userTxs[0].fromAsset.decimals || 0,
                          activeHistoryData?.route.userTxs[0].fromAmount
                        ),
                        3
                      )}{' '}
                      {concatenateString(activeHistoryData?.route.userTxs[0].fromAsset.symbol, 4)}
                    </h4>
                  </div>
                </div>
                <div className="flex h-[4.50rem] items-center justify-center border border-[#272727] px-2">
                  <div className="relative flex items-center justify-center">
                    <Image src={MainAssets.Send} alt="SEND icon" />
                    <div className="absolute bottom-[-3px] right-[-3px]">
                      <RemoteImage
                        src={activeHistoryData?.route.userTxs[0].protocol.icon || ''}
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex h-[4.50rem] w-[9.9rem] items-center justify-center gap-2 border-y border-[#272727] px-2 sm:w-[13.13rem] sm:justify-normal sm:px-6">
                  <div className="relative">
                    <RemoteImage
                      src={activeHistoryData?.route.userTxs[0].toAsset.logoURI || ''}
                      width={24}
                      height={24}
                    />
                    <div className="absolute bottom-[-3px] right-[-3px] rounded-full border border-black">
                      <RemoteImage
                        src={activeHistoryData?.chain?.icon || ''}
                        width={12}
                        height={12}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="font-geist-medium">
                    <h3 className="text-xs text-[#7D7D7D]">You received</h3>
                    <h4 className="hidden text-sm text-[#D7D7D7] sm:block">
                      {stringToFixed(
                        removeDecimal(
                          activeHistoryData?.route.userTxs[0].toAsset.decimals || 0,
                          activeHistoryData?.route.userTxs[0].toAmount
                        ),
                        8
                      )}{' '}
                      {activeHistoryData?.route.userTxs[0].toAsset.symbol}
                    </h4>
                    <h4 className="block text-sm text-[#D7D7D7] sm:hidden">
                      {stringToFixed(
                        removeDecimal(
                          activeHistoryData?.route.userTxs[0].toAsset.decimals || 0,
                          activeHistoryData?.route.userTxs[0].toAmount
                        ),
                        3
                      )}{' '}
                      {concatenateString(activeHistoryData?.route.userTxs[0].toAsset.symbol, 4)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button
              className="h-12 w-[15.00rem] rounded-[0.63rem] bg-[#575EFF] text-[0.94rem] font-semibold sm:h-14"
              onClick={() => {
                setActiveHistory(null);
              }}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryComponent;
