import React, { Dispatch, SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import cx from 'classnames';
import { ChainType } from '@/services/queries/coins/types';
import { useLenis } from 'lenis/react';
import MainAssets from '@/lib/assets/main';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/utils/routes';

interface IProps {
  index: number;
  isActive: boolean;
  reverseIndex: number;
  chain: ChainType;
  actualRotation: number[];
  setActiveScroll: Dispatch<SetStateAction<number>>;
  setActivePanel: Dispatch<SetStateAction<number>>;
  returnTransform: (index: number) => 0 | 450 | 50;
}

const PanelComponent = ({
  reverseIndex,
  index,
  isActive,
  chain,
  actualRotation,
  setActiveScroll,
  setActivePanel,
  returnTransform,
}: IProps) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const lenis = useLenis();

  return (
    <motion.div
      style={{ top: 142 * (index - 1), zIndex: index }}
      className="absolute flex gap-4"
      animate={{ translateY: returnTransform(index) }}
    >
      {/* Info for stability */}
      <div className="opacity-0">
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
        className={cx('panel_con cursor-pointer overflow-y-hidden', {
          'h-[18.75rem]': !isActive,
          'h-[36.56rem]': isActive,
        })}
        // whileHover={{ scale: 1.02 }}
        onHoverStart={() => setActiveScroll(index)}
        onHoverEnd={() => setActiveScroll(0)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          if (isActive) {
            setActivePanel(0);
          } else {
            setActivePanel(index);
            setTimeout(() => {
              router.push(AppRoutes.connect.path(chain.chainId));
            }, 1000);
          }
          setTimeout(() => {
            lenis?.scrollTo(`#panel-${index}`, { offset: -100 });
          }, 300);
        }}
        animate={{
          scale: isHover ? 1.02 : 1,
          rotateX: isActive ? '0deg' : `-${actualRotation[reverseIndex - 1] + 20}deg`,
        }}
      >
        {/* Actual panel image */}
        <Image src={MainAssets.StraightPanel} alt="Panel" />
        {/* Chain icon */}
        <div className="absolute left-[6.25rem] top-[3.13rem]">
          <div className="flex items-center gap-3">
            <div className="">
              <Image src={chain.icon} alt="Chain Icon" width={48} height={48} className="rounded-[0.50rem]" />
            </div>
          </div>
        </div>
      </motion.div>
      {/* Info that shows on hover */}
      <motion.div
        className="mt-2 opacity-0"
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

export default PanelComponent;
