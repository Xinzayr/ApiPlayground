// hooks/useDarkMode.ts
import { useState, useEffect } from 'react';
import checkDarkTheme from '../utils/checkDarkTheme';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Solo ejecuta este código en el cliente
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      setIsDarkMode(checkDarkTheme());
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const className = 'dark';
      const element = document.documentElement;

      if (isDarkMode) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleDarkMode] as const;
};

export default useDarkMode;