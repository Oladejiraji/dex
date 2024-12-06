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
import { Skeleton } from "@/components/ui/skeleton";
import RenderIf from "@/components/shared/RenderIf";
import { calculatePerceivedRotationX } from "@/services/helper";

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
    } else return 0;
  };
  let actualRotation: number[];
  if (data) {
    const transformData = data.map((_, i) => i * 142);
    actualRotation = calculatePerceivedRotationX(transformData, 5000);
  }
  return (
    <>
      <Header type={1} />
      {!isPending ? (
        <main className="w-screen min-h-screen mt-[200px]">
          <ReactLenis root options={{ infinite: true }}>
            <div className="max-w-[1000px] mx-auto relative panel_wrap">
              {data?.map((chain, i, original) => {
                const index = i + 1;
                const isActive = activePanel === index;
                const reverseIndex = Math.abs(i - original.length);
                return (
                  <motion.div
                    key={i}
                    id={`panel-${index}`}
                    className={cx("absolute overflow-y-hidden panel_con", {
                      "h-[300px]": !isActive,
                      "h-[1000px]": isActive,
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
                      rotateX: isActive
                        ? "0deg"
                        : `-${actualRotation[reverseIndex - 1] + 20}deg`,
                    }}
                  >
                    <Image src={MainAssets.StraightPanel} alt="Panel" />
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
                    </div>
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
