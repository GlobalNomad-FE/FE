import { toast } from 'react-toastify';
import instance from '../axios';

const uploadProfileImage = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await instance.post('/users/me/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    toast.error('Error Upload Image');
    throw error;
  }
};

export default uploadProfileImage;
