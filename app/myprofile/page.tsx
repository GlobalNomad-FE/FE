'use client';
import MyPageForm from '@/components/myProfile/MyPageForm';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import { useState } from 'react';

const MyPage = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleChangeImage = (url: string) => {
    setImageUrl(url);
  };
  return (
    <>
      <main className="flex justify-center min-h-[100vh] max-h-[100%] bg-gray50 pt-[142px] tablet:pt-[94px] mobile:pt-[94px] pb-[72px] px-6 mobile:px-4">
        <div className="w-[1200px] flex gap-6">
          <SideNavigationMenu url={handleChangeImage} />
          <MyPageForm profileImage={imageUrl} />
        </div>
      </main>
    </>
  );
};

export default MyPage;
