import instance from '../axios';

interface UserInformation {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const getUserInfo = async (): Promise<UserInformation> => {
  const response = await instance.get('/users/me');
  return response.data;
};

export default getUserInfo;
