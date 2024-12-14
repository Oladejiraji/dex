"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface ContextType {
  networkSearchValue: string;
  updateNetworkSearchValue: (value: string) => void;
}

const GeneralContext = createContext<ContextType>({
  networkSearchValue: "",
  updateNetworkSearchValue: () => {},
});

export const useGeneralContext = () => {
  return useContext(GeneralContext);
};

const GeneralContextProvider = ({ children }: { children: ReactNode }) => {
  const [networkSearchValue, setNetworkSearchValue] = useState("");

  const updateNetworkSearchValue = (value: string) => {
    setNetworkSearchValue(value);
  };

  const memoizedValue = useMemo(
    () => ({
      networkSearchValue,
      updateNetworkSearchValue,
    }),
    [networkSearchValue]
  );

  return (
    <GeneralContext.Provider value={memoizedValue}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
