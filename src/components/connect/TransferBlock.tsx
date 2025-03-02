import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import Input from '../shared/Input';
import RenderIf from '../shared/RenderIf';
import { ChainSelect } from './ChainSelect';
import { motion } from 'framer-motion';
import { ChainModal } from './ChainModal';
import { useSocketTokensRead } from '@/services/queries/coins';
import { ChainType, SocketToken, TokenBalance } from '@/services/queries/coins/types';
import { formatNumber, removeDecimal, stringToFixed } from '@/utils/helpers';
import { useExchangeContext } from '@/context/ExchangeContext';
import NumberFlow from '@number-flow/react';
import { useAccount } from 'wagmi';
import { useParams } from 'next/navigation';
import { returnPriorityToken, reverseTokenType } from '@/services/helper';

interface IProps {
  type: 'from' | 'to';
  value: string;
  calculatedValue: string;
  handleInputChange: (value: string) => void;
  blockId: number;
  balance?: TokenBalance;
  currChain: ChainType;
}

const TransferBlock = ({ type, value, calculatedValue, handleInputChange, blockId, currChain, balance }: IProps) => {
  const params = useParams();
  const paramsIdFallback = (params.id as string) || '137';

  const account = useAccount();
  const { updateChain, reverseChain, chainFrom, chainTo } = useExchangeContext();

  const [isPopOpen, setIsPopOpen] = useState(false);
  const { data, isSuccess } = useSocketTokensRead(currChain.chainId);

  useEffect(() => {
    if (isSuccess && data) {
      const priorityTokens = returnPriorityToken({ tokens: data, chainId: paramsIdFallback });
      if (type === 'from') {
        updateChain('from', priorityTokens[0]);
      }
      if (type === 'to') {
        updateChain('to', priorityTokens[1]);
      }
    }
  }, [isSuccess]);

  const activeChain = type === 'from' ? chainFrom : chainTo;
  const otherChain = type === 'to' ? chainFrom : chainTo;
  const [isMax, setIsMax] = useState(false);

  const handleChainUpdate = (chain: SocketToken) => {
    if (!data) return;
    if (otherChain?.symbol === chain.symbol) {
      const priorityTokens = returnPriorityToken({ tokens: data, chainId: paramsIdFallback });
      updateChain(reverseTokenType(type), priorityTokens.find((fn) => fn.symbol !== chain.symbol) || data[0]);
    }
    updateChain(type, chain);
  };
  return (
    <>
      <ChainModal
        isPopOpen={isPopOpen}
        setIsPopOpen={setIsPopOpen}
        handleChainUpdate={handleChainUpdate}
        currChain={currChain}
        activeChain={activeChain}
      />
      <div className="relative flex flex-col gap-4 rounded-[0.63rem] bg-primary-300 px-4 py-[1.13rem]">
        <div className="flex w-full items-center justify-between">
          {type === 'from' ? (
            <div>
              <Input
                className="border-none bg-transparent p-0 font-geist-medium text-2xl text-grey-300"
                onChange={(e) => handleInputChange(e.target.value)}
                value={type === 'from' ? formatNumber(value) : formatNumber(calculatedValue)}
                placeholder="0.00"
                disabled={!account.address}
              />
            </div>
          ) : (
            <div>
              <NumberFlow
                value={parseFloat(calculatedValue)}
                format={{ notation: 'standard', maximumFractionDigits: 10 }} // Intl.NumberFormat options
                locales="en-US" // Intl.NumberFormat locales
                className="font-geist-medium text-2xl text-grey-300"
              />
            </div>
          )}

          <div>
            <ChainSelect value={activeChain} setIsPopOpen={setIsPopOpen} isPopOpen={isPopOpen} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div />
          {balance && type === 'from' ? (
            <div className="flex items-center gap-2">
              <p className="font-geist-regular text-xs text-grey-300">Bal:</p>
              <p className="font-geist-regular text-xs text-grey-300">
                {stringToFixed(removeDecimal(balance.decimals, balance?.balance))} {balance?.symbol}
              </p>
              <button
                onClick={() => {
                  setIsMax(true);
                  handleInputChange(stringToFixed(removeDecimal(balance.decimals, balance?.balance)));
                  // handleInputChange(stringToFixed(removeDecimal(balance.decimals, balance?.balance)));
                  setTimeout(() => {
                    setIsMax(false);
                  }, 500);
                }}
              >
                <motion.p
                  className="font-geist-medium text-[0.63rem]"
                  animate={{ width: isMax ? '2.7rem' : '1.5rem', color: isMax ? 'grey' : '#ffffff' }}
                >
                  <span>MAX</span>
                  <motion.span animate={{ opacity: isMax ? 1 : 0 }}>XING</motion.span>
                </motion.p>
              </button>
            </div>
          ) : null}
        </div>
        <RenderIf condition={blockId === 1}>
          <button
            className="absolute bottom-[-18px] left-[50%] z-[10] flex h-8 w-8 translate-x-[-50%] items-center justify-center rounded-[0.50rem] border-[0.19rem] border-[#060708] bg-[#0D0E0F]"
            onClick={reverseChain}
          >
            <div className="h-[0.63rem] w-[0.63rem]">
              <Image src={MainAssets.Up} alt="Up icon" />
            </div>
          </button>
        </RenderIf>
      </div>
    </>
  );
};

export default TransferBlock;
