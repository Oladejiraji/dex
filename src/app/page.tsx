"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import Header from "@/components/shared/Header";
import { ReactLenis, useLenis } from "lenis/react";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import cx from "classnames";

const PANEL_NUMBER = 15;

const Home = () => {
  const lenis = useLenis();
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
      <main className="w-screen min-h-screen mt-[200px]">
        <ReactLenis root options={{ infinite: true }}>
          <div className="max-w-[1000px] mx-auto relative">
            {new Array(PANEL_NUMBER).fill(0).map((item, i) => {
              const index = i + 1;
              return (
                <motion.div
                  key={i}
                  id={`panel-${index}`}
                  className={cx("absolute overflow-y-hidden", {
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
                    console.log(lenis);
                    setTimeout(() => {
                      lenis?.scrollTo(`#panel-${index}`, { offset: -100 });
                    }, 300);
                  }}
                  animate={{
                    translateY: returnTransform(index),
                  }}
                >
                  <Image src={MainAssets.Panel} alt="Panel" />
                </motion.div>
              );
            })}
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

export default Home;
