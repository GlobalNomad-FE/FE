// src/hooks/useUserProfile.ts
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getUserInfo from '@/apis/user/getUserInfo';
import uploadProfileImage from '@/apis/user/uploadProfileImage';
import editMyInfo, { EditMyInformationType } from '@/apis/user/editMyInfo';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export interface UserInformation {
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
      toast.error('Failed to upload image:');
    }
  };

  const { mutate: editUserProfile } = useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    EditMyInformationType
  >({
    mutationFn: editMyInfo,
    onSuccess: () => {
      toast.success('수정이 완료 되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
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
