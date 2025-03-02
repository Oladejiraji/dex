import { QuoteResponseResult } from '@/services/queries/coins/types';
import React, { useState } from 'react';
import Loader2 from '../shared/Loader/loader2';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import { minimizeAddress, removeDecimal, stringToFixed } from '@/utils/helpers';
import { RecipientPopover } from './RecipientPopover';
import { useExchangeContext } from '@/context/ExchangeContext';
import RemoteImage from '../shared/RemoteImage';

interface IProps {
  isPending: boolean;
  quoteData?: QuoteResponseResult;
}

const RouteBlock = ({ isPending, quoteData }: IProps) => {
  const [isPopOpen, setIsPopOpen] = useState(false);
  const { recipientAddress } = useExchangeContext();

  return (
    <>
      <RecipientPopover isPopOpen={isPopOpen} setIsPopOpen={setIsPopOpen} />
      <div className="mt-4 rounded-[0.63rem] border border-grey-200">
        {isPending && !quoteData && (
          <div className="flex items-center justify-center gap-2 py-4">
            <p>Finding the best route for you</p>
            <Loader2 />
          </div>
        )}
        {!isPending && quoteData?.routes.length === 0 && (
          <div className="flex items-center justify-center gap-2 py-4">
            <div className="h-9 w-9">
              <Image src={MainAssets.Broken} alt="broken routes image" />
            </div>
            <p>No routes found for your desired transfer</p>
          </div>
        )}
        {!isPending && quoteData && quoteData?.routes.length > 0 && (
          <>
            <div className="flex items-center justify-between rounded-t-[0.63rem] bg-primary-300 px-4 py-3">
              <h3 className="font-geist-regular text-sm text-grey-300">Recipient address</h3>
              <button className="flex items-center gap-2" onClick={() => setIsPopOpen(true)}>
                {recipientAddress ? (
                  <div className="flex items-center gap-2 rounded-full border border-[#32323240] bg-primary-200 px-3 py-1 font-geist-medium text-sm">
                    <h3 className="font-geist-medium text-sm text-grey-400">{minimizeAddress(recipientAddress)}</h3>
                    <p className="text-grey-400 underline">Edit</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-geist-medium text-sm text-grey-400">Add Recipient Address</h3>
                    <div className="h-[0.88rem] w-[0.88rem]">
                      <Image src={MainAssets.YellowPlus} alt="Plus button" />
                    </div>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between border-b border-grey-200 px-4 py-3">
              <div className="flex items-center justify-center gap-2">
                <div className="h-6 w-6">
                  <RemoteImage src={quoteData.routes[0].userTxs[0].protocol.icon} width={24} height={24} />
                </div>
                <p className="font-geist-regular text-grey-300">
                  {quoteData.routes[0].userTxs[0].protocol.displayName}
                </p>
              </div>
              <p className="text-right font-geist-regular text-sm text-grey-400">
                {quoteData.routes[0]?.routeId.split('-')[0]}-{quoteData.routes[0]?.routeId.split('-')[1]}
              </p>
            </div>
            <div className="flex items-center justify-between border-b border-grey-200 px-4 py-3">
              <p className="font-geist-regular text-sm text-grey-300">Est. Output</p>
              <p className="font-geist-regular text-sm text-grey-400">
                {quoteData.toAsset.symbol}{' '}
                {stringToFixed(removeDecimal(quoteData.toAsset.decimals, quoteData.routes[0]?.toAmount))}
              </p>
            </div>
            <div className="flex items-center justify-between border-b border-grey-200 px-4 py-3">
              <p className="font-geist-regular text-sm text-grey-300">Gas Fees</p>
              <p className="font-geist-regular text-grey-300">
                ${stringToFixed(quoteData.routes[0]?.totalGasFeesInUsd.toString())}
              </p>
            </div>
            <div className="flex items-center gap-6 px-4 py-3">
              <p className="font-geist-medium text-xs text-grey-500">Gas Fees are lowest at this point</p>
              <p className="font-geist-medium text-xs text-grey-500 underline">Superbase Ai</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RouteBlock;
