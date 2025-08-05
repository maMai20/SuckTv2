'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleTheme: () => {},
});

export const ThemeProviderContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('themeMode') as ThemeMode;
    if (stored) setMode(stored);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
