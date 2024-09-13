"use client";

import React, { ReactNode } from "react";
import { config, projectId, metadata } from "@/config/wagmi";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { State, WagmiProvider } from "wagmi";
import ExchangeContexttProvider from "./ExchangeContext";

// Setup queryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnReconnect: true,
    },
  },
});

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function AppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <ExchangeContexttProvider>
        <QueryClientProvider client={queryClient}>
          {children} <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ExchangeContexttProvider>
    </WagmiProvider>
  );
}
