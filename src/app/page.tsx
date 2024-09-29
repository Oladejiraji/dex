"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import Header from "@/components/shared/Header";
import { ReactLenis, useLenis } from "lenis/react";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";

const PANEL_NUMBER = 15;
const PANEL_HEIGHT = 142;
const PANEL_SECTION_HEIGHT = PANEL_HEIGHT * PANEL_NUMBER;

const Home = () => {
  const [activeScroll, setActiveScroll] = useState(0);
  return (
    <>
      <Header type={1} />
      <main className="w-screen min-h-screen mt-[200px]">
        <ReactLenis root options={{ infinite: true }}>
          <div className="max-w-[1000px] mx-auto relative">
            {/* <div className=""> */}
            {new Array(PANEL_NUMBER).fill(0).map((item, i) => {
              const index = i + 1;
              return (
                <motion.div
                  key={i}
                  className="absolute overflow-y-hidden h-[200px] "
                  style={{ top: 142 * i, zIndex: index }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setActiveScroll(index)}
                  onHoverEnd={() => setActiveScroll(0)}
                  animate={{
                    translateY:
                      activeScroll > 0 &&
                      index > activeScroll &&
                      index <= activeScroll + 5
                        ? 50
                        : 0,
                  }}
                >
                  <Image src={MainAssets.Panel} alt="Panel" />
                </motion.div>
              );
            })}
            {/* </div> */}
            {/* <div className="">
              {new Array(PANEL_NUMBER).fill(0).map((item, i) => {
                const index = i + PANEL_NUMBER;
                return (
                  <motion.div
                    key={i}
                    className="absolute overflow-y-hidden h-[200px] "
                    style={{ top: 142 * index, zIndex: index }}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setActiveScroll(index)}
                    onHoverEnd={() => setActiveScroll(0)}
                    animate={{
                      translateY:
                        activeScroll > 0 &&
                        index > activeScroll &&
                        index <= activeScroll + 5
                          ? 50
                          : 0,
                    }}
                  >
                    <Image src={MainAssets.Panel} alt="Panel" />
                  </motion.div>
                );
              })}
            </div> */}
          </div>
        </ReactLenis>
      </main>
      <div className="fixed bottom-0 left-0 w-full z-[999] pointer-events-none ">
        <Image src={MainAssets.Mask} alt="Mask" />
      </div>
      <Footer expand />
    </>
  );
};

// const PanelItem = ({ key }: { key: number }) => {
//   return (
//     <motion.div className="absolute" style={{ top: 142 * key }}>
//       <Image src={MainAssets.Panel} alt="Panel" />
//     </motion.div>
//   );
// };

export default Home;
