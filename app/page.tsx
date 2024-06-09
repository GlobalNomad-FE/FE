import Footer from '@/components/commons/Footer';
import Gnb from '@/components/commons/gnb/gnb';
import MainBody from '@/components/MainBody/MainBody';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main>
      <Gnb />
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <MainBody />
      {/* </Suspense> */}
      {/* <Footer /> */}
    </main>
  );
}
