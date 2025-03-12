'use client';

import MainAssets from '@/lib/assets/main';
import { AppRoutes } from '@/utils/routes';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../shared/Button';
import useLocalStorage from '@/hooks/useLocalStorage';
import { transactionHistoryKey } from '@/utils/constants';
import { TransactionHistory } from '@/services/queries/coins/types';

import HistoryItem from './HistoryItem';
import { MODAL_ANIMATION_VARIANTS } from '@/animation/variants';
import HistoryComponent from './HistoryComponent';

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
          className="fixed left-0 top-[1rem] z-[1050] flex h-screen w-full items-start bg-transparent pb-[2.69rem] pt-[4.13rem] text-white backdrop-blur-[0.25rem]"
          variants={MODAL_ANIMATION_VARIANTS}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {activeHistory ? (
            <HistoryComponent
              activeHistoryData={activeHistoryData}
              setActiveHistory={setActiveHistory}
              setIsPopOpen={setIsPopOpen}
            />
          ) : (
            <div className="relative mx-auto h-fit w-full max-w-[32.4375rem] p-[0.06rem]">
              <div className="">
                <div className="flex items-center justify-between border-t border-[#28282860] bg-[rgba(0,0,0,0.8)] px-[1.6875rem] py-[1rem] backdrop-blur-3xl sm:rounded-t-[2rem] sm:border-none sm:bg-[#121212] sm:py-[2.25rem] sm:backdrop-blur-none">
                  <div>
                    <h1 className="font-geist-medium text-xs leading-4 text-[#898989]">
                      {transactinHistory?.length === 0 ? 'ACTIVITY' : `${transactinHistory?.length} completed`}
                    </h1>
                    <h3 className="pt-1 font-geist-bold text-[0.9375rem] leading-[1.125rem] text-[#999999] sm:text-xl sm:leading-[1.375rem]">
                      Transaction history
                    </h3>
                  </div>
                  <button
                    className="flex items-center justify-center rounded-full px-3 py-3 sm:bg-[#232323]"
                    onClick={() => setIsPopOpen(false)}
                  >
                    <div className="relative h-[0.563rem] w-[0.563rem] sm:h-[0.875rem] sm:w-[0.875rem]">
                      <Image src={MainAssets.X} alt="X icon" fill />
                    </div>
                  </button>
                </div>
                {/* Main */}
                {transactinHistory.length === 0 ? (
                  <div className="bg-[#121212]">
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
                  </div>
                ) : (
                  <div className="rounded-t-[1.5rem] bg-[#121212] px-4 pb-11 pt-[0.8125rem] sm:rounded-none sm:pt-0 lg:px-7">
                    <div className="flex max-h-[10rem] flex-col gap-[1.625rem] overflow-y-auto rounded-[1.125rem] bg-[rgba(70,70,70,0.25)] px-6 py-[1.625rem] sm:max-h-[24rem] lg:px-[1.625rem]">
                      {transactinHistory.map((transaction, index) => {
                        return (
                          <HistoryItem key={index} transaction={transaction} setActiveHistory={setActiveHistory} />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {/* Footer */}
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
                <div className="bg-[#171717] px-7 pb-[2.375rem] pt-6 sm:rounded-b-[2rem]">
                  <p className="mx-auto max-w-[18.25rem] text-center font-geist-regular text-sm leading-[1.125rem] tracking-[-1%] text-[#898989] sm:text-base">
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
