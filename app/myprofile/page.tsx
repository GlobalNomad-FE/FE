'use client';

import React, { useState } from 'react';
import MyPageForm from '@/components/myProfile/MyPageForm';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import Gnb from '@/components/commons/gnb/gnb';

const MyPage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  return (
    <div className="flex gap-6 justify-center px-4 bg-[#FAFAFA]">
      <Gnb />
      <main className="flex justify-center min-h-[100vh] max-h-[100%]  bg-gray50 pt-[142px] pb-[72px] ">
        <div className="width-[800px] pl-[24px] mobile:px-4 flex gap-6 ">
          <SideNavigationMenu />
          <div className="flex tablet:w-[429px] mobile:w-[343px]">
            <MyPageForm
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
