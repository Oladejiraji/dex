'use client';

import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Id } from 'react-toastify';

interface ContextType {
  networkSearchValue: string;
  updateNetworkSearchValue: (value: string) => void;
  transactionToastId: Id;
  updateTransactionToastId: (value: Id) => void;
}

const GeneralContext = createContext<ContextType>({
  networkSearchValue: '',
  updateNetworkSearchValue: () => {},
  transactionToastId: '',
  updateTransactionToastId: () => {},
});

export const useGeneralContext = () => {
  return useContext(GeneralContext);
};

const GeneralContextProvider = ({ children }: { children: ReactNode }) => {
  const [transactionToastId, setTransactionToastId] = useState<Id>(0);
  const [networkSearchValue, setNetworkSearchValue] = useState('');

  const updateNetworkSearchValue = (value: string) => {
    setNetworkSearchValue(value);
  };

  const updateTransactionToastId = (id: Id) => {
    setTransactionToastId(id);
  };

  const memoizedValue = useMemo(
    () => ({
      networkSearchValue,
      updateNetworkSearchValue,
      transactionToastId,
      updateTransactionToastId,
    }),
    [networkSearchValue, transactionToastId]
  );

  return <GeneralContext.Provider value={memoizedValue}>{children}</GeneralContext.Provider>;
};

export default GeneralContextProvider;
