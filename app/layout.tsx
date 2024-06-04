import type { Metadata } from 'next';
import '@/styles/globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';
import ReactQueryProviders from '@/apis/ReactQueryProviders';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

const pretendard = localFont({
  src: '../styles/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'GlobalNomad ',
  description: '바쁜 현대인을 위한 여행 플랫폼 GlobalNomad',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <html lang="ko">
      <QueryClientProvider client={queryClient}>
        <ReactQueryProviders>
          <body className={pretendard.className}>
            <div id="portal" />
            <Script
              strategy="beforeInteractive"
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services`}
            />
            {children}
          </body>
        </ReactQueryProviders>
      </QueryClientProvider>
    </html>
  );
}
