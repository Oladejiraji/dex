"use client";
import NetworkCard from "@/components/network/NetworkCard";
import Button from "@/components/shared/Button";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Skeleton } from "@/components/ui/skeleton";
import MainAssets from "@/lib/assets/main";
import { useSocketChainRead } from "@/services/queries/coins";
import { useNetworksRead } from "@/services/queries/networks";

import Image from "next/image";
import React from "react";

const Networks = () => {
  const { data, isPending } = useSocketChainRead();

  return (
    <>
      <Header type={3} />
      <main className="my-[140px] max-w-[1200px] mx-auto">
        <div className="border border-[#131313] border-dashed p-8 rounded-[10px]">
          <div className="grid network_grid place-items-center gap-y-8 border border-[#131313] py-9">
            {isPending ? (
              <>
                {new Array(12).fill(0).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-[200px] h-[200px] bg-primary-500 rounded-[12px]"
                  />
                ))}
              </>
            ) : (
              <>
                {data?.map((chain, i) => (
                  <NetworkCard key={i} chain={chain} />
                ))}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer fixed={false} />
    </>
  );
};

export default Networks;
