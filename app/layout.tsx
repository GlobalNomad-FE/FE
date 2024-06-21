import type { Metadata } from 'next';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import localFont from 'next/font/local';
import Script from 'next/script';
import ReactQueryProviders from '@/apis/ReactQueryProviders';
import React from 'react';
import { AuthProvider } from '@/context/Authcontext';
import { ToastContainer } from 'react-toastify';
import GNB from '@/components/commons/gnb/gnb';
import Footer from '@/components/commons/Footer';

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
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <ReactQueryProviders>
          <AuthProvider>
            <div id="portal" />
            <Script
              strategy="beforeInteractive"
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_MAP_KEY}&autoload=false&libraries=services`}
            />
            <Script
              src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
              strategy="beforeInteractive"
            />
            <ToastContainer
              position="top-center"
              limit={2}
              autoClose={4000}
              closeOnClick
              pauseOnHover={false}
              draggable
              bodyClassName={pretendard.className}
              toastStyle={{ width: '350px' }}
              bodyStyle={{ fontSize: '1rem', fontWeight: 500 }}
            />
            <GNB />
            {children}
            <Footer />
          </AuthProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
