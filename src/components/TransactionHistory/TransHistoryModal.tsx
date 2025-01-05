'use client';

import MainAssets from '@/lib/assets/main';
import { AppRoutes } from '@/utils/routes';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../shared/Button';
import X from '@/lib/svg/X';
import useLocalStorage from '@/hooks/useLocalStorage';
import { transactionHistoryKey } from '@/utils/constants';
import { TransactionHistory } from '@/services/queries/coins/types';
import RemoteImage from '../shared/RemoteImage';
import { removeDecimal, stringToFixed } from '@/utils/helpers';
import HistoryItem from './HistoryItem';
import { MODAL_ANIMATION_VARIANTS } from '@/animation/variants';

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
}

const transactions = [1, 2, 3];

export function TransHistoryModal({ isPopOpen, setIsPopOpen }: IProps) {
  const [value] = useLocalStorage(transactionHistoryKey, []);
  const transactinHistory = value as TransactionHistory[];
  const [activeHistory, setActiveHistory] = useState<`0x${string}` | null>(null);
  const activeHistoryData = transactinHistory.find((history) => history.hash === activeHistory);
  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="fixed left-0 top-[3rem] z-[1050] flex h-screen w-full items-start bg-transparent pb-[2.69rem] pt-[4.13rem] text-white backdrop-blur-[0.25rem]"
          variants={MODAL_ANIMATION_VARIANTS}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {activeHistory ? (
            <div className="relative mx-auto h-full w-[36.69rem] p-[0.06rem]">
              <div className="gradient_bg absolute inset-0 h-full w-full rounded-[1.25rem]" />
              <div className="select_gradient relative flex h-full flex-col rounded-[1.25rem]">
                <div className="flex items-center justify-between gap-2 rounded-t-[1.25rem] bg-[#0D0E0F] px-6 py-3">
                  <div className="">
                    <h3 className="pb-2 font-geist-semibold text-sm text-[#7D7D7D]">Activity</h3>
                    <h4 className="font-geist-semibold text-base text-[#F9F9F9]">Transaction Details</h4>
                  </div>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#32323240]"
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
                <div className="flex h-full flex-col items-center justify-center gap-12">
                  <div className="h-[5.00rem] w-[5.00rem]">
                    <Image src={MainAssets.Success} alt="Success icon" />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="font-geist-medium text-[1.50rem] text-[#F9F9F9]">Success</h3>
                    <p className="font-geist-semibold text-[0.94rem] text-[#7D7D7D]">
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
                  <div className="rounded-[0.25rem] border border-dashed border-[#272727] p-[0.38rem]">
                    <div className="rounded-[0.25rem] border border-[#272727] py-[0.38rem]">
                      <div className="flex items-center">
                        <div className="flex h-[4.50rem] w-[13.13rem] items-center gap-2 border-y border-[#272727] px-6">
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
                            <h4 className="text-sm text-[#D7D7D7]">
                              {stringToFixed(
                                removeDecimal(
                                  activeHistoryData?.route.userTxs[0].fromAsset.decimals || 0,
                                  activeHistoryData?.route.userTxs[0].fromAmount
                                ),
                                8
                              )}{' '}
                              {activeHistoryData?.route.userTxs[0].fromAsset.symbol}
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
                        <div className="flex h-[4.50rem] w-[13.13rem] items-center gap-2 border-y border-[#272727] px-6">
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
                            <h4 className="text-sm text-[#D7D7D7]">
                              {stringToFixed(
                                removeDecimal(
                                  activeHistoryData?.route.userTxs[0].toAsset.decimals || 0,
                                  activeHistoryData?.route.userTxs[0].toAmount
                                ),
                                8
                              )}{' '}
                              {activeHistoryData?.route.userTxs[0].toAsset.symbol}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="h-14 w-[15.00rem] rounded-[0.63rem] bg-[#575EFF] text-[0.94rem] font-semibold"
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
          ) : (
            <div className="relative mx-auto h-fit w-full max-w-[32.4375rem] rounded-[2rem] bg-[#121212] p-[0.06rem]">
              <div className="">
                <div className="flex items-center justify-between px-[1.6875rem] py-[2.25rem]">
                  <div>
                    <h1 className="font-geist-medium text-xs leading-4 text-[#898989]">
                      {transactinHistory?.length === 0 ? 'ACTIVITY' : `${transactinHistory?.length} completed`}
                    </h1>
                    <h3 className="pt-1 font-geist-bold text-xl leading-[1.375rem] text-[#999999]">
                      Transaction history
                    </h3>
                  </div>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#232323]"
                    onClick={() => setIsPopOpen(false)}
                  >
                    <div className="">
                      <X className="fill-white" />
                    </div>
                  </button>
                </div>
                {transactinHistory.length === 0 ? (
                  <>
                    <div className="flex items-center justify-center">
                      <div className="h-[16.25rem] w-[21.3125rem]">
                        <Image src={MainAssets.HistoryIllustration} alt="Modal Illustration" />
                      </div>
                    </div>
                    <div className="mx-auto mt-5 flex max-w-[11.625rem] flex-col items-center gap-4 pb-8">
                      <p className="font-geist-regular text-base leading-5 text-[#898989]">
                        Bridge and swap tokens instantly with{' '}
                        <Link href={AppRoutes.networks.path} className="text-white">
                          Superbase
                        </Link>
                      </p>
                      <div className="h-10 w-[8rem]">
                        <Image src={MainAssets.TokensListOverlay} alt="Tokens List Overlay" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mx-7 mb-11 flex max-h-[27rem] flex-col gap-[1.625rem] overflow-y-auto rounded-[1.125rem] bg-[rgba(70,70,70,0.25)] p-[1.625rem]">
                    {transactinHistory.map((transaction, index) => {
                      return <HistoryItem key={index} transaction={transaction} setActiveHistory={setActiveHistory} />;
                    })}
                  </div>
                )}
              </div>
              {transactions.length === 0 ? (
                <div className="rounded-b-[2rem] bg-[rgba(70,70,70,0.25)] px-7 py-7">
                  <p className="mx-auto max-w-[15.9375rem] text-center text-base leading-[1.125rem] tracking-tight text-[#898989]">
                    By clicking “Continue” you agree to Superbase’s{' '}
                    <Link href={AppRoutes.terms.path} className="text-white">
                      Terms and Conditions
                    </Link>
                  </p>
                  <div>
                    <Button
                      className="mt-[1.875rem] h-14 w-full bg-white"
                      onClick={() => {
                        setIsPopOpen(false);
                      }}
                    >
                      <span className="font-geist-medium text-[1.1875rem] tracking-tight text-[#222222]">Continue</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-b-[2rem] bg-[rgba(70,70,70,0.25)] px-7 pb-[2.375rem] pt-6">
                  <p className="mx-auto max-w-[18.25rem] text-center font-geist-regular text-base leading-[1.125rem] tracking-[-1%] text-[#898989]">
                    Transaction history is only stored locally and will be deleted if you clear browser data
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
