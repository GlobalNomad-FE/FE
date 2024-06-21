import React, { ChangeEvent } from 'react';
import uploadProfileImage from '@/apis/user/uploadProfileImage';
import Image from 'next/image';
import InformationNoImage from './InformationImage';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ProfileImage = ({
  nickname,
  profileImageUrl,
  uploadedImage = null,
  setUploadedImage = () => null,
}: {
  nickname: string;
  profileImageUrl: string;
  uploadedImage?: string | null;
  setUploadedImage?: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  useEffect(() => {
    const storedImageUrl = Cookies.get('uploadedImage');
    if (storedImageUrl) {
      setUploadedImage(storedImageUrl);
    }
  }, [setUploadedImage]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageData = await uploadProfileImage(file);
        setUploadedImage(imageData.profileImageUrl);
        Cookies.set('uploadedImage', imageData.profileImageUrl);
      } catch (error) {
        toast.error('Failed to upload image:');
      }
    }
  };

  const handlePenClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.click();
  };

  if (!profileImageUrl && !uploadedImage) {
    return (
      <InformationNoImage
        nickname={nickname}
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
      />
    );
  }

  return (
    <>
      <div
        className="relative w-40 h-40 shrink-0 rounded-full shadow-md bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${uploadedImage || profileImageUrl})`,
          backgroundColor: '#E3E5E8',
          backgroundSize: 'contain',
        }}
      >
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </div>
      <div
        className="absolute p-[10px] w-22 h-22  items-start bottom-0 right-3 z-10 rounded-full cursor-pointer"
        onClick={handlePenClick}
      >
        <Image width={44} height={44} src="/icons/penIcon.svg" alt="penIcon" />
      </div>
    </>
  );
};

export default ProfileImage;
