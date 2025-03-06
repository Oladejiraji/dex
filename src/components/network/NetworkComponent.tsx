'use client';
import React, { useEffect, useMemo } from 'react';
import NetworkCard from '@/components/network/NetworkCard';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { ChainType } from '@/services/queries/coins/types';
import { useDebounce } from '@/hooks/useDebounce';
import { useExchangeContext } from '@/context/ExchangeContext';
import { useQueryState } from 'nuqs';

const NetworkComponent = ({ result }: { result: ChainType[] }) => {
  const [search] = useQueryState('search');
  const { restartSwap } = useExchangeContext();
  useEffect(() => {
    restartSwap();
  }, []);
  const debouncedSearchValue = useDebounce(search, 300);
  const filterNetworks = useMemo(() => {
    if (!result) return [];

    const trimSearch = (debouncedSearchValue || '').trim().toLowerCase();

    return [...result].filter((item) => {
      if (!trimSearch) return true;
      return item.name.trim().toLowerCase().includes(trimSearch);
    });
  }, [debouncedSearchValue]);

  return (
    <>
      <Header type={3} />
      <main className="mx-auto my-[5.5rem] max-w-[75.00rem] lg:my-[8.75rem]">
        <div className="rounded-[0.63rem] border border-dashed border-[#131313] p-8">
          {filterNetworks.length === 0 ? (
            <div>
              <p className="text-center text-white">No results found. Please try a different query!</p>
            </div>
          ) : (
            <div className="network_grid grid place-items-center gap-y-8 border border-[#131313] py-9">
              {filterNetworks.map((chain, i) => (
                <NetworkCard key={i} chain={chain} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer fixed={false} />
    </>
  );
};

export default NetworkComponent;
