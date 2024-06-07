import { FormValues, PostAuthLoginReq, PostAuthLoginRes } from './auth.type';
import { instance } from '../instance';

export const auth = {
  signup: async (userData: FormValues) => {
    const response = await instance.post('/users', userData);
    return response.data;
  },
  signin: async (userData: FormValues) => {
    const response = await instance.post('/auth/login', userData);
    return response.data;
  },

  getImageUrl: async (imageUrl: FormData) => {
    const response = await instance.post('/users/me/image', imageUrl);
    return response.data;
  },
  tokensUpdate: async (refreshToken: string) => {
    const response = await instance.post(
      'auth/tokens',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },
  getUser: async () => {
    const response = await instance.get('/users/me');
    return response.data;
  },
};
