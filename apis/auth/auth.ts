import { FormValues, PostAuthLoginReq, PostAuthLoginRes } from './auth.type';
import { instance } from '../instance';

export const auth = {
  signIn: async (userData: FormValues) => {
    const response = await instance.post('/auth/signIn', userData);
    return response.data;
  },
  signUp: async (userData: FormValues) => {
    const response = await instance.post('/users', userData);
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
