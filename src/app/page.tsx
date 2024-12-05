"use client";
import React, { useState } from "react";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import Header from "@/components/shared/Header";
import { ReactLenis, useLenis } from "lenis/react";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import cx from "classnames";
import { useSocketChainRead } from "@/services/queries/coins";
import { AppRoutes } from "@/utils/routes";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import RenderIf from "@/components/shared/RenderIf";
import Button from "@/components/shared/Button";
import New from "@/lib/svg/New";

const Home = () => {
  const lenis = useLenis();
  const { data, isPending } = useSocketChainRead();
  const [activeScroll, setActiveScroll] = useState(0);
  const [activePanel, setActivePanel] = useState(0);
  const returnTransform = (index: number) => {
    if (activePanel) {
      return index > activePanel ? 450 : 0;
    } else if (activeScroll) {
      return index > activeScroll && index <= activeScroll + 5 ? 50 : 0;
    }
  };
  return (
    <>
      <Header type={1} />
      {!isPending ? (
        <main className="w-screen min-h-screen mt-[200px]">
          <ReactLenis root options={{ infinite: true }}>
            <div className="max-w-[1000px] mx-auto relative">
              {data?.map((chain, i) => {
                const index = i + 1;
                return (
                  <motion.div
                    key={i}
                    id={`panel-${index}`}
                    className={cx("absolute overflow-y-hidden panel_con", {
                      "h-[200px]": activePanel !== index,
                      "h-[1000px]": activePanel === index,
                    })}
                    style={{ top: 142 * i, zIndex: index }}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setActiveScroll(index)}
                    onHoverEnd={() => setActiveScroll(0)}
                    onClick={() => {
                      if (activePanel === index) {
                        setActivePanel(0);
                      } else {
                        setActivePanel(index);
                      }
                      setTimeout(() => {
                        lenis?.scrollTo(`#panel-${index}`, { offset: -100 });
                      }, 300);
                    }}
                    animate={{
                      translateY: returnTransform(index),
                    }}
                  >
                    <div className="absolute top-[50px] left-[100px] ">
                      <div className="flex items-center gap-3">
                        <div className="">
                          <Image
                            src={chain.icon}
                            alt="Chain Icon"
                            width={48}
                            height={48}
                            className="rounded-[4px]"
                          />
                        </div>
                        <div>
                          <p className="text-[#F0F0F0] text-[13px] font-geist-semibold">
                            {chain.name}
                          </p>
                          <p className="text-[#919191] text-[13px] font-geist-medium">
                            {chain.isL1 ? "L1 interaction" : "L2 interaction"}
                          </p>
                        </div>
                      </div>
                      <RenderIf condition={activePanel === index}>
                        <div className="mt-2">
                          <Link href={AppRoutes.connect.path(chain.chainId)}>
                            <Button variant="ghost" className="group">
                              <div className="flex items-center gap-1">
                                <div className="bg-primary-200  rounded-[4px] py-[4px] px-[6px]">
                                  <div className="h-4 w-3  flex items-center justify-center ">
                                    <New className="transition-colors fill-[#919191] group-hover:fill-white " />
                                  </div>
                                </div>
                                <p className="text-[13px] transition-colors text-[#919191] group-hover:text-white">
                                  Trade
                                </p>
                              </div>
                            </Button>
                          </Link>
                        </div>
                      </RenderIf>
                    </div>
                    <Image src={MainAssets.Panel} alt="Panel" />
                  </motion.div>
                );
              })}
            </div>
          </ReactLenis>
        </main>
      ) : (
        <main className="w-screen min-h-screen mt-[200px]">
          <Skeleton className="w-[80%] mx-auto h-[650px] my-auto bg-primary-500 rounded-[12px]" />
        </main>
      )}
      <RenderIf condition={!isPending}>
        <div className="fixed bottom-0 left-0 w-full z-[999] pointer-events-none ">
          <Image src={MainAssets.Mask} alt="Mask" />
        </div>
      </RenderIf>
      <Footer expand />
    </>
  );
};

export default Home;
