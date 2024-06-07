import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

const getToken = () => {
  // 브라우저(윈도우객체)가 있을때만 실행
  if (typeof window !== undefined) {
    const token = window.localStorage.getItem('accessToken');
    return token;
  }
  return '';
};

instance.interceptors.request.use((config) => {
  const modifiedConfig = { ...config };
  modifiedConfig.headers.Authorization = `Bearer ${getToken()}`;
  return modifiedConfig;
});

instance.interceptors.request.use((config) => {
  if (config.headers.Authorization) return config;

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      const res = await instance.post(
        '/auth/tokens',
        {},
        {
          headers: { Authorization: `Bearer ${refreshToken}`, _retry: true },
        },
      );
      const accessToken = res.data.accessToken;
      const nextRefreshToken = res.data.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', nextRefreshToken);
      originalRequest._retry = true;

      return instance(originalRequest);
    }
    return Promise.reject(error);
  },
);
export default instance;
