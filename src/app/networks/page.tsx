import NetworkComponent from "@/components/network/NetworkComponent";
import { fetchSocketNetworks } from "@/server-side-services/home";
import { ChainType } from "@/services/queries/coins/types";
import React, { Suspense } from "react";

const Networks = async () => {
  const data = await fetchSocketNetworks();
  const result: ChainType[] = data.result;
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NetworkComponent result={result} />
    </Suspense>
  );
};

export default Networks;
