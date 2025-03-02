'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import { ReactLenis } from 'lenis/react';
import Footer from '@/components/shared/Footer';
import PanelComponent from '@/components/home/PanelComponent';
import { calculatePerceivedRotationX } from '@/services/helper';
import { ChainType } from '@/services/queries/coins/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const HomeComponent = ({ data }: { data: ChainType[] }) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  const [activePanel, setActivePanel] = useState(0);
  const [activeScroll, setActiveScroll] = useState(0);
  let actualRotation: number[];
  if (data) {
    const transformData = data.map((_, i) => i * 142);
    actualRotation = calculatePerceivedRotationX(transformData, 5000);
  }

  const returnTransform = (index: number) => {
    if (activePanel) {
      return index > activePanel ? (isLargeScreen ? 450 : 80) : 0;
    } else if (activeScroll) {
      return index > activeScroll && index <= activeScroll + 5 ? 50 : 0;
    } else return 0;
  };

  return (
    <>
      {/* <Header type={1} /> */}
      <main className="mt-0 min-h-screen w-screen px-8 lg:px-0">
        {/* <main className="mt-[12.50rem] min-h-screen w-screen px-8 lg:px-0"> */}
        <ReactLenis root options={{ infinite: true }}>
          <div className="panel_wrap relative mx-auto max-w-[68.75rem]">
            {data?.map((chain, i, original) => {
              const index = i + 1;
              const reverseIndex = Math.abs(i - original.length);
              const isActive = activePanel === index;
              return (
                <PanelComponent
                  key={i}
                  chain={chain}
                  isActive={isActive}
                  setActivePanel={setActivePanel}
                  setActiveScroll={setActiveScroll}
                  index={index}
                  actualRotation={actualRotation}
                  reverseIndex={reverseIndex}
                  returnTransform={returnTransform}
                />
              );
            })}
          </div>
        </ReactLenis>
      </main>

      <div className="pointer-events-none fixed bottom-0 left-0 z-[999] w-full">
        <Image src={MainAssets.Mask} alt="Mask" />
      </div>

      <Footer expand />
    </>
  );
};

export default HomeComponent;
