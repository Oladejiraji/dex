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
import { useBuildPost } from "@/services/queries/coins";
import { useChainId, useSwitchChain } from "wagmi";
import { ethers } from "ethers";
import { chainBaseData } from "@/utils/static";
import { SuccessPopover } from "@/components/connect/SuccessPopover";
import { getBridgeStatus } from "@/services/queries/coins/alternate";

const Review = () => {
  const { activeRoute, activeTransaction } = useExchangeContext();
  const router = useRouter();
  if (!activeRoute) redirect(AppRoutes.connect.path);
  // console.log(activeRoute);
  const { userTxs, fromAmount, toAmount } = activeRoute;
  const { fromAsset, toAsset, gasFees, swapSlippage } = userTxs[0];

  const { mutate, isPending } = useBuildPost();
  const chainId = useChainId();

  useEffect(() => {
    if (!activeRoute) return;
    mutate({ route: activeRoute });
  }, [activeRoute]);

  const isRightChain = activeTransaction?.chainId === chainId;

  const { switchChain, chains } = useSwitchChain();
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
        switchChain({ chainId: chains[2].id });
      }
    } catch (error: any) {
      if (error?.message?.includes("user rejected action")) {
        console.log("User rejected transaction");
        errorToast("User rejected the transaction!");
      }
    }
  };

  return (
    activeRoute && (
      <>
        <SuccessPopover
          isPopOpen={isPopOpen}
          setIsPopOpen={setIsPopOpen}
          activeRoute={activeRoute}
          hashState={hashState}
        />
        <div className="max-w-[1200px] mx-auto">
          <Header />
          <main className="py-[100px]">
            <div className="text-white max-w-[827px] mx-auto mt-14 radial_border py-[35px] relative border border-grey-200">
              <div className="w-full h-full max-w-[470px] mx-auto ">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-base font-geist-medium">
                    Review Transaction
                  </h1>
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-[#83838340]"
                    onClick={() => router.push(AppRoutes.connect.path)}
                  >
                    <div className="w-[11px] h-[11px]">
                      <Image src={MainAssets.X} alt="X icon" />
                    </div>
                  </button>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <ReviewChain asset={fromAsset} amount={fromAmount} />
                  <div className="w-[10px] h-[10px] rotate-[270deg]">
                    <Image src={MainAssets.Up} alt="Up icon" />
                  </div>
                  <ReviewChain asset={toAsset} amount={toAmount} />
                </div>
                <div className="mt-[22px] rounded-[10px] border border-grey-200">
                  <>
                    <div className="flex items-center justify-between px-4 py-3 border-b border-grey-200">
                      <p className="text-grey-400 font-geist-regular">Dex: </p>
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-6 h-6">
                          <Image src={MainAssets.Ox} alt="Ox icon" />
                        </div>
                        <p className="font-geist-regular text-sm text-grey-300">
                          OX
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 border-b border-grey-200">
                      <p className="font-geist-regular text-sm text-grey-300">
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
                    <div className="flex items-center justify-between px-4 py-3 border-b border-grey-200">
                      <p className="font-geist-regular text-sm text-grey-300">
                        Gas Fees
                      </p>
                      <p className="text-grey-300 font-geist-regular">
                        ${stringToFixed(gasFees.feesInUsd.toString())}
                      </p>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <p className="font-geist-regular text-sm text-grey-300">
                        Swap Slippage
                      </p>
                      <p className="text-grey-300 font-geist-regular">
                        {swapSlippage}
                      </p>
                    </div>
                  </>
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full h-14 bg-primary-800 hover:bg-primary-800"
                    loading={isPending}
                    onClick={swapFn}
                  >
                    <p className="text-[#080808] font-geist-medium">
                      {isRightChain ? "Swap" : "Switch Network To Polygon"}
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
