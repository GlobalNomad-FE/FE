'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import GNB from '@/components/commons/gnb/gnb';
import Footer from '@/components/commons/Footer';

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const noGNBPaths = ['/login', '/signup'];
  const noFooterPaths = ['/login', '/signup'];

  return (
    <>
      {!noGNBPaths.includes(pathname) && <GNB />}
      {children}
      {!noFooterPaths.includes(pathname) && <Footer />}
    </>
  );
};

export default ClientComponent;
