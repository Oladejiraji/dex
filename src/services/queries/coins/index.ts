import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../../api";
import keys from "./keys";
import {
  BuildResponse,
  CoinData,
  QuoteResponse,
  RouteType,
  SocketToken,
  TokenBalanceResponse,
} from "./types";
import { baseAddress, chainBaseData } from "@/utils/static";
import { appendDecimal } from "@/utils/helpers";
import { buildUrl } from "@/services/helper";
import { useExchangeContext } from "@/context/ExchangeContext";

const BASE_URL = "/coins";

export const useCoinsRead = () => {
  const hash = [keys.read];
  const { data, isPending, error, isSuccess } = useQuery<CoinData[]>({
    queryKey: hash,
    queryFn: async () =>
      await api.get({
        url: "/coins/markets?vs_currency=usd",
        auth: true,
      }),
  });
  return {
    data,
    isPending,
    isSuccess,
    error,
  };
};

export const useRatesRead = () => {
  const hash = [keys.read];
  const { data, isPending, error } = useQuery<CoinData[]>({
    queryKey: hash,
    queryFn: async () =>
      await api.get({
        url: "/exchange_rates?vs_currency=usd",
        auth: true,
      }),
  });
  return {
    data,
    isPending,
    error,
  };
};

export const useSocketChainRead = () => {
  const hash = ["socket read"];
  const { data, isPending, error } = useQuery<CoinData[]>({
    queryKey: hash,
    queryFn: async () =>
      await api.get({
        url: "https://api.socket.tech/v2/supported/chains",
        auth: true,
      }),
  });
  return {
    data,
    isPending,
    error,
  };
};

export const useSocketTokensRead = () => {
  const hash = ["socket tokens read"];
  const { data, isPending, error, isSuccess } = useQuery<{
    result: SocketToken[];
    success: boolean;
  }>({
    queryKey: hash,
    queryFn: async () =>
      await api.get({
        url: `https://api.socket.tech/v2/token-lists/to-token-list?fromChainId=${chainBaseData.chainId}&toChainId=${chainBaseData.chainId}&singleTxOnly=true&isShortList=true`,
        auth: true,
      }),
  });
  return {
    data: data?.result,
    isPending,
    isSuccess,
    error,
  };
};

export const useSocketQuoteRead = (
  fromAddress?: string,
  toAddress?: string,
  amount?: string,
  decimal?: number,
  userAddress?: string,
  recipient?: string
) => {
  const hash = [
    "socket quote read",
    amount,
    userAddress,
    decimal,
    toAddress,
    fromAddress,
    recipient,
  ];
  const sendUrl = buildUrl("https://api.socket.tech/v2/quote", [
    { key: "fromChainId", value: chainBaseData.chainId },
    { key: "toChainId", value: chainBaseData.chainId },
    { key: "fromTokenAddress", value: fromAddress },
    { key: "toTokenAddress", value: toAddress },
    { key: "fromAmount", value: appendDecimal(amount, decimal) },
    { key: "userAddress", value: userAddress },
    { key: "recipient", value: recipient },
    { key: "singleTxOnly", value: "true" },
    { key: "uniqueRoutesPerBridge", value: "true" },
    { key: "sort", value: "output" },
  ]);
  const { data, isPending, error, isSuccess, refetch } =
    useQuery<QuoteResponse>({
      queryKey: hash,
      queryFn: async () =>
        await api.get({
          url: sendUrl,
          auth: true,
        }),
      enabled:
        !!fromAddress && !!toAddress && !!amount && !!userAddress && !!decimal,
    });
  return {
    data: data?.result,
    isPending,
    isSuccess,
    error,
    refetch,
  };
};

export const useCheckAllowanceRead = (
  fromAddress?: string,
  toAddress?: string,
  amount?: string,
  decimal?: number,
  userAddress?: string
) => {
  const hash = [
    "socket allowance read",
    amount,
    userAddress,
    decimal,
    toAddress,
    fromAddress,
  ];
  const { data, isPending, error, isSuccess, refetch } =
    useQuery<QuoteResponse>({
      queryKey: hash,
      queryFn: async () =>
        await api.get({
          url: `https://api.socket.tech/v2/approval/check-allowance?chainId=${chainBaseData.chainId}&owner=${userAddress}&allowanceTarget=${fromAddress}&tokenAddress=${toAddress}`,
          auth: true,
        }),
      enabled:
        !!fromAddress && !!toAddress && !!amount && !!userAddress && !!decimal,
    });
  return {
    data: data?.result,
    isPending,
    isSuccess,
    error,
    refetch,
  };
};

export const useTokenBalanceRead = (
  userAddress?: string,
  tokenAddress?: string
) => {
  const hash = ["socket token balance read", userAddress, tokenAddress];
  const { data, isPending, error, isSuccess, refetch } =
    useQuery<TokenBalanceResponse>({
      queryKey: hash,
      queryFn: async () =>
        await api.get({
          url: `https://api.socket.tech/v2/balances/token-balance?tokenAddress=${tokenAddress}&chainId=${chainBaseData.chainId}&userAddress=${userAddress}`,
          auth: true,
        }),
      enabled: !!userAddress && !!tokenAddress,
    });
  return {
    data: data?.result,
    isPending,
    isSuccess,
    error,
    refetch,
  };
};

export const useBuildPost = () => {
  const { activeRoute, updateActiveTransaction } = useExchangeContext();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (body: { route: RouteType }): Promise<any> => {
      return await api.post({
        url: "https://api.socket.tech/v2/build-tx",
        body,
      });
    },
    onSuccess: async (data: BuildResponse) => {
      updateActiveTransaction(data.result);
    },
    onError: (data: any) => {
      console.log(data);
    },
  });
  return {
    mutate,
    isPending,
    isError,
  };
};
