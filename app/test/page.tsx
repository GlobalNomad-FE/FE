'use client'; // app라우터에서는 맨위에 이거 써야 훅 쓸수 있는것 같습니다
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';

export default function page() {
  return (
    <main className="">
      <SideNavigationMenu />
    </main>
  );
}
