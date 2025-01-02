'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/shared/Header';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import ReviewChain from '@/components/connect/ReviewChain';
import Button from '@/components/shared/Button';
import { useExchangeContext } from '@/context/ExchangeContext';
import { redirect, useRouter } from 'next/navigation';
import { AppRoutes } from '@/utils/routes';
import {
  errorToast,
  getLocalStorage,
  loadingToast,
  removeDecimal,
  saveLocalStorage,
  stringToFixed,
} from '@/utils/helpers';
import { useBuildPost, useSocketChainRead } from '@/services/queries/coins';
import { useChainId, useSwitchChain } from 'wagmi';
import { ethers } from 'ethers';
import { chainBaseData } from '@/utils/static';
import { SuccessModal } from '@/components/connect/SuccessModal';
import { getBridgeStatus } from '@/services/queries/coins/alternate';
import RemoteImage from '@/components/shared/RemoteImage';
import SuperbaseFeesTooltip from '@/components/review/SuperbaseFeesTooltip';
import { useGeneralContext } from '@/context/GeneralContext';
import { toast } from 'react-toastify';
import { transactionHistoryKey } from '@/utils/constants';
import { TransactionHistory } from '@/services/queries/coins/types';

const Review = () => {
  const { data: chainsData } = useSocketChainRead();
  const { activeRoute, activeTransaction } = useExchangeContext();
  const { transactionToastId, updateTransactionToastId } = useGeneralContext();
  const router = useRouter();
  if (!activeRoute) redirect(AppRoutes.networks.path);
  const { userTxs, fromAmount, toAmount } = activeRoute;
  const { fromAsset, toAsset, gasFees } = userTxs[0];

  const { mutate, isPending } = useBuildPost();
  const chainId = useChainId();

  useEffect(() => {
    if (!activeRoute) return;
    mutate({ route: activeRoute });
  }, [activeRoute]);

  const isRightChain = activeTransaction?.chainId === chainId;
  const activeChain = chainsData?.filter((chain) => chain.chainId === activeTransaction?.chainId)[0];
  const { switchChain } = useSwitchChain();
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [hashState, setHashTaste] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const swapFn = async () => {
    try {
      const anyWindow = window as any;
      if (!activeTransaction) return;
      if (isRightChain) {
        const provider = new ethers.BrowserProvider(anyWindow.ethereum, 'any');

        // Prompt user for account connections
        await provider.send('eth_requestAccounts', []);

        // Stores signer
        setIsLoading(true);
        const signer = await provider.getSigner();

        const gasPrice = (await provider.getFeeData()).gasPrice;

        const gasEstimate = await provider.estimateGas({
          from: signer.address,
          to: activeTransaction.txTarget,
          value: activeTransaction.value,
          data: activeTransaction.txData,
          gasPrice: gasPrice,
        });

        const tx = await signer.sendTransaction({
          from: signer.address,
          to: activeTransaction.txTarget,
          data: activeTransaction.txData,
          value: activeTransaction.value,
          gasPrice: gasPrice,
          gasLimit: gasEstimate,
        });

        // Initiates swap/bridge transaction on user's frontend which user has to sign
        const receipt = await tx.wait();

        if (!receipt) return;
        console.log('receipt:', receipt);

        const txHash = receipt.hash;
        setHashTaste(txHash);
        updateTransactionToastId(loadingToast('Your transaction is being processed onchain!'));
        const transactionStore = {
          route: activeRoute,
          chain: activeChain,
          hash: txHash,
          timestamp: new Date(),
        } as TransactionHistory;
        const prevTransactionHistory = getLocalStorage(transactionHistoryKey);
        if (prevTransactionHistory) {
          saveLocalStorage(transactionHistoryKey, [transactionStore, ...prevTransactionHistory]);
        } else {
          saveLocalStorage(transactionHistoryKey, [transactionStore]);
        }
        setIsLoading(false);
        setIsPopOpen(true);

        console.log('Bridging Transaction : ', receipt.hash);

        // Checks status of transaction every 20 secs
        const txStatus = setInterval(async () => {
          const status = await getBridgeStatus(txHash, chainBaseData.chainId, chainBaseData.chainId);

          console.log(`SOURCE TX : ${status.result.sourceTxStatus}\nDEST TX : ${status.result.destinationTxStatus}`);

          if (status.result.destinationTxStatus == 'COMPLETED') {
            console.log('DEST TX HASH :', status.result.destinationTransactionHash);
            toast.update(transactionToastId, {
              type: 'success',
              render: 'Transaction completed!',
              autoClose: 5000,
              className: 'rotateY animated',
            });
            updateTransactionToastId(0);
            clearInterval(txStatus);
          }
        }, 20000);
      } else {
        switchChain({ chainId: activeTransaction.chainId });
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error?.message?.includes('user rejected action')) {
        console.log('User rejected transaction');
        errorToast('User rejected the transaction!');
      }
    }
  };
  return (
    <>
      <SuccessModal
        isPopOpen={isPopOpen}
        setIsPopOpen={setIsPopOpen}
        activeRoute={activeRoute}
        hashState={hashState}
        activeChain={activeChain}
      />
      <div className="mx-auto max-w-[51.69rem] px-2 sm:px-8">
        <Header type={2} />
        <main className="connect_border mt-[6.25rem] h-[calc(100vh-100px)]">
          <div className="relative mx-auto mt-0 max-w-[51.69rem] rounded-[0.63rem] border-none border-grey-200 py-[2.19rem] text-white sm:mt-14 sm:border">
            <div className="mx-auto h-full w-full max-w-[29.38rem] px-2">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="font-geist-semibold text-[1.25rem] text-[#F9F9F9]">Review Route</h1>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#83838340]"
                  onClick={() => router.back()}
                >
                  <div className="relative flex h-[0.63rem] w-[0.63rem] items-center justify-center">
                    <Image src={MainAssets.X} alt="X icon" fill />
                  </div>
                </button>
              </div>
              <div className="relative flex items-center justify-center gap-2">
                <ReviewChain asset={fromAsset} amount={fromAmount} type="From" activeRoute={activeRoute} />
                <div className="absolute bottom-[50%] left-[50%] z-[10] flex h-8 w-8 translate-x-[-50%] translate-y-[50%] rotate-[-90deg] items-center justify-center rounded-[0.50rem] border-[0.19rem] border-[#060708] bg-[#0D0E0F]">
                  <div className="h-[0.63rem] w-[0.63rem]">
                    <Image src={MainAssets.Up} alt="Up icon" />
                  </div>
                </div>
                <ReviewChain asset={toAsset} amount={toAmount} type="To" activeRoute={activeRoute} />
              </div>
              <div className="mt-[2.00rem] flex flex-col gap-4 rounded-[0.63rem]">
                <div className="flex items-center justify-between">
                  <p className="font-geist-regular text-[0.88rem] text-[#7D7D7D]">Liquidity Provider: </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-6 w-6">
                      <RemoteImage src={activeRoute.userTxs[0].protocol.icon} width={24} height={24} />
                    </div>
                    <p className="font-geist-medium text-[0.88rem] text-[#D7D7D7]">
                      {activeRoute.userTxs[0].protocol.displayName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-geist-regular text-[0.88rem] text-[#7D7D7D]">Estimated Fees</p>
                  <p className="font-geist-medium text-[0.88rem] text-[#D7D7D7]">
                    ${stringToFixed(gasFees.feesInUsd.toString())}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-geist-regular text-[0.88rem] text-[#7D7D7D]">Est. Output</p>
                  <p className="font-geist-regular text-sm text-grey-400">
                    {stringToFixed(removeDecimal(toAsset.decimals, toAmount), 8)} {toAsset.symbol}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-geist-regular text-[0.88rem] text-[#7D7D7D]">Estimated Superbase fees</p>
                    <SuperbaseFeesTooltip />
                  </div>
                  <p className="font-geist-regular text-sm text-grey-400">$0.00</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-geist-regular text-[0.88rem] text-[#7D7D7D]">Swap Slippage</p>
                  <p className="font-geist-medium text-[0.88rem] text-[#D7D7D7]">
                    {activeRoute.userTxs[0].swapSlippage}%
                  </p>
                </div>
              </div>
              <div className="mt-16">
                <Button
                  className="h-14 w-full rounded-[0.63rem] bg-primary-800 hover:bg-primary-800"
                  loading={isPending || isLoading}
                  onClick={swapFn}
                >
                  <p className="font-geist-medium text-[0.94rem] text-[#080808]">
                    {isRightChain ? 'Place Order' : 'Switch Network To Polygon'}
                  </p>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Review;
