// src/hooks/useUserProfile.ts
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getUserInfo from '@/apis/user/getUserInfo';
import uploadProfileImage from '@/apis/user/uploadProfileImage';
import editMyInfo, { EditMyInformationType } from '@/apis/user/editMyInfo';
import { AxiosError } from 'axios';

interface UserInformation {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const useUserProfile = () => {
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery<UserInformation>({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileChange = async (file: File) => {
    try {
      const imageData = await uploadProfileImage(file);
      setUploadedImage(imageData.profileImageUrl);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const { mutate: editUserProfile } = useMutation<
    unknown,
    AxiosError,
    EditMyInformationType
  >({
    mutationFn: editMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: AxiosError) => {
      console.error('Failed to edit user info:', error);
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUploadedImage(data.profileImageUrl);
    }
  }, [isSuccess, data]);

  return {
    user: data,
    uploadedImage,
    setUploadedImage,
    handleFileChange,
    editUserProfile,
  };
};

export default useUserProfile;