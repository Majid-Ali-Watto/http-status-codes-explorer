import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SpeedInsights } from '@vercel/speed-insights/next';
import React, { createContext } from 'react';

// Create a ThemeContext
export const UrlContext = createContext({ url: '' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UrlContext value={{ url: 'https://httpstatuscodesexplorer.vercel.app/' }}>
      <SpeedInsights />
      <Component {...pageProps} />
    </UrlContext>
  );
}
