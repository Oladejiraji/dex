import { Label } from "@/components/ui/label";
import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import cx from "classnames";
import Input from "../shared/Input";
import { ChainOptions } from "@/data/ChainOptions";
import RenderIf from "../shared/RenderIf";
import { useCoinsRead, useSocketTokensRead } from "@/services/queries/coins";
import { CoinData, SocketToken } from "@/services/queries/coins/types";
import { useExchangeContext } from "@/context/ExchangeContext";
import { chainBaseData } from "@/utils/static";
import RemoteImage from "../shared/RemoteImage";

interface IProps {
  type: "from" | "to";
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
  handleChainUpdate: (chain: SocketToken) => void;
}

export function ChainPopover({
  isPopOpen,
  setIsPopOpen,
  handleChainUpdate,
  type,
}: IProps) {
  const [searchValue, setSearchValue] = useState("");
  const { data } = useSocketTokensRead();

  const { chainFrom, chainTo } = useExchangeContext();

  const handleChain = (chain: SocketToken) => {
    handleChainUpdate(chain);
    setIsPopOpen(false);
  };

  const prevChain = type === "from" ? chainFrom?.symbol : chainTo?.symbol;

  const sortedData = useMemo(() => {
    return [...(data || [])].sort((a, b) => {
      if (a.logoURI === null && b.logoURI !== null) {
        return 1; // a comes after b
      } else if (a.logoURI !== null && b.logoURI === null) {
        return -1; // a comes before b
      } else {
        return 0; // no change in order
      }
    });
  }, [data]); // recompute only when companies change

  const filteredData = useMemo(() => {
    const trimSearch = searchValue.trim().toLowerCase();

    if (!trimSearch) return data;

    return sortedData?.filter((filt) => {
      return (
        filt.name.trim().toLowerCase().includes(trimSearch) ||
        filt.symbol.trim().toLowerCase().includes(trimSearch)
      );
    });
  }, [sortedData, searchValue]);

  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="absolute left-0 top-0 z-[50] backdrop-blur-[4px] bg-transparent w-full h-full pt-[66px] pb-[43px]"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-[470px] mx-auto w-full relative p-[1px] h-full">
            <div className="gradient_bg absolute inset-0 w-full h-full rounded-[6px]" />
            <div className="relative select_gradient py-6 rounded-[6px] h-full flex flex-col">
              <div className="flex items-center gap-2 px-6">
                <Input
                  className="bg-transparent border border-[#32323240] font-geist-medium text-[13px] text-[#919191] p-3 h-12  rounded-[6px]"
                  containerClass="flex-1"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder="Search Token..."
                  iconBefore
                  icon={MainAssets.Search}
                />
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-[#32323240]"
                  onClick={() => setIsPopOpen(false)}
                >
                  <div className="w-[11px] h-[11px]">
                    <Image src={MainAssets.X} alt="X icon" />
                  </div>
                </button>
              </div>
              <div className="flex flex-wrap mt-4 mb-8 gap-x-4 gap-y-[10px] px-6">
                {sortedData?.slice(0, 7).map((chain, i) => (
                  <button
                    key={i}
                    onClick={() => handleChain(chain)}
                    disabled={prevChain === chain.symbol}
                    className={cx(
                      "flex items-center gap-1 p-[6px] border border-[#32323240] rounded-[40px]",
                      { "bg-primary-200": prevChain === chain.symbol }
                    )}
                  >
                    <div className="w-4 h-4">
                      <RemoteImage src={chain.logoURI} width={16} height={16} />
                    </div>
                    <p className="font-geist-medium text-[15px]">
                      {chain.symbol.toUpperCase()}
                    </p>
                  </button>
                ))}
              </div>
              <div className="pt-8 border-t border-[#32323240] px-6 flex flex-col gap-4 overflow-y-auto">
                {filteredData?.length === 0 ? (
                  <div>
                    <p className="font-geist-medium">NO TOKENS FOUND</p>
                  </div>
                ) : (
                  <>
                    {filteredData?.map((chain, i) => (
                      <button
                        disabled={prevChain === chain.symbol}
                        key={i}
                        className="flex items-center gap-4 "
                        onClick={() => handleChain(chain)}
                      >
                        <div className="w-8 h-8">
                          <RemoteImage
                            src={chain.logoURI}
                            width={32}
                            height={32}
                          />
                        </div>
                        <div>
                          <p className="font-geist-medium text-[15px] text-left">
                            {chain.symbol.toUpperCase()}
                          </p>
                          <p className="font-geist-regular text-[13px] text-[#7D7D7D] text-left">
                            {chain.name}
                          </p>
                        </div>
                        <RenderIf condition={prevChain === chain.symbol}>
                          <div className="w-6 h-6">
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
