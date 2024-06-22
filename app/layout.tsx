import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import localFont from 'next/font/local';
import React from 'react';
import ReactQueryProviders from '@/apis/ReactQueryProviders';
import { AuthProvider } from '@/context/Authcontext';
import ClientComponent from '@/components/ClientComponent';

const pretendard = localFont({
  src: '../styles/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata = {
  title: 'GlobalNomad',
  description: '바쁜 현대인을 위한 여행 플랫폼 GlobalNomad',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <ReactQueryProviders>
          <AuthProvider>
            <div id="portal" />
            <ClientComponent pretendard={pretendard}>
              {children}
            </ClientComponent>
          </AuthProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
