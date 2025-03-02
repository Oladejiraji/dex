import { useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { ChainType } from '@/services/queries/coins/types';

const useFilterChains = (search?: string | null, data?: ChainType[]) => {
  const debouncedSearchValue = useDebounce(search, 300);

  const processedData = useMemo(() => {
    if (!data) return [];
    if (!debouncedSearchValue) return data;
    const trimSearch = debouncedSearchValue.trim().toLowerCase();

    return [...data].filter((item) => {
      if (!trimSearch) return true;
      return item.name.trim().toLowerCase().includes(trimSearch);
    });
  }, [data, debouncedSearchValue]);

  return processedData;
};

export default useFilterChains;
