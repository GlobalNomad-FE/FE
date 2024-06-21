import React, { useState } from 'react';
import uploadProfileImage from '@/apis/user/uploadProfileImage';
import Image from 'next/image';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserProfile from '@/hooks/useUserProfile';

interface Props {
  url: (url: string) => void;
}

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12 ">
        {/* 도넛 모양 배경 */}
        <div className="absolute opacity-45 top-0 left-0 w-full h-full border-[6px] border-gray-300 rounded-full"></div>
        {/* 회전하는 검정색 1/4 도넛 */}
        <div className="absolute top-0 left-0 w-full h-full animate-spin">
          <div className="w-full h-full border-[6px] opacity-75 border-transparent border-t-green200 border-r-green400 border-l-green400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const ProfileImage = ({ url }: Props) => {
  const [modify, setModify] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { user } = useUserProfile();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImagePostMutation = useMutation({
    mutationKey: ['user', 'profileImage'],
    mutationFn: (newProfileImage: File) => uploadProfileImage(newProfileImage),
  });

  const handleFileChange = (newProfileImage: File) => {
    uploadImagePostMutation.mutate(newProfileImage, {
      onSuccess: (data: { profileImageUrl: string }) => {
        setUploadedImage((prev) => [...prev, data.profileImageUrl]),
          url(data.profileImageUrl),
          queryClient.invalidateQueries({ queryKey: ['user'] });
      },
    });
  };

  function handlePenClick(e: React.ChangeEvent<HTMLInputElement>) {
    let selectedFiles = [] as File[];
    if (e.type === 'change') {
      const inputEl = e.target as HTMLInputElement;
      selectedFiles = inputEl.files ? Array.from(inputEl.files) : [];
    }
    const addFile = selectedFiles?.[0];
    if (addFile) {
      setModify(true);
      handleFileChange(addFile);
    }
  }

  const renderProfileImage = () => {
    if (!user) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner />
        </div>
      );
    }
    return modify ? (
      <>
        {uploadedImage.map((file) => (
          <Image
            src={file}
            fill
            alt={file}
            placeholder="blur"
            blurDataURL={file}
            object-fit="contain"
            key={`${file}_key`}
          />
        ))}
      </>
    ) : (
      <Image
        src={
          user.profileImageUrl
            ? user.profileImageUrl
            : '/images/Image_default_profile_image.png'
        }
        fill
        alt="프로필 사진"
        placeholder="blur"
        blurDataURL={
          user.profileImageUrl
            ? user.profileImageUrl
            : '/images/Image_default_profile_image.png'
        }
        object-fit="contain"
      />
    );
  };

  return (
    <div onClick={() => inputRef.current?.click()} className="relative">
      <div
        className="w-[160px] h-[160px] rounded-[160px] bg-gray200 overflow-hidden relative"
        style={{ boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)' }}
      >
        {renderProfileImage()}
      </div>
      <Image
        width={44}
        height={44}
        src="/icons/penIcon.svg"
        alt="penIcon"
        className="absolute bottom-0 right-0 z-10"
      />
      <input
        id="file-input"
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handlePenClick}
      />
    </div>
  );
};

export default ProfileImage;
