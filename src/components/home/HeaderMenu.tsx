import MainAssets from '@/lib/assets/main';
import { ChainType } from '@/services/queries/coins/types';
import { AppRoutes } from '@/utils/routes';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import RemoteImage from '../shared/RemoteImage';
import RenderIf from '../shared/RenderIf';
import ExternalLink from '../shared/ExternalLink';

interface IProps {
  isPopOpen: boolean;
  processedData: ChainType[];
}

export function HeaderMenu({ isPopOpen, processedData }: IProps) {
  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="relative overflow-hidden rounded-b-[0.38rem]"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '371px', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex h-full w-full justify-between px-4 pt-4 text-white">
            <div className="flex">
              <div className="w-[9.38rem] pl-2 pr-6">
                <h3 className="font-geist-regular text-xs text-[#4B4B4B]">Filter by</h3>
                <div className="mt-4 flex flex-col gap-2 px-1">
                  <div className="flex cursor-pointer gap-1">
                    <div className="mt-[0.31rem] h-[0.38rem] w-[0.88rem]">
                      <Image src={MainAssets.Chains} alt="chain icon" />
                    </div>
                    <div>
                      <p className="pb-[0.25rem] font-geist-medium text-[0.81rem] text-[#919191]">Chains</p>
                      <p className="font-geist-medium text-xs text-[#5F5F5F]">Base, ZKSync..</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[18.13rem] pl-[1.63rem] pr-4">
                <RenderIf condition={processedData.length > 0}>
                  <h3 className="font-geist-regular text-xs text-[#4B4B4B]">Onchain</h3>
                </RenderIf>
                <div className="mt-4 flex flex-col gap-2 px-1">
                  {processedData.length === 0 ? (
                    <p className="test-base font-geist-medium">Try Again!</p>
                  ) : (
                    <>
                      {processedData.slice(0, 2).map((chain, i) => (
                        <Link key={i} href={AppRoutes.connect.path(chain.chainId)}>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6">
                              <RemoteImage src={chain.icon} width={24} height={24} />
                            </div>
                            <div>
                              <p className="font-geist-medium text-[0.81rem] leading-[1.00rem] text-[#F9F9F9]">
                                {chain.name}
                              </p>
                              <p className="font-geist-medium text-[0.63rem] leading-[0.75rem] text-[#5F5F5F]">
                                {chain.isL1 ? 'L1 Protocol' : 'L2 Protocol'}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </>
                  )}

                  <Link href={AppRoutes.networks.path}>
                    <div className="flex items-center gap-1 border-b border-[#272727] py-3">
                      <div className="h-[0.63rem] w-[0.63rem]">
                        <Image src={MainAssets.RightGrey} alt="chain icon" />
                      </div>
                      <p className="font-geist-medium text-xs text-[#4B4B4B]">Show all Chains</p>
                    </div>
                  </Link>
                </div>
                <div className="mt-4 flex flex-col gap-2 px-1">
                  <p className="font-geist-regular text-[0.63rem] text-[#4B4B4B]">Interact to earn</p>
                  <ExternalLink href="https://eddy.finance/">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6">
                        <Image src={MainAssets.Eddy} alt="chain icon" />
                      </div>
                      <div>
                        <p className="font-geist-medium text-[0.81rem] leading-[1.00rem] text-[#F9F9F9]">
                          Eddy Finance
                        </p>
                        <p className="font-geist-medium text-[0.63rem] leading-[0.75rem] text-[#5F5F5F]">Zetachain</p>
                      </div>
                    </div>
                  </ExternalLink>
                  <ExternalLink href="https://www.gas.zip/">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6">
                        <Image src={MainAssets.Gas} alt="chain icon" />
                      </div>
                      <div>
                        <p className="font-geist-medium text-[0.81rem] leading-[1.00rem] text-[#F9F9F9]">GAS.ZIP</p>
                        <p className="font-geist-medium text-[0.63rem] leading-[0.75rem] text-[#5F5F5F]">Bridge</p>
                      </div>
                    </div>
                  </ExternalLink>
                </div>
              </div>
              <div className="items-between flex w-[9.81rem] flex-col justify-between">
                <div className="flex flex-col gap-2 pl-[1.13rem]">
                  <div className="flex gap-1">
                    <div className="mt-[0.19rem] h-[0.88rem] w-[0.63rem]">
                      <Image src={MainAssets.Docs} alt="chain icon" />
                    </div>
                    <div>
                      <p className="pb-[0.25rem] font-geist-medium text-[0.81rem] text-[#919191]">Docs</p>
                      <p className="font-geist-medium text-xs text-[#5F5F5F]">Coming soon</p>
                    </div>
                  </div>
                  <Link href={AppRoutes.faq.path}>
                    <div className="flex gap-1">
                      <div className="mt-[0.25rem] h-[0.63rem] w-[0.81rem]">
                        <Image src={MainAssets.Help} alt="chain icon" />
                      </div>
                      <div>
                        <p className="pb-[0.25rem] font-geist-medium text-[0.81rem] text-[#919191]">Help</p>
                        <p className="font-geist-medium text-xs text-[#5F5F5F]">FAQs</p>
                      </div>
                    </div>
                  </Link>
                  <Link href={AppRoutes.team.path}>
                    <div className="flex gap-1">
                      <div className="mt-[0.15rem] h-[0.63rem] w-[0.81rem]">
                        <Image src={MainAssets.Team} alt="chain icon" />
                      </div>
                      <div>
                        <p className="pb-[0.25rem] font-geist-medium text-[0.81rem] text-[#919191]">Team</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="relative bottom-[-24px] right-[-20px]">
                  <div className="">
                    <Image src={MainAssets.MenuMask3} alt="Menu mask" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
