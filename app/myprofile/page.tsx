'use client';

import React, { useState } from 'react';
import MyPageForm from '@/components/myProfile/MyPageForm';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';

const MyPage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  return (
    <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[65px]">
      <SideNavigationMenu
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
      />
      <MyPageForm
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
      />
    </div>
  );
};

export default MyPage;
