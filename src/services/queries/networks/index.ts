import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../../api";
import keys from "./keys";

const BASE_URL = "/coins";

export const useNetworksRead = () => {
  const hash = [keys.read];
  const { data, isPending, error, isSuccess } = useQuery<any[]>({
    queryKey: hash,
    queryFn: async () =>
      await api.get({
        url: "https://api.coingecko.com/api/v3/asset_platforms",
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
