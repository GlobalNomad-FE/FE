'use client';

import MyPageForm from '@/components/myProfile/MyPageForm';
import React, { useState } from 'react';

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  return (
    <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[65px]">
      <MyPageForm uploadedImage={uploadedImage} />
    </div>
  );
}
