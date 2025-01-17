import MainAssets from '@/lib/assets/main';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import cx from 'classnames';
import Input from '../../shared/Input';
import RenderIf from '../../shared/RenderIf';
import { useSocketTokensRead } from '@/services/queries/coins';
import { ChainType, SocketToken } from '@/services/queries/coins/types';
import RemoteImage from '../../shared/RemoteImage';
import { useDebounce } from '@/hooks/useDebounce';
import { MODAL_ANIMATION_VARIANTS } from '@/animation/variants';

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
  handleChainUpdate: (chain: SocketToken) => void;
  currChain: ChainType;
  activeChain: SocketToken | null;
}

export function ChainModal({ isPopOpen, setIsPopOpen, handleChainUpdate, currChain, activeChain }: IProps) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { data } = useSocketTokensRead(currChain.chainId);

  const handleChain = (chain: SocketToken) => {
    handleChainUpdate(chain);
    setIsPopOpen(false);
  };

  const chainsToNotSelect = [activeChain?.symbol];
  // const chainsToNotSelect = [chainFrom?.symbol, chainTo?.symbol];

  const processedData = useMemo(() => {
    if (!data) return [];

    const trimSearch = debouncedSearchValue.trim().toLowerCase();

    return [...data]
      .sort((a, b) => (a.logoURI === null ? 1 : b.logoURI === null ? -1 : 0))
      .filter((item) => {
        if (!trimSearch) return true;
        return (
          item.name.trim().toLowerCase().includes(trimSearch) || item.symbol.trim().toLowerCase().includes(trimSearch)
        );
      });
  }, [data, debouncedSearchValue]);

  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          style={{ willChange: 'opacity, transform' }}
          className="absolute left-0 top-0 z-[50] h-full w-full bg-transparent pb-[2.69rem] pt-[4.13rem] backdrop-blur-[0.25rem]"
          variants={MODAL_ANIMATION_VARIANTS}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <div className="relative mx-auto h-[548px] w-full max-w-[29.38rem] p-[0.06rem]">
            <div className="gradient_bg absolute inset-0 h-full w-full rounded-[0.38rem]" />
            <div className="select_gradient relative flex h-full flex-col rounded-[0.38rem] py-6">
              <div className="flex items-center gap-2 px-6">
                <Input
                  className="h-12 rounded-[0.38rem] border border-[#32323240] bg-transparent pl-[1.75rem] font-geist-medium text-[0.81rem] text-white placeholder:text-[#919191]"
                  containerClass="flex-1"
                  iconBeforeClassNames="left-[0.63rem]"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder="Search Token..."
                  iconBefore
                  icon={MainAssets.Search}
                />
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#32323240]"
                  onClick={() => setIsPopOpen(false)}
                >
                  <div className="h-[0.69rem] w-[0.69rem]">
                    <Image src={MainAssets.X} alt="X icon" width={11} height={11} />
                  </div>
                </button>
              </div>
              <div className="mb-8 mt-4 flex flex-wrap gap-x-4 gap-y-[0.63rem] px-6">
                {processedData.slice(0, 7).map((chain, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        handleChain(chain);
                      }}
                      disabled={chainsToNotSelect.includes(chain.symbol)}
                      className={cx(
                        'flex h-[1.88rem] items-center gap-1 rounded-[2.50rem] border border-[#32323240] px-[0.38rem]',
                        {
                          'bg-primary-200': chainsToNotSelect.includes(chain.symbol),
                        }
                      )}
                    >
                      <div className="h-4 w-4">
                        <RemoteImage src={chain.logoURI} width={16} height={16} className="rounded-full" />
                      </div>
                      <p className="font-geist-medium text-[0.94rem]">{chain.symbol.toUpperCase()}</p>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4 overflow-y-auto border-t border-[#32323240] px-6 pt-8">
                {processedData.length === 0 ? (
                  <div>
                    <p className="font-geist-medium">NO TOKENS FOUND</p>
                  </div>
                ) : (
                  <>
                    {processedData.map((chain, i) => (
                      <button
                        disabled={chainsToNotSelect.includes(chain.symbol)}
                        key={i}
                        className="flex items-center gap-4"
                        onClick={() => handleChain(chain)}
                        data-testid="data-full-list-button"
                      >
                        <div className="h-8 w-8">
                          <RemoteImage
                            src={chain.logoURI}
                            width={32}
                            height={32}
                            className="h-auto w-auto rounded-full"
                          />
                        </div>
                        <div>
                          <p className="text-left font-geist-medium text-[0.94rem]">
                            {/* {chain.symbol.toUpperCase()} */}
                          </p>
                          <p className="text-left font-geist-regular text-[0.81rem] text-[#7D7D7D]">{chain.name}</p>
                        </div>
                        <RenderIf condition={chainsToNotSelect.includes(chain.symbol)}>
                          <div className="h-6 w-6">
                            <Image src={MainAssets.Check} alt="check asset" />
                          </div>
                        </RenderIf>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
