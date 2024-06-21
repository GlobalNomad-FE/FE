import instance from './axios';
import { toast } from 'react-toastify';

export async function uploadImagePost(imageFile: File) {
  const formData = new FormData();

  formData.append('image', imageFile);

  try {
    const response = instance.post('/activities/image', formData);
    return (await response).data;
  } catch (error) {
    toast.error('Error Upload Image');
    throw error;
  }
}
