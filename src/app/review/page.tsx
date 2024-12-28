"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/shared/Header";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import ReviewChain from "@/components/connect/ReviewChain";
import Button from "@/components/shared/Button";
import { useExchangeContext } from "@/context/ExchangeContext";
import { redirect, useRouter } from "next/navigation";
import { AppRoutes } from "@/utils/routes";
import { errorToast, removeDecimal, stringToFixed } from "@/utils/helpers";
import { useBuildPost, useSocketChainRead } from "@/services/queries/coins";
import { useChainId, useSwitchChain } from "wagmi";
import { ethers } from "ethers";
import { chainBaseData } from "@/utils/static";
import { SuccessPopover } from "@/components/connect/SuccessPopover";
import { getBridgeStatus } from "@/services/queries/coins/alternate";
import RemoteImage from "@/components/shared/RemoteImage";
import SuperbaseFeesTooltip from "@/components/review/SuperbaseFeesTooltip";

const Review = () => {
  const { data: chainsData } = useSocketChainRead();
  const { activeRoute, activeTransaction } = useExchangeContext();
  const router = useRouter();
  if (!activeRoute) redirect(AppRoutes.home.path);
  // console.log(activeRoute);
  const { userTxs, fromAmount, toAmount } = activeRoute;
  const { fromAsset, toAsset, gasFees } = userTxs[0];

  const { mutate, isPending } = useBuildPost();
  const chainId = useChainId();

  useEffect(() => {
    if (!activeRoute) return;
    mutate({ route: activeRoute });
  }, [activeRoute]);

  const isRightChain = activeTransaction?.chainId === chainId;

  const { switchChain } = useSwitchChain();
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [hashState, setHashTaste] = useState("");

  const swapFn = async () => {
    try {
      const anyWindow = window as any;
      if (!activeTransaction) return;
      if (isRightChain) {
        const provider = new ethers.BrowserProvider(anyWindow.ethereum, "any");

        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);

        // Stores signer
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
        console.log("receipt:", receipt);

        const txHash = receipt.hash;

        console.log("Bridging Transaction : ", receipt.hash);

        // Checks status of transaction every 20 secs
        const txStatus = setInterval(async () => {
          const status = await getBridgeStatus(
            txHash,
            chainBaseData.chainId,
            chainBaseData.chainId
          );

          console.log(
            `SOURCE TX : ${status.result.sourceTxStatus}\nDEST TX : ${status.result.destinationTxStatus}`
          );

          if (status.result.destinationTxStatus == "COMPLETED") {
            console.log(
              "DEST TX HASH :",
              status.result.destinationTransactionHash
            );
            setHashTaste(txHash);
            setIsPopOpen(true);
            clearInterval(txStatus);
          }
        }, 20000);
      } else {
        switchChain({ chainId: activeTransaction.chainId });
      }
    } catch (error: any) {
      if (error?.message?.includes("user rejected action")) {
        console.log("User rejected transaction");
        errorToast("User rejected the transaction!");
      }
    }
  };
  const activeChain = chainsData?.filter(
    (chain) => chain.chainId === activeTransaction?.chainId
  )[0];
  return (
    activeRoute && (
      <>
        <SuccessPopover
          isPopOpen={isPopOpen}
          setIsPopOpen={setIsPopOpen}
          activeRoute={activeRoute}
          hashState={hashState}
          activeChain={activeChain}
        />
        <div className="max-w-[51.69rem] mx-auto px-2 sm:px-8">
          <Header type={2} />
          <main className=" h-[calc(100vh-100px)] mt-[6.25rem] connect_border">
            <div className="text-white max-w-[51.69rem] mx-auto mt-0 sm:mt-14 py-[2.19rem] relative border-none sm:border border-grey-200 rounded-[0.63rem]">
              <div className="w-full h-full max-w-[29.38rem] mx-auto px-2 ">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-[1.25rem] font-geist-semibold text-[#F9F9F9]">
                    Review Route
                  </h1>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-[#83838340]"
                    onClick={() => router.back()}
                  >
                    <div className="w-[0.63rem] h-[0.63rem] flex items-center justify-center relative">
                      <Image src={MainAssets.X} alt="X icon" fill />
                    </div>
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 relative">
                  <ReviewChain
                    asset={fromAsset}
                    amount={fromAmount}
                    type="From"
                    activeRoute={activeRoute}
                  />
                  <div className="absolute bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] rotate-[-90deg] bg-[#0D0E0F] border-[0.19rem] border-[#060708] flex items-center justify-center rounded-[0.50rem] w-8 h-8 z-[10]">
                    <div className="w-[0.63rem] h-[0.63rem]">
                      <Image src={MainAssets.Up} alt="Up icon" />
                    </div>
                  </div>
                  <ReviewChain
                    asset={toAsset}
                    amount={toAmount}
                    type="To"
                    activeRoute={activeRoute}
                  />
                </div>
                <div className="mt-[2.00rem] rounded-[0.63rem] flex flex-col gap-4">
                  <div className="flex items-center justify-between  ">
                    <p className="text-[#7D7D7D] text-[0.88rem] font-geist-regular">
                      Liquidity Provider:{" "}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-6 h-6">
                        <RemoteImage
                          src={activeRoute.userTxs[0].protocol.icon}
                          width={24}
                          height={24}
                        />
                      </div>
                      <p className="font-geist-medium text-[0.88rem] text-[#D7D7D7]">
                        {activeRoute.userTxs[0].protocol.displayName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between  ">
                    <p className="text-[#7D7D7D] text-[0.88rem] font-geist-regular">
                      Estimated Fees
                    </p>
                    <p className="font-geist-medium text-[0.88rem] text-[#D7D7D7]">
                      ${stringToFixed(gasFees.feesInUsd.toString())}
                    </p>
                  </div>

                  <div className="flex items-center justify-between  ">
                    <p className="text-[#7D7D7D] text-[0.88rem] font-geist-regular">
                      Est. Output
                    </p>
                    <p className="text-grey-400 font-geist-regular text-sm">
                      {stringToFixed(
                        removeDecimal(toAsset.decimals, toAmount),
                        8
                      )}{" "}
                      {toAsset.symbol}
                    </p>
                  </div>
                  <div className="flex items-center justify-between  ">
                    <div className="flex items-center gap-2">
                      <p className="text-[#7D7D7D] text-[0.88rem] font-geist-regular">
                        Estimated Superbase fees
                      </p>
                      <SuperbaseFeesTooltip />
                    </div>
                    <p className="text-grey-400 font-geist-regular text-sm">
                      $0.00
                    </p>
                  </div>

                  <div className="flex items-center justify-between ">
                    <p className="text-[#7D7D7D] text-[0.88rem] font-geist-regular">
                      Swap Slippage
                    </p>
                    <p className="font-geist-medium text-[0.88rem] text-[#D7D7D7]">
                      {activeRoute.userTxs[0].swapSlippage}%
                    </p>
                  </div>
                </div>
                <div className="mt-16">
                  <Button
                    className="w-full h-14 bg-primary-800 hover:bg-primary-800 rounded-[0.63rem]"
                    loading={isPending}
                    onClick={swapFn}
                  >
                    <p className="text-[#080808] text-[0.94rem] font-geist-medium">
                      {isRightChain
                        ? "Place Order"
                        : "Switch Network To Polygon"}
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    )
  );
};

export default Review;
