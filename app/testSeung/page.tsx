'use client';

import MyPageForm from '@/components/myPage/MyPageForm';
import React, { useState } from 'react';
import Profile from '@/components/myPage/Profile';

export default function page() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  return (
    <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[65px]">
      <Profile
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
      />
      <MyPageForm uploadedImage={uploadedImage} />
    </div>
  );
}
