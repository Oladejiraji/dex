"use client";
import ReviewButton from "@/components/connect/ReviewButton";
import RouteBlock from "@/components/connect/RouteBlock";
import TransferBlock from "@/components/connect/TransferBlock";
import Button from "@/components/shared/Button";
import Header from "@/components/shared/Header";
import RenderIf from "@/components/shared/RenderIf";
import { useExchangeContext } from "@/context/ExchangeContext";
import MainAssets from "@/lib/assets/main";
import {
  useSocketQuoteRead,
  useTokenBalanceRead,
} from "@/services/queries/coins";
import { debounce, removeDecimal } from "@/utils/helpers";
import { chainBaseData } from "@/utils/static";
import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalEvents,
} from "@web3modal/wagmi/react";
import Image from "next/image";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useAccount } from "wagmi";

const Home = () => {
  const { open } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();
  const { chainFrom, chainTo, recipientAddress } = useExchangeContext();
  const { address } = useAccount();

  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const { data: quoteData, isPending } = useSocketQuoteRead(
    chainFrom?.address,
    chainTo?.address,
    debouncedValue,
    chainFrom?.decimals,
    address,
    recipientAddress || undefined
  );

  const { data: tokenBalance } = useTokenBalanceRead(
    address,
    chainFrom?.address
  );

  const handleDebouncedInputChange = useCallback(
    debounce((value: string) => setDebouncedValue(value), 1000),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setValue(value);
    handleDebouncedInputChange(value);
  };

  const [transferBlockState, setTransferBlockState] = useState<
    Array<{ type: "from" | "to"; id: number }>
  >([
    { type: "from", id: 1 },
    { type: "to", id: 2 },
  ]);

  const routeFetchActive =
    !!chainFrom?.address &&
    !!chainTo?.address &&
    !!debouncedValue &&
    !!address &&
    !!chainFrom.decimals;

  const calculatedValue =
    quoteData && routeFetchActive
      ? removeDecimal(quoteData.toAsset.decimals, quoteData.routes[0]?.toAmount)
      : "0";

  const isSufficientCalculationReady =
    !!tokenBalance &&
    !!quoteData?.routes &&
    !!(quoteData.routes.length > 0) &&
    !!value;

  return (
    <div className="max-w-[1200px] mx-auto px-2 sm:px-8">
      <Header type={2} />
      <main className="py-[100px]">
        <div className="text-white max-w-[827px] mx-auto mt-0 sm:mt-14  py-[35px] relative border-none sm:border border-grey-200 rounded-[10px]">
          <div className="w-full h-full max-w-[470px] mx-auto px-2 ">
            <div className="flex items-center justify-between">
              <h3 className="font-geist-bold text-2xl">Swap</h3>
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
                <Image
                  src={chainBaseData.icon}
                  alt="Chain Base Icon"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="font-geist-thin text-xs text-grey-300 leading-[14px]">
                  Chain
                </h3>
                <h4 className="font-geist-medium text-[15px] leading-[18px]">
                  {chainBaseData.name}
                </h4>
              </div>
            </div>

            {transferBlockState.map((block, i) => (
              <TransferBlock
                key={i}
                type={block.type}
                blockId={block.id}
                value={value}
                handleInputChange={handleInputChange}
                calculatedValue={calculatedValue}
                balance={tokenBalance}
              />
            ))}

            {/* Route info */}
            <RenderIf condition={routeFetchActive}>
              <RouteBlock isPending={isPending} quoteData={quoteData} />
            </RenderIf>

            <div className="mt-10 mx-[35px]">
              {walletInfo ? (
                <div>
                  {isSufficientCalculationReady ? (
                    <ReviewButton
                      balance={removeDecimal(
                        tokenBalance.decimals,
                        tokenBalance.balance
                      )}
                      activeRoute={quoteData.routes[0]}
                      value={value}
                    />
                  ) : (
                    <Button className="w-full h-14 bg-primary-800 hover:bg-primary-800">
                      <p className="text-[#080808] font-geist-medium">
                        Review Route
                      </p>
                    </Button>
                  )}
                </div>
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
    </div>
  );
};

export default Home;
