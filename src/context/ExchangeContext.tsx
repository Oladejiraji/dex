'use client';

import { RouteType, SocketToken, TransactionType } from '@/services/queries/coins/types';
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface ContextType {
  chainFrom: null | SocketToken;
  chainTo: null | SocketToken;
  activeRoute: null | RouteType;
  activeTransaction: null | TransactionType;
  updateChain: (type: 'from' | 'to', chain: SocketToken) => void;
  updateActiveRoute: (route: RouteType) => void;
  updateActiveTransaction: (transaction: TransactionType) => void;
  reverseChain: () => void;
  restartSwap: () => void;
}

const ExchangeContext = createContext<ContextType>({
  chainFrom: null,
  chainTo: null,
  activeRoute: null,
  activeTransaction: null,
  updateChain: () => {},
  updateActiveRoute: () => {},
  updateActiveTransaction: () => {},
  reverseChain: () => {},
  restartSwap: () => {},
});

export const useExchangeContext = () => {
  return useContext(ExchangeContext);
};

const ExchangeContexttProvider = ({ children }: { children: ReactNode }) => {
  const [chainFrom, setChainFrom] = useState<SocketToken | null>(null);
  const [chainTo, setChainTo] = useState<SocketToken | null>(null);
  const [activeRoute, setActiveRoute] = useState<RouteType | null>(null);
  const [activeTransaction, setActiveTransaction] = useState<TransactionType | null>(null);

  const updateChain = (type: 'from' | 'to', chain: SocketToken) => {
    if (type === 'from') setChainFrom(chain);
    if (type === 'to') setChainTo(chain);
  };

  const reverseChain = () => {
    setChainFrom(chainTo);
    setChainTo(chainFrom);
  };

  const updateActiveRoute = (route: RouteType) => {
    setActiveRoute(route);
  };

  const updateActiveTransaction = (transaction: TransactionType) => {
    setActiveTransaction(transaction);
  };

  const restartSwap = () => {
    setActiveRoute(null);
    setActiveTransaction(null);
  };

  const memoizedValue = useMemo(
    () => ({
      chainFrom,
      chainTo,
      updateChain,
      reverseChain,
      activeRoute,
      activeTransaction,
      updateActiveTransaction,
      updateActiveRoute,
      restartSwap,
    }),
    [chainFrom, chainTo, activeRoute, activeTransaction]
  );

  return <ExchangeContext.Provider value={memoizedValue}>{children}</ExchangeContext.Provider>;
};

export default ExchangeContexttProvider;
