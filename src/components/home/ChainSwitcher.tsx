import MainAssets from '@/lib/assets/main';
import { useSocketChainRead } from '@/services/queries/coins';
import Image from 'next/image';
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RemoteImage from '../shared/RemoteImage';
import { useChainId } from 'wagmi';
import ChainSwitcherModal from './ChainSwitcherModal';
import useOutsideClick from '@/hooks/useOutsideClick';

const ChainSwitcher = () => {
  const { data } = useSocketChainRead();
  const chainId = useChainId();
  const [isOpen, setIsPopOpen] = useState(false);
  const toggle = () => {
    setIsPopOpen((prev) => !prev);
  };
  const [ref] = useOutsideClick(() => setIsPopOpen(false));
  const myChainData = data?.find((chain) => chain.chainId === chainId);
  console.log(chainId);
  return (
    <div ref={ref}>
      <div className="relative">
        <button
          onClick={() => {
            setIsPopOpen(() => !isOpen);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-[0.375rem] bg-[#131415] lg:h-10 lg:w-10"
        >
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
