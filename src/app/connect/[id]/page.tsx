"use client";
import ReviewButton from "@/components/connect/ReviewButton";
import RouteBlock from "@/components/connect/RouteBlock";
import { SettingsPopover } from "@/components/connect/SettingsPopover";
import TransferBlock from "@/components/connect/TransferBlock";
import Button from "@/components/shared/Button";
import ConnectFooter from "@/components/shared/Footer/ConnectFooter";
import Header from "@/components/shared/Header";
import RenderIf from "@/components/shared/RenderIf";
import { useExchangeContext } from "@/context/ExchangeContext";
import MainAssets from "@/lib/assets/main";
import {
  useSocketChainRead,
  useSocketQuoteRead,
  useTokenBalanceRead,
} from "@/services/queries/coins";
import { debounce, removeDecimal } from "@/utils/helpers";
import { priorityOptions } from "@/utils/static";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useAccount } from "wagmi";

const ConnectPage = () => {
  const { data: chainsData, isPending: chainsIsPending } = useSocketChainRead();
  const { openConnectModal } = useConnectModal();
  const account = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState(priorityOptions[0].value);

  const params = useParams();
  const paramsIdFallback = (params.id as string) || "137";
  const { chainFrom, chainTo, recipientAddress } = useExchangeContext();
  const { address } = useAccount();

  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const {
    data: quoteData,
    isPending,
    isFetching,
  } = useSocketQuoteRead(
    paramsIdFallback,
    isOpen,
    chainFrom?.address,
    chainTo?.address,
    debouncedValue,
    chainFrom?.decimals,
    address,
    recipientAddress || undefined,
    priority
  );

  const { data: tokenBalance } = useTokenBalanceRead(
    paramsIdFallback,
    address,
    chainFrom?.address
  );

  const handleDebouncedInputChange = useCallback(
    debounce((value: string) => setDebouncedValue(value), 1000),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    handleDebouncedInputChange(value);
  };

  const [transferBlockState, _] = useState<
    Array<{ type: "from" | "to"; id: number }>
  >([
    { type: "from", id: 1 },
    { type: "to", id: 2 },
  ]);

  // const routeFetchActive =
  //   !!chainFrom?.address &&
  //   !!chainTo?.address &&
  //   !!debouncedValue &&
  //   !!address &&
  //   !!chainFrom.decimals &&
  //   !isOpen;

  const calculatedValue = quoteData
    ? removeDecimal(quoteData.toAsset.decimals, quoteData.routes[0]?.toAmount)
    : "0";
  const isSufficientCalculationReady =
    !!tokenBalance &&
    !!quoteData?.routes &&
    !!(quoteData.routes.length > 0) &&
    !!value;

  if (chainsIsPending || !chainsData) {
    return <div>Loading</div>;
  }

  const currChain = chainsData.filter(
    (ch) => ch.chainId === parseInt(paramsIdFallback)
  )[0];

  return (
    <div className="max-w-[827px] mx-auto px-2 sm:px-8">
      <Header type={2} />
      <SettingsPopover
        isPopOpen={isOpen}
        setIsPopOpen={setIsOpen}
        priority={priority}
        setPriority={setPriority}
      />
      <main className=" h-[calc(100vh-100px)] mt-[100px] connect_border">
        <div className="text-white max-w-[827px] mx-auto mt-0 sm:mt-14 py-[35px] relative border-none sm:border border-grey-200 rounded-[10px]">
          <div className="w-full h-full max-w-[420px] mx-auto px-0 ">
            <div className="flex items-center justify-between">
              <h3 className="font-geist-semibold text-xl">Swap</h3>
              <div className="flex gap-2 ">
                <Button className="border border-grey-200 rounded-full w-8 h-8 p-0">
                  <div className="w-[12.4px] h-[12.4px]">
                    <Image src={MainAssets.Refresh} alt="Refresh button icon" />
                  </div>
                </Button>
                <Button
                  className="border border-grey-200 rounded-full w-8 h-8 p-0"
                  onClick={() => setIsOpen(true)}
                >
                  <div className="w-[15.9px] h-[17.2px]">
                    <Image
                      src={MainAssets.Settings}
                      alt="Refresh button icon"
                    />
                  </div>
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary-300 p-4 rounded-[10px] mt-[22px]">
              <div className="w-8 h-8 ">
                <Image
                  src={currChain.icon}
                  alt="Chain Base Icon"
                  className="rounded-[4px]"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h3 className="font-geist-regular text-xs text-grey-300 leading-[14px]">
                  Chain
                </h3>
                <h4 className="font-geist-medium text-[15px] leading-[18px]">
                  {currChain.name}
                </h4>
              </div>
            </div>
            <div className="mt-1 flex flex-col gap-2">
              {transferBlockState.map((block, i) => (
                <TransferBlock
                  key={i}
                  type={block.type}
                  blockId={block.id}
                  value={value}
                  handleInputChange={handleInputChange}
                  calculatedValue={calculatedValue}
                  balance={tokenBalance}
                  currChain={currChain}
                />
              ))}
            </div>

            {/* Route info */}
            <RenderIf condition={!!quoteData || isFetching}>
              <RouteBlock isPending={isPending} quoteData={quoteData} />
            </RenderIf>

            <div className="mt-4 ">
              {account.status === "connected" ? (
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
                    <Button className="w-full h-12 bg-primary-800 hover:bg-primary-800">
                      <p className="text-[#080808] font-geist-medium">
                        Review Route
                      </p>
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  className="w-full h-10 bg-primary-500"
                  onClick={openConnectModal}
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
      <ConnectFooter />
    </div>
  );
};

export default ConnectPage;
