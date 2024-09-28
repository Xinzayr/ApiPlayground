// src/hooks/useLocalStorage.ts
import { useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../utils/localStorageUtil';

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    return getFromLocalStorage(key) || initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    saveToLocalStorage(key, value);
  };

  const removeValue = () => {
    setStoredValue(null);
    removeFromLocalStorage(key);
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;