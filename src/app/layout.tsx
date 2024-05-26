'use client';
import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import theme from "@/theme";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#191A21',
      contrastText: "#ffffff",
    },
    secondary: {
      main: '#44475a',
      contrastText: "#ffffff",
    },
    error: {
      main: '#ff5555',
    },
    success: {
      main: '#50fa7b',
    },
    warning: {
      main: '#f1fa8c',
    },
    info: {
      main: '#8be9fd',
    },
    background: {
      default: '#282a36',
      paper: '#191A21'
    },
    text: {
      primary: '#ffffff',
      secondary: '#6272a4'
    },
  },
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
