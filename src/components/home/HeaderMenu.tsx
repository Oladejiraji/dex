import MainAssets from "@/lib/assets/main";
import { ChainType } from "@/services/queries/coins/types";
import { AppRoutes } from "@/utils/routes";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import RemoteImage from "../shared/RemoteImage";
import RenderIf from "../shared/RenderIf";
import ExternalLink from "../shared/ExternalLink";

interface IProps {
  isPopOpen: boolean;
  processedData: ChainType[];
}

export function HeaderMenu({ isPopOpen, processedData }: IProps) {
  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="relative rounded-b-[6px] overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "371px", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className=" w-full relative px-4 pt-4 h-full flex text-white justify-between">
            <div className="flex">
              <div className="pr-6 pl-2  w-[150px]">
                <h3 className="text-xs text-[#4B4B4B] font-geist-regular">
                  Filter by
                </h3>
                <div className="mt-4 flex flex-col gap-2 px-1">
                  <div className="flex gap-1 cursor-pointer">
                    <div className="mt-[5px] w-[14px] h-[6px]">
                      <Image src={MainAssets.Chains} alt="chain icon" />
                    </div>
                    <div>
                      <p className="text-[13px] font-geist-medium text-[#919191] pb-[4px]">
                        Chains
                      </p>
                      <p className="text-xs font-geist-medium text-[#5F5F5F]">
                        Base, ZKSync..
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex gap-1">
                    <div className="mt-[5px] w-[12px] h-[13px]">
                      <Image src={MainAssets.Tokens} alt="chain icon" />
                    </div>
                    <div>
                      <p className="text-[13px] font-geist-medium text-[#919191] pb-[4px]">
                        Tokens
                      </p>
                      <p className="text-xs font-geist-medium text-[#5F5F5F]">
                        USDC, Catwif..
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="mt-[5px] w-[16px] h-[12px]">
                      <Image src={MainAssets.Address} alt="chain icon" />
                    </div>
                    <div>
                      <p className="text-[13px] font-geist-medium text-[#919191] pb-[4px]">
                        Addresses
                      </p>
                      <p className="text-xs font-geist-medium text-[#5F5F5F]">
                        0x293829029..
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="pr-4 pl-[26px] w-[290px]">
                <RenderIf condition={processedData.length > 0}>
                  <h3 className="text-xs text-[#4B4B4B] font-geist-regular">
                    Onchain
                  </h3>
                </RenderIf>
                <div className="mt-4 flex flex-col gap-2 px-1">
                  {processedData.length === 0 ? (
                    <p className="font-geist-medium test-base">Try Again!</p>
                  ) : (
                    <>
                      {processedData.slice(0, 2).map((chain, i) => (
                        <Link
                          key={i}
                          href={AppRoutes.connect.path(chain.chainId)}
                        >
                          <div className="flex items-center gap-2">
                            <div className=" w-6 h-6">
                              <RemoteImage
                                src={chain.icon}
                                width={24}
                                height={24}
                              />
                            </div>
                            <div>
                              <p className="text-[13px] leading-[16px] font-geist-medium text-[#F9F9F9] ">
                                {chain.name}
                              </p>
                              <p className="text-[10px] leading-[12px] font-geist-medium text-[#5F5F5F]">
                                {chain.isL1 ? "L1 Protocol" : "L2 Protocol"}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                  {/* <div className="flex items-center gap-2">
                    <div className=" w-6 h-6">
                      <Image src={MainAssets.Eth} alt="chain icon" />
                    </div>
                    <div>
                      <p className="text-[13px] leading-[16px] font-geist-medium text-[#F9F9F9] ">
                        ETHEREUM
                      </p>
                      <p className="text-[10px] leading-[12px] font-geist-medium text-[#5F5F5F]">
                        L2 Protocol
                      </p>
                    </div>
                  </div> */}
                  <Link href={AppRoutes.networks.path}>
                    <div className="flex items-center gap-1 py-3 border-b border-[#272727]">
                      <div className=" w-[10px] h-[10px]">
                        <Image src={MainAssets.RightGrey} alt="chain icon" />
                      </div>
                      <p className="text-xs font-geist-medium text-[#4B4B4B]">
                        Show all Chains
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="mt-4 flex flex-col gap-2 px-1">
                  <p className="text-[10px] text-[#4B4B4B] font-geist-regular">
                    Interact to earn
                  </p>
                  <ExternalLink href="https://eddy.finance/">
                    <div className="flex items-center gap-2">
                      <div className=" w-6 h-6">
                        <Image src={MainAssets.Eddy} alt="chain icon" />
                      </div>
                      <div>
                        <p className="text-[13px] leading-[16px] font-geist-medium text-[#F9F9F9] ">
                          Eddy Finance
                        </p>
                        <p className="text-[10px] leading-[12px] font-geist-medium text-[#5F5F5F]">
                          Zetachain
                        </p>
                      </div>
                    </div>
                  </ExternalLink>
                  <ExternalLink href="https://www.gas.zip/">
                    <div className="flex items-center gap-2">
                      <div className=" w-6 h-6">
                        <Image src={MainAssets.Gas} alt="chain icon" />
                      </div>
                      <div>
                        <p className="text-[13px] leading-[16px] font-geist-medium text-[#F9F9F9] ">
                          GAS.ZIP
                        </p>
                        <p className="text-[10px] leading-[12px] font-geist-medium text-[#5F5F5F]">
                          Bridge
                        </p>
                      </div>
                    </div>
                  </ExternalLink>
                </div>
              </div>
              <div className="w-[157px] flex flex-col justify-between items-between">
                <div className="pl-[18px] flex flex-col gap-2">
                  <div className="flex gap-1">
                    <div className="w-[10px] h-[14px] mt-[3px]">
                      <Image src={MainAssets.Docs} alt="chain icon" />
                    </div>
                    <div>
                      <p className="text-[13px] font-geist-medium text-[#919191] pb-[4px]">
                        Docs
                      </p>
                      <p className="text-xs font-geist-medium text-[#5F5F5F]">
                        Coming soon
                      </p>
                    </div>
                  </div>
                  <Link href={AppRoutes.faq.path}>
                    <div className="flex  gap-1">
                      <div className="w-[13px] h-[10px] mt-[4px]">
                        <Image src={MainAssets.Help} alt="chain icon" />
                      </div>
                      <div>
                        <p className="text-[13px] font-geist-medium text-[#919191] pb-[4px]">
                          Help
                        </p>
                        <p className="text-xs font-geist-medium text-[#5F5F5F]">
                          FAQs
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="relative right-[-20px] bottom-[-24px]">
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
