"use client";
import { ChainPopover } from "@/components/connect/ChainPopover";
import TransferBlock from "@/components/connect/TransferBlock";
import BorderGradientContainer from "@/components/shared/BorderGradientContainer";
import Button from "@/components/shared/Button";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Select from "@/components/shared/Select";
import useLocalStorage from "@/hooks/useLocalStorage";
import MainAssets from "@/lib/assets/main";
import { Eth, Usdt } from "@/lib/svg";
import { saveLocalStorage } from "@/utils/helpers";
import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalEvents,
} from "@web3modal/wagmi/react";
import Image from "next/image";
import React, { useEffect } from "react";

const Connect = () => {
  const { open } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();

  return (
    <div className="max-w-[1200px] mx-auto">
      <Header />
      <main className="py-[100px]">
        <div className="text-white max-w-[827px] mx-auto mt-14 radial_border py-[35px]">
          <div className="w-full h-full max-w-[470px] mx-auto relative">
            <div className="flex items-center justify-between">
              <h3 className="font-geist-bold text-2xl">Trade</h3>
              <div className="flex gap-2">
                <Button className="border border-grey-200 rounded-full w-6 h-6 p-0">
                  <div className="w-3 h-3">
                    <Image src={MainAssets.Refresh} alt="Refresh button icon" />
                  </div>
                </Button>
                <Button className="border border-grey-200 rounded-full w-6 h-6 p-0">
                  <div className="w-3 h-3">
                    <Image
                      src={MainAssets.Settings}
                      alt="Refresh button icon"
                    />
                  </div>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary-300 p-4 rounded-[10px] mt-[22px]">
              <div className="w-8 h-8">
                <Image src={MainAssets.Chain} alt="Chain Base Icon" />
              </div>
              <div>
                <h3 className="font-geist-thin text-xs text-grey-300 leading-[14px]">
                  Chain
                </h3>
                <h4 className="font-geist-medium text-[15px] leading-[18px]">
                  Base
                </h4>
              </div>
            </div>

            {/* From tran */}
            <TransferBlock type="from" />

            {/* To tran */}
            <TransferBlock type="to" />

            <div className="mt-[22px] rounded-[10px] border border-grey-200">
              <div className="flex items-center justify-between bg-primary-300 px-4 py-3 rounded-t-[10px]">
                <h3 className="font-geist-regular text-grey-300 text-sm">
                  Recipient address
                </h3>
                <div className="flex items-center gap-2">
                  <h3 className="font-geist-medium text-grey-400 text-sm">
                    Connect wallet
                  </h3>
                  <div className="w-[14px] h-[14px]">
                    <Image src={MainAssets.Plus} alt="Plus button" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-grey-200">
                <p className="font-geist-regular text-sm text-grey-300">
                  Route
                </p>
                <p className="text-grey-400 font-geist-regular">-</p>
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-grey-200">
                <p className="font-geist-regular text-sm text-grey-300">
                  Est. Output
                </p>
                <p className="text-grey-400 font-geist-regular text-sm">
                  ETH 0.00
                </p>
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-grey-200">
                <p className="font-geist-regular text-sm text-grey-300">
                  Gas Fees
                </p>
                <p className="text-grey-300 font-geist-regular">
                  $0.00314{"<"}0.001ETH
                </p>
              </div>
              <div className="flex items-center gap-6 px-4 py-3">
                <p className="font-geist-medium text-xs text-grey-500">
                  Gas Fees are lowest at this point
                </p>
                <p className="font-geist-medium text-xs text-grey-500 underline">
                  Superbase Ai
                </p>
              </div>
            </div>
            <div className="mt-10 mx-[35px]">
              {walletInfo ? (
                <Button className="w-full h-14 bg-primary-800">
                  <p className="text-[#080808] font-geist-medium">
                    Review Route
                  </p>
                </Button>
              ) : (
                <Button
                  className="w-full h-14 bg-primary-500"
                  onClick={() => open({ view: "AllWallets" as any })}
                >
                  <p className="text-grey-400 font-geist-medium">
                    Connect Wallet
                  </p>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Connect;
