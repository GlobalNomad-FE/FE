'use client'; // app라우터에서는 맨위에 이거 써야 훅 쓸수 있는것 같습니다

import Footer from '@/components/commons/Footer';
import Gnb from '@/components/commons/gnb/gnb';

export default function page() {
  return (
    <div>
      {/* <Gnb /> */}
      <Footer />
    </div>
  );
}
