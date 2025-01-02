import { getLocalStorage, saveLocalStorage } from '@/utils/helpers';
import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const storedValue = getLocalStorage(key);

    if (storedValue !== null) {
      setValue(storedValue);
    } else {
      setValue(initialValue);
    }
  }, [key]);

  const updateLocalStorage = (newValue: T) => {
    saveLocalStorage(key, newValue);
    setValue(newValue);
  };

  return [value, updateLocalStorage];
};

export default useLocalStorage;
