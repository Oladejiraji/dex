'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import Footer from '@/components/shared/Footer';
import { calculatePerceivedRotationX } from '@/services/helper';
import { ChainType } from '@/services/queries/coins/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import PanelComponentV2 from './PanelComponentV2';
import Player from './Player';
import Header from '../shared/Header';

gsap.registerPlugin(Observer);
const HomeComponentV2 = ({ data }: { data: ChainType[] }) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const velocityRef = useRef(0);

  const [activePanel, _] = useState(0);
  const [activeScroll, setActiveScroll] = useState(0);
  let actualRotation: number[];
  if (data) {
    const transformData = data.map((_, i) => i * 142);
    actualRotation = calculatePerceivedRotationX(transformData, 5000);
    console.log(actualRotation);
  }

  const returnTransform = (index: number) => {
    if (activePanel) {
      return index > activePanel ? (isLargeScreen ? 450 : 80) : 0;
    } else if (activeScroll) {
      return index > activeScroll && index <= activeScroll + 5 ? 50 : 0;
    } else return 0;
  };

  const PANEL_REPEAT = 3;

  const resetGrids = (gridArray: Element[], offset: number = 0) => {
    const gridCon = gridArray[0].getBoundingClientRect() as DOMRect;
    gsap.set(gridArray, {
      y: `-${gridCon.height / 3 + offset}`,
    });
  };

  const handleScroll = (observer: Observer) => {
    velocityRef.current = 0;
    const panelWrap = gsap.utils.toArray('.panel_wrap') as Element[];
    const gridCon = panelWrap[0].getBoundingClientRect();

    const resetPoint =
      gridCon.y > 0 || (Math.floor(gridCon.height) * 2) / PANEL_REPEAT < Math.floor(Math.abs(gridCon.y));

    if (resetPoint) {
      resetGrids(panelWrap);
    } else {
      const typeSpeed = observer.event.type.includes('touch') ? 0.5 : 1;
      const typeDuration = observer.event.type.includes('touch') ? 0.01 : 0.02;
      gsap.to(panelWrap, {
        duration: typeDuration,
        ease: 'none',
        y: `+=${observer.deltaY * typeSpeed}`,
      });
    }
  };

  const decelerateGrid = (observer: Observer) => {
    const panelWrap = gsap.utils.toArray('.panel_wrap') as Element[];
    const gridCon = panelWrap[0].getBoundingClientRect();

    const resetPoint =
      gridCon.y > 0 || (Math.floor(gridCon.height) * 2) / PANEL_REPEAT < Math.floor(Math.abs(gridCon.y));

    if (resetPoint) return;

    const appplyDec = () => {
      if (Math.abs(velocityRef.current) > 0.01) {
        // Add a deceleration
        console.log(velocityRef.current);
        gsap.to(panelWrap, {
          duration: 0.02,
          ease: 'none',
          y: `+=${velocityRef.current}`,
        });
        velocityRef.current = velocityRef.current * 0.9;
        requestAnimationFrame(appplyDec);
      } else {
        velocityRef.current = 0;
      }
    };
    velocityRef.current = observer.deltaY;
    requestAnimationFrame(appplyDec);
  };

  // Scroll observer
  useGSAP(() => {
    Observer.create({
      target: window,
      type: 'wheel,pointer,touch',
      onDown: (self) => handleScroll(self),
      onUp: (self) => handleScroll(self),
      wheelSpeed: -1,
      onDragEnd: (self) => {
        decelerateGrid(self);
      },
    });
  });

  // Disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    const panelWrap = gsap.utils.toArray('.panel_wrap') as Element[];
    resetGrids(panelWrap);
  }, []);
  const previewChain = data[activeScroll - 1];
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (activeScroll > 0) {
      // audioRef.current?.play();
    }
  }, [activeScroll]);
  return (
    <>
      <Header type={1} />
      <main className="mt-0 min-h-screen w-screen overflow-hidden px-8 lg:px-0">
        <div className="panel_wrap relative mx-auto max-w-[68.75rem]">
          {new Array(PANEL_REPEAT).fill(0).map((_, repeatIndex) => (
            <Fragment key={repeatIndex}>
              {data.map((chain, i) => {
                const index = i + 1;
                // const reverseIndex = Math.abs(i - original.length);
                // const isActive = activePanel === index;
                return (
                  <PanelComponentV2
                    key={i}
                    chain={chain}
                    setActiveScroll={setActiveScroll}
                    index={index}
                    returnTransform={returnTransform}
                  />
                );
              })}
            </Fragment>
          ))}
        </div>
      </main>
      {previewChain ? (
        <div className="pointer-events-none fixed bottom-[100px] left-0 z-[1000] flex w-full items-center justify-center gap-3 lg:hidden">
          <div className="">
            <Image src={previewChain.icon} alt="Chain Icon" width={32} height={32} className="rounded-[2px]" />
          </div>
          <div className="">
            <h3 className="text-neutral font-semibold text-[#F0F0F0]">{previewChain.name}</h3>
            <p className="text-neutral font-medium text-[#919191]">
              {previewChain.isL1 ? 'L1 Interaction' : 'L2 Interaction'}
            </p>
          </div>
        </div>
      ) : null}
      <div className="pointer-events-none fixed bottom-0 left-0 z-[999] w-full">
        <Image src={MainAssets.Mask} alt="Mask" />
      </div>
      <Player audioRef={audioRef} />

      <Footer expand />
    </>
  );
};

export default HomeComponentV2;
