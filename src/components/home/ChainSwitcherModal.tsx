import React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { MODAL_ANIMATION_VARIANTS } from '@/animation/variants';
import { useChainId, useSwitchChain } from 'wagmi';
import RemoteImage from '../shared/RemoteImage';
import { ChainType } from '@/services/queries/coins/types';

interface IProps {
  data: ChainType[];
  toggle: () => void;
}

const ChainSwitcherModal = ({ data, toggle }: IProps) => {
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  return (
    <motion.div
      className="absolute right-0 top-[3rem] z-[50] h-[21.875rem] w-[16rem] rounded-[0.5rem] bg-[#121212]"
      variants={MODAL_ANIMATION_VARIANTS}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <div className="h-full overflow-y-auto">
        <div className="p-3">
          {data.map((chain, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  toggle();
                  if (chainId === chain.chainId) return;
                  switchChain({ chainId: chain.chainId });
                }}
                className="flex w-full items-center justify-between rounded-[0.2rem] px-2 py-3 transition-colors hover:bg-[#171717]"
              >
                <div className="flex items-center gap-2">
                  <div>
                    <RemoteImage src={chain.icon} alt={chain.name} width={24} height={24} className="rounded-full" />
                  </div>
                  <p className="font-geist-medium text-sm text-white">{chain.name}</p>
                </div>
                {chainId === chain.chainId ? <CheckIcon className="h-5 w-5 text-[green]" /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChainSwitcherModal;