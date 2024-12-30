import MainAssets from '@/lib/assets/main';
import { AppRoutes } from '@/utils/routes';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import Button from '../Button';
import X from '@/lib/svg/X';

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
}

const transactions = [1, 2, 3];

export function TransactionHistoryModal({ isPopOpen, setIsPopOpen }: IProps) {
  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="absolute left-0 top-0 z-[50] flex h-full w-full items-start bg-transparent pb-[2.69rem] pt-[4.13rem] text-white backdrop-blur-[0.25rem]"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mx-auto h-fit w-full max-w-[32.4375rem] rounded-[2rem] bg-[#121212] p-[0.06rem]">
            <div className="">
              <div className="flex items-center justify-between px-[1.6875rem] py-[2.25rem]">
                <div>
                  <h1 className="font-geist-medium text-xs leading-4 text-[#898989]">
                    {transactions.length === 0 ? 'ACTIVITY' : `${transactions.length} completed`}
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
              {transactions.length === 0 ? (
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
                  {new Array(7).fill(0).map((_, index) => {
                    return (
                      <div key={index} className="flex items-center justify-center gap-[1.375rem]">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6">
                            <Image src={MainAssets.Ox} alt="route icon" className="rounded-[0.3125rem]" />
                          </div>
                          <div>
                            <h1 className="font-geist-medium text-xs leading-3 text-[#7D7D7D]">BRIDGE</h1>
                            <h3 className="font-geist-medium text-sm leading-[0.875rem] text-[#D7D7D7]">Across</h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div className="h-[1.625rem] w-[1.625rem]">
                              <Image src={MainAssets.Eth} alt="Token to be transformed" />
                            </div>
                            <div>
                              <p className="font-geist-regular text-xs leading-3 text-[#7D7D7D]">FROM</p>
                              <p className="font-geist-medium text-sm leading-[0.875rem] text-[#D7D7D7]">ETH</p>
                            </div>
                          </div>
                          <div className="h-8 w-8">
                            <Image src={MainAssets.RightShadowIcon} alt="Right Icon" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-[1.625rem] w-[1.625rem]">
                              <Image src={MainAssets.Usdc} alt="Token to be transformed" />
                            </div>
                            <div>
                              <p className="font-geist-regular text-xs leading-3 text-[#7D7D7D]">FROM</p>
                              <p className="font-geist-medium text-sm leading-[0.875rem] text-[#D7D7D7]">USDC</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="font-geist-medium text-sm text-[#9B9B9B]">5 MIN. AGO</p>
                        </div>
                      </div>
                    );
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
