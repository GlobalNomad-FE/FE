'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from '@/components/commons/Footer';
import { ToastContainer } from 'react-toastify';
import Script from 'next/script';
import GNB from './commons/gnb/gnb';

const ClientComponent = ({
  pretendard,
  children,
}: {
  pretendard: any;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const noGNBPaths = ['/login', '/signup'];
  const noFooterPaths = ['/login', '/signup'];

  return (
    <>
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
      {!noGNBPaths.includes(pathname) && <GNB />}
      {children}
      {!noFooterPaths.includes(pathname) && <Footer />}
    </>
  );
};

export default ClientComponent;
