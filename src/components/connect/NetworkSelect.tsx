import { useSocketChainRead } from '@/services/queries/coins';
import { ChainType } from '@/services/queries/coins/types';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import ChainSwitcherModal from '../home/ChainSwitcherModal';

const NetworkSelect = ({ currChain }: { currChain: ChainType }) => {
  const { data } = useSocketChainRead();
  const [isShow, setIsShow] = useState(false);
  const toggle = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <div className="relative">
      <div className="mt-[1.38rem] flex">
        <button className="flex items-center gap-2 rounded-[0.63rem] p-4" onClick={toggle}>
          <div className="h-8 w-8">
            <Image src={currChain.icon} alt="Chain Base Icon" className="rounded-[0.25rem]" width={32} height={32} />
          </div>
          <div>
            <h3 className="text-left font-geist-regular text-xs leading-[0.88rem] text-grey-300">Chain</h3>
            <h4 className="font-geist-medium text-[0.94rem] leading-[1.13rem]">{currChain.name}</h4>
          </div>
        </button>
      </div>
      <AnimatePresence>{isShow && data ? <ChainSwitcherModal toggle={toggle} data={data} /> : null}</AnimatePresence>
    </div>
  );
};

export default NetworkSelect;
