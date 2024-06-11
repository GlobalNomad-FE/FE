import instance from '../axios';

const getUserInfo = async (): Promise<any> => {
  const response = await instance.get('/users/me');
  return response.data;
};

export default getUserInfo;
