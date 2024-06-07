const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ2LCJ0ZWFtSWQiOiI0LTEzIiwiaWF0IjoxNzE3NzM5NTYxLCJleHAiOjE3MTg5NDkxNjEsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.arOO-urUgGHYxA2oQi48wQ7752KjRBGbT2M5RoUO7-I';

export async function uploadImagePost(imageFile: File) {
  const formData = new FormData();

  formData.append('image', imageFile);

  const response = await fetch(`${BASE_URL}/activities/image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload the image.');
  }
  return await response.json();
}
