'use client';

import React, { ReactNode } from 'react';
import { config, projectId } from '@/config/wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { State, WagmiProvider } from 'wagmi';
import ExchangeContexttProvider from './ExchangeContext';
import { darkTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';
import merge from 'lodash.merge';
import GeneralContextProvider from './GeneralContext';
import MobileIndicator from '@/components/shared/MobileIndicator';

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

if (!projectId) throw new Error('Project ID is not defined');

export default function AppKitProvider({ children }: { children: ReactNode; initialState?: State }) {
  const myTheme = merge(darkTheme(), {
    colors: {
      accentColor: 'red',
    },
  } as Theme);

  return (
    <WagmiProvider config={config}>
      <ExchangeContexttProvider>
        <GeneralContextProvider>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={myTheme}>
              <div className="hidden h-full w-full lg:block">{children}</div>
              <div className="block h-full w-full lg:hidden">
                <MobileIndicator />
                {/* <div className="test_overlay" /> */}
              </div>

              <ReactQueryDevtools initialIsOpen={false} />
            </RainbowKitProvider>
          </QueryClientProvider>
        </GeneralContextProvider>
      </ExchangeContexttProvider>
    </WagmiProvider>
  );
}
