import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-13',
});

export async function getActivities(page: number, size: number) {
  const response = await instance.get('/activities', {
    params: {
      method: 'offset',
      page,
      size,
    },
  });
  return response.data;
}
