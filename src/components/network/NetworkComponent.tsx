"use client";
import React, { useMemo } from "react";
import NetworkCard from "@/components/network/NetworkCard";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ChainType } from "@/services/queries/coins/types";
import { useGeneralContext } from "@/context/GeneralContext";
import { useDebounce } from "@/hooks/useDebounce";

const NetworkComponent = ({ result }: { result: ChainType[] }) => {
  const { networkSearchValue } = useGeneralContext();
  const debouncedSearchValue = useDebounce(networkSearchValue, 300);
  const filterNetworks = useMemo(() => {
    if (!result) return [];

    const trimSearch = debouncedSearchValue.trim().toLowerCase();

    return [...result].filter((item) => {
      if (!trimSearch) return true;
      return item.name.trim().toLowerCase().includes(trimSearch);
    });
  }, [debouncedSearchValue]);
  return (
    <>
      <Header type={3} />
      <main className="my-[8.75rem] max-w-[75.00rem] mx-auto">
        <div className="border border-[#131313] border-dashed p-8 rounded-[0.63rem]">
          <div className="grid network_grid place-items-center gap-y-8 border border-[#131313] py-9">
            {filterNetworks.map((chain, i) => (
              <NetworkCard key={i} chain={chain} />
            ))}
          </div>
        </div>
      </main>
      <Footer fixed={false} />
    </>
  );
};

export default NetworkComponent;
