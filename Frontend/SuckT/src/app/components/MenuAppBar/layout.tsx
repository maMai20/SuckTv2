'use client';

import { ThemeProviderContext, useThemeMode } from '../../context/ThemeContext';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode, useMemo } from 'react';

function InnerTheme({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'dark' ? '#121212' : '#ffffff',
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderContext>
          <InnerTheme>{children}</InnerTheme>
        </ThemeProviderContext>
      </body>
    </html>
  );
}
