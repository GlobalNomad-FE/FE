import { ChangeEvent, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import uploadProfileImage from '@/apis/user/uploadProfileImage';
import Image from 'next/image';
import { toast } from 'react-toastify';

const InformationNoImage = ({
  nickname,
  uploadedImage = null,
  setUploadedImage = () => null,
}: {
  nickname: string;
  uploadedImage: string | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const nicknameInitial = nickname[0];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      setUploadedImage(data.profileImageUrl);
    },
    onError: () => {
      toast.error('Failed to upload image:');
    },
  });

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      mutation.mutate(file);
    }
  };

  return (
    <div className="relative w-40 h-40 bg-slate-400 rounded-full flex items-center justify-center text-white">
      {uploadedImage ? (
        <Image
          src={uploadedImage}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span>{nicknameInitial}</span>
      )}

      <div
        onClick={handleFileInputClick}
        className="absolute p-[10px] w-11 h-11 inline-flex items-start top-[115px] right-3 z-10 rounded-full bg-green-80 cursor-pointer"
      >
        <Image width={24} height={24} src="/icons/penIcon.svg" alt="penIcon" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={onChangeImage}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default InformationNoImage;
