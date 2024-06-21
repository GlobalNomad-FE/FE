import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getUserInfo from '@/apis/user/getUserInfo';
import uploadProfileImage from '@/apis/user/uploadProfileImage';
import editMyInfo, { EditMyInformationType } from '@/apis/user/editMyInfo';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/Authcontext';

export interface UserInformation {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

const useUserProfile = () => {
  const { user: authUser } = useAuth(); // AuthContext에서 사용자 정보를 가져옴
  const queryClient = useQueryClient();
  const { data, isSuccess, isError } = useQuery<UserInformation>({
    queryKey: ['user'],
    queryFn: getUserInfo,
    enabled: !!authUser,
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

  useEffect(() => {
    if (isError) {
      // 로그인 정보가 없는 경우 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }
  }, [isError]);

  return {
    user: data,
    uploadedImage,
    setUploadedImage,
    handleFileChange,
    editUserProfile,
  };
};

export default useUserProfile;
