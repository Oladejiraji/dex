'use client';
import NetworkSelect from '@/components/connect/NetworkSelect';
import ReviewButton from '@/components/connect/ReviewButton';
import RouteBlock from '@/components/connect/RouteBlock';
import { SettingsModal } from '@/components/connect/SettingsModal';
import TransferBlock from '@/components/connect/TransferBlock';
import Button from '@/components/shared/Button';
import ConnectFooter from '@/components/shared/Footer/ConnectFooter';
import Header from '@/components/shared/Header';
import RenderIf from '@/components/shared/RenderIf';
import { useExchangeContext } from '@/context/ExchangeContext';
import MainAssets from '@/lib/assets/main';
import { useSocketChainRead, useSocketQuoteRead, useTokenBalanceRead } from '@/services/queries/coins';
import { debounce, removeDecimal } from '@/utils/helpers';
import { priorityOptions } from '@/utils/static';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useAccount } from 'wagmi';

const ConnectPage = () => {
  const { data: chainsData, isPending: chainsIsPending } = useSocketChainRead();
  const { openConnectModal } = useConnectModal();
  const account = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [priority, setPriority] = useState(priorityOptions[0].value);
  const [slippage, setSlippage] = useState({ value: 0.5, custom: false });

  const params = useParams();
  const paramsIdFallback = (params.id as string) || '137';
  const { chainFrom, chainTo, recipientAddress } = useExchangeContext();
  const { address } = useAccount();

  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const {
    data: quoteData,
    isPending,
    isFetching,
    refetch,
  } = useSocketQuoteRead(
    paramsIdFallback,
    isOpen,
    chainFrom?.address,
    chainTo?.address,
    debouncedValue,
    chainFrom?.decimals,
    address,
    recipientAddress || undefined,
    priority,
    slippage.value
  );

  const { data: tokenBalance } = useTokenBalanceRead(paramsIdFallback, address, chainFrom?.address);

  const handleDebouncedInputChange = useCallback(
    debounce((value: string) => setDebouncedValue(value), 1000),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    const value = e.target.value;
    setValue(value);
    handleDebouncedInputChange(value);
  };

  const [transferBlockState, _] = useState<Array<{ type: 'from' | 'to'; id: number }>>([
    { type: 'from', id: 1 },
    { type: 'to', id: 2 },
  ]);

  // const routeFetchActive =
  //   !!chainFrom?.address &&
  //   !!chainTo?.address &&
  //   !!debouncedValue &&
  //   !!address &&
  //   !!chainFrom.decimals &&
  //   !isOpen;

  const calculatedValue = quoteData ? removeDecimal(quoteData.toAsset.decimals, quoteData.routes[0]?.toAmount) : '0';
  const isSufficientCalculationReady =
    !!tokenBalance && !!quoteData?.routes && !!(quoteData.routes.length > 0) && !!value;

  if (chainsIsPending || !chainsData) {
    return <div>Loading</div>;
  }

  const currChain = chainsData.filter((ch) => ch.chainId === parseInt(paramsIdFallback))[0];

  return (
    <>
      <div className="mx-auto max-w-[51.69rem] px-2 pt-[6.25rem] sm:px-8">
        <Header type={2} />
        <SettingsModal
          isPopOpen={isOpen}
          setIsPopOpen={setIsOpen}
          priority={priority}
          setPriority={setPriority}
          slippage={slippage}
          setSlippage={setSlippage}
        />
        <main className="connect_border">
          {/* <main className=" h-[calc(100vh-6.25rem)] mt-[6.25rem] connect_border"> */}
          <div className="relative mx-auto min-h-[calc(100vh-6.25rem)] max-w-[51.69rem] rounded-[0.63rem] border-none border-grey-200 py-[2.19rem] text-white sm:border">
            <div className="mx-auto h-full w-full max-w-[26.25rem] px-0">
              <div className="flex items-center justify-between">
                <h3 className="font-geist-semibold text-xl">Swap</h3>
                <div className="flex gap-2">
                  <Button className="h-8 w-8 rounded-full border border-grey-200 p-0" onClick={() => refetch()}>
                    <div className="h-[12.4px] w-[12.4px]">
                      <Image src={MainAssets.Refresh} alt="Refresh button icon" />
                    </div>
                  </Button>
                  <Button className="h-8 w-8 rounded-full border border-grey-200 p-0" onClick={() => setIsOpen(true)}>
                    <div className="h-[17.2px] w-[15.9px]">
                      <Image src={MainAssets.Settings} alt="Refresh button icon" />
                    </div>
                  </Button>
                </div>
              </div>
              <NetworkSelect currChain={currChain} />
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

              <div className="mt-4">
                {account.status === 'connected' ? (
                  <div>
                    {isSufficientCalculationReady ? (
                      <ReviewButton
                        balance={removeDecimal(tokenBalance.decimals, tokenBalance.balance)}
                        activeRoute={quoteData.routes[0]}
                        value={value}
                      />
                    ) : (
                      <Button className="h-12 w-full bg-primary-800 hover:bg-primary-800">
                        <p className="font-geist-medium text-[#080808]">Review Route</p>
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button className="h-10 w-full bg-primary-500" onClick={openConnectModal}>
                    <p className="font-geist-medium text-grey-400">Connect Wallet</p>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-full touch-none">
        <Image src={MainAssets.Union} alt="Mask overlay" />
      </div>
      <div className="relative mt-[3rem] w-full">
        <ConnectFooter fixed={false} />
      </div>
    </>
  );
};

export default ConnectPage;
