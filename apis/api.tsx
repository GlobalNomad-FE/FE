import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/4-13',
});

export async function getActivities(page: number, size: number) {
  const response = await instance.get('/activities', {
    params: {
      method: 'offset',
      page,
      size,
    },
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ2LCJ0ZWFtSWQiOiI0LTEzIiwiaWF0IjoxNzE3NTgwNjU0LCJleHAiOjE3MTc1ODI0NTQsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.LlYf4ydJOUCni1Hy9oy_jK7UoFT5F914ax7igY-jpfg`,
    },
  });
  return response.data;
}
