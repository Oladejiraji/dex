import React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { MODAL_ANIMATION_VARIANTS } from '@/animation/variants';
import RemoteImage from '../shared/RemoteImage';
import { ChainType } from '@/services/queries/coins/types';
import { useParams, useRouter } from 'next/navigation';
import { AppRoutes } from '@/utils/routes';
import useOutsideClick from '@/hooks/useOutsideClick';

interface IProps {
  data: ChainType[];
  toggle: () => void;
}

const ChainSwitcherModal = ({ data, toggle }: IProps) => {
  const [ref] = useOutsideClick(toggle);
  const params = useParams();
  const paramsIdFallback = (params.id as string) || '137';
  const router = useRouter();
  return (
    <motion.div
      className="absolute right-0 top-[4rem] z-[50] h-[21.875rem] w-[16rem] rounded-[0.5rem] bg-[#121212]"
      variants={MODAL_ANIMATION_VARIANTS}
      ref={ref}
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
                  router.push(AppRoutes.connect.path(chain.chainId));
                }}
                className="flex w-full items-center justify-between rounded-[0.2rem] px-2 py-3 transition-colors hover:bg-[#171717]"
              >
                <div className="flex items-center gap-2">
                  <div>
                    <RemoteImage src={chain.icon} alt={chain.name} width={24} height={24} className="rounded-full" />
                  </div>
                  <p className="font-geist-medium text-sm text-white">{chain.name}</p>
                </div>
                {paramsIdFallback === chain.chainId.toString() ? <CheckIcon className="h-5 w-5 text-[green]" /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChainSwitcherModal;
