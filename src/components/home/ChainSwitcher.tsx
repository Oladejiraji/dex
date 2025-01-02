import MainAssets from '@/lib/assets/main';
import { useSocketChainRead } from '@/services/queries/coins';
import Image from 'next/image';
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RemoteImage from '../shared/RemoteImage';
import { useChainId } from 'wagmi';
import ChainSwitcherModal from './ChainSwitcherModal';

const ChainSwitcher = () => {
  const { data } = useSocketChainRead();
  const chainId = useChainId();
  const [isOpen, setIsPopOpen] = useState(false);
  const toggle = () => {
    setIsPopOpen((prev) => !prev);
  };
  const myChainData = data?.find((chain) => chain.chainId === chainId);
  return (
    <div>
      <div className="relative">
        <button onClick={toggle} className="flex h-10 w-10 items-center justify-center rounded-[0.375rem] bg-[#131415]">
          <div className="relative">
            <RemoteImage
              width={24}
              height={24}
              src={myChainData?.icon || MainAssets.Eth}
              alt="My chain icon"
              className="rounded-full"
            />
            <div className="absolute bottom-[-1px] right-[-1px] flex h-[0.875rem] w-[0.875rem] items-center justify-center rounded-full bg-white">
              <Image alt="down icon" src={MainAssets.Down} />
            </div>
          </div>
        </button>
        <AnimatePresence>{isOpen && data ? <ChainSwitcherModal toggle={toggle} data={data} /> : null}</AnimatePresence>
      </div>
    </div>
  );
};

export default ChainSwitcher;
