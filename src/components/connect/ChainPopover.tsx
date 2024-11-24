import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import cx from "classnames";
import Input from "../shared/Input";
import RenderIf from "../shared/RenderIf";
import { useSocketTokensRead } from "@/services/queries/coins";
import { ChainType, SocketToken } from "@/services/queries/coins/types";
import { useExchangeContext } from "@/context/ExchangeContext";
import RemoteImage from "../shared/RemoteImage";
import { useDebounce } from "@/hooks/useDebounce";

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
  handleChainUpdate: (chain: SocketToken) => void;
  currChain: ChainType;
}

export function ChainPopover({
  isPopOpen,
  setIsPopOpen,
  handleChainUpdate,
  currChain,
}: IProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { data } = useSocketTokensRead(currChain.chainId);

  const { chainFrom, chainTo } = useExchangeContext();

  const handleChain = (chain: SocketToken) => {
    handleChainUpdate(chain);
    setIsPopOpen(false);
  };

  const chainsToNotSelect = [chainFrom?.symbol, chainTo?.symbol];

  const processedData = useMemo(() => {
    if (!data) return [];

    const trimSearch = debouncedSearchValue.trim().toLowerCase();

    return [...data]
      .sort((a, b) => (a.logoURI === null ? 1 : b.logoURI === null ? -1 : 0))
      .filter((item) => {
        if (!trimSearch) return true;
        return (
          item.name.trim().toLowerCase().includes(trimSearch) ||
          item.symbol.trim().toLowerCase().includes(trimSearch)
        );
      });
  }, [data, debouncedSearchValue]);

  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          style={{ willChange: "opacity, transform" }}
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
                  className="bg-transparent border border-[#32323240] font-geist-medium text-[13px] placeholder:text-[#919191] text-white pl-[28px] h-12  rounded-[6px]"
                  containerClass="flex-1"
                  iconBeforeClassNames="left-[10px]"
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
                {processedData?.slice(0, 7).map((chain, i) => (
                  <button
                    key={i}
                    onClick={() => handleChain(chain)}
                    disabled={chainsToNotSelect.includes(chain.symbol)}
                    className={cx(
                      "flex items-center gap-1 px-[6px] h-[30px] border border-[#32323240] rounded-[40px]",
                      {
                        "bg-primary-200": chainsToNotSelect.includes(
                          chain.symbol
                        ),
                      }
                    )}
                  >
                    <div className="w-4 h-4">
                      <RemoteImage
                        src={chain.logoURI}
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    </div>
                    <p className="font-geist-medium text-[15px]">
                      {chain.symbol.toUpperCase()}
                    </p>
                  </button>
                ))}
              </div>
              <div className="pt-8 border-t border-[#32323240] px-6 flex flex-col gap-4 overflow-y-auto">
                {processedData?.length === 0 ? (
                  <div>
                    <p className="font-geist-medium">NO TOKENS FOUND</p>
                  </div>
                ) : (
                  <>
                    {processedData?.map((chain, i) => (
                      <button
                        disabled={chainsToNotSelect.includes(chain.symbol)}
                        key={i}
                        className="flex items-center gap-4 "
                        onClick={() => handleChain(chain)}
                      >
                        <div className="w-8 h-8">
                          <RemoteImage
                            src={chain.logoURI}
                            width={32}
                            height={32}
                            className="rounded-full w-auto h-auto"
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
                        <RenderIf
                          condition={chainsToNotSelect.includes(chain.symbol)}
                        >
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
