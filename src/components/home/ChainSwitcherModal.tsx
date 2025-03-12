import React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { MODAL_ANIMATION_VARIANTS } from '@/animation/variants';
import RemoteImage from '../shared/RemoteImage';
import { ChainType } from '@/services/queries/coins/types';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/utils/routes';
import { useSwitchChain } from 'wagmi';
import { cn } from '@/lib/utils';
import { errorToast } from '@/utils/helpers';

interface IProps {
  data: ChainType[];
  toggle: () => void;
  anchor?: 'right' | 'left';
  activeChain?: number;
}

const ChainSwitcherModal = ({ data, toggle, anchor = 'right', activeChain }: IProps) => {
  const router = useRouter();
  const { switchChainAsync } = useSwitchChain();

  return (
    <motion.div
      className={cn('absolute top-[3rem] z-[50] h-[21.875rem] w-[16rem] rounded-[0.5rem] bg-[#121212] lg:top-[4rem]', {
        'right-[-5rem] lg:right-[-3rem]': anchor === 'right',
        'left-0': anchor === 'left',
      })}
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
                onClick={async () => {
                  toggle();
                  try {
                    await switchChainAsync({ chainId: chain.chainId });
                    router.push(AppRoutes.connect.path(chain.chainId));
                  } catch (err: any) {
                    if (err?.message?.includes('User rejected the request')) {
                      errorToast('You rejected the transaction!');
                    } else {
                      errorToast(err?.message || 'Something went wrong!');
                    }
                  }
                }}
                className="flex w-full items-center justify-between rounded-[0.2rem] px-2 py-3 transition-colors hover:bg-[#171717]"
              >
                <div className="flex items-center gap-2">
                  <div>
                    <RemoteImage src={chain.icon} alt={chain.name} width={24} height={24} className="rounded-full" />
                  </div>
                  <p className="font-geist-medium text-sm text-white">{chain.name}</p>
                </div>
                {activeChain === chain.chainId ? <CheckIcon className="h-5 w-5 text-[green]" /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChainSwitcherModal;
