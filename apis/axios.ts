import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  if (config.headers.Authorization) return config;

  // const accessToken = localStorage.getItem('accessToken');
  //TODO: 임시토큰
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ2LCJ0ZWFtSWQiOiI0LTEzIiwiaWF0IjoxNzE3NzM5NTYxLCJleHAiOjE3MTg5NDkxNjEsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.arOO-urUgGHYxA2oQi48wQ7752KjRBGbT2M5RoUO7-I';
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
