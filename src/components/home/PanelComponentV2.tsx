import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import cx from 'classnames';
import { ChainType } from '@/services/queries/coins/types';
import MainAssets from '@/lib/assets/main';
// import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface IProps {
  index: number;
  chain: ChainType;
  setActiveScroll: Dispatch<SetStateAction<number>>;
  returnTransform: (index: number) => 0 | 450 | 50 | 80;
}

const PanelComponentV2 = ({ index, chain, setActiveScroll, returnTransform }: IProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  // const router = useRouter();
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [isHover, setIsHover] = useState(false);

  const handleScroll = () => {
    const windowCenter = window.innerHeight / 2;
    const boundElement = itemRef.current?.getBoundingClientRect();
    if (!boundElement) return;

    if (Math.abs(windowCenter - (boundElement.bottom - boundElement.height / 2)) < boundElement.height / 2) {
      setIsHover(true);
      setActiveScroll(index);
    } else {
      setIsHover(false);
    }
  };

  useEffect(() => {
    document.addEventListener('wheel', handleScroll);
    document.addEventListener('touchmove', handleScroll);
    return () => {
      document.removeEventListener('wheel', handleScroll);
      document.addEventListener('touchmove', handleScroll);
    };
  }, []);

  return (
    <motion.div
      style={{ zIndex: index }}
      className="flex gap-4"
      animate={{ translateY: returnTransform(index) }}
      ref={itemRef}
    >
      {/* Info for stability */}
      <div className="hidden opacity-0 lg:block">
        <div className="flex items-center gap-3">
          <div className="">
            <Image src={chain.icon} alt="Chain Icon" width={48} height={48} className="rounded-[0.50rem]" />
          </div>
          <div className="">
            <p className="font-geist-semibold text-[0.81rem] text-[#F0F0F0]">{chain.name}</p>
            <p className="font-geist-medium text-[0.81rem] text-[#919191]">
              {chain.isL1 ? 'L1 interaction' : 'L2 interaction'}
            </p>
          </div>
        </div>
      </div>
      {/* Main Panel */}
      <motion.div
        id={`panel-${index}`}
        className={cx('panel_con h-[10rem] cursor-pointer lg:h-[14.75rem]', {})}
        onHoverStart={() => {
          setActiveScroll(index);
          // navigator.vibrate(100);
        }}
        onHoverEnd={() => setActiveScroll(0)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          // if (isActive) {
          //   setActivePanel(0);
          // } else {
          //   setActivePanel(index);1
          // setTimeout(() => {
          //   router.push(AppRoutes.connect.path(chain.chainId));
          // }, 400);
          // }
          // setTimeout(() => {
          //   router.push(AppRoutes.connect.path(chain.chainId));
          // }, 400);
        }}
        animate={{
          scaleX: isHover ? (isLargeScreen ? 1.02 : 1.1) : 1,
          scaleY: isHover ? (isLargeScreen ? 1.1 : 1.3) : 1,
          // rotateX: isActive ? '0deg' : `30deg`,
          // rotateX: isActive ? '0deg' : `-${actualRotation[reverseIndex - 1] + 20}deg`,
        }}
      >
        {/* Actual panel image */}
        <Image src={MainAssets.StraightPanel} alt="Panel" />
        {/* Chain icon */}
        <div className="absolute left-[2.25rem] top-[2.13rem] lg:left-[6.25rem] lg:top-[3.13rem]">
          <div className="flex items-center gap-3">
            <div className="">
              <Image src={chain.icon} alt="Chain Icon" width={48} height={48} className="rounded-[0.50rem]" />
            </div>
          </div>
        </div>
      </motion.div>
      {/* Info that shows on hover */}
      <motion.div
        className="mt-2 hidden opacity-0 lg:block"
        animate={{
          opacity: isHover ? 1 : 0,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12">
            <Image src={chain.icon} alt="Chain Icon" width={48} height={48} className="rounded-[0.50rem]" />
          </div>
          <div className="">
            <p className="font-geist-semibold text-[0.81rem] text-[#F0F0F0]">{chain.name}</p>
            <p className="whitespace-nowrap font-geist-medium text-[0.81rem] text-[#919191]">
              {chain.isL1 ? 'L1 interaction' : 'L2 interaction'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PanelComponentV2;
