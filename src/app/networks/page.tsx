"use client";
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
          <div className="grid grid-cols-4 place-items-center gap-y-8 border border-[#131313] py-9">
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
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div>
                      <Button className="border border-[#272727] px-[10px] py-[9px] rounded-[6px]">
                        <p className="text-[13px] font-geist-medium text-[#CDCDCD] ">
                          Bridge {chain.name}
                        </p>
                      </Button>
                    </div>
                    <div className="w-[200px] h-[200px] rounded-[10px] flex flex-col justify-between network_gradient p-4">
                      {/* This div is for layout stability */}
                      <div></div>
                      <div className="flex justify-center relative">
                        <Image
                          src={chain.icon}
                          alt="Chain Icon"
                          width={56}
                          height={56}
                          className="rounded-[4px]"
                        />
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-[13px] font-geist-medium">
                          {chain.name}
                        </p>
                      </div>
                    </div>
                  </div>
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
