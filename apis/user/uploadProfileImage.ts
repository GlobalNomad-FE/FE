import instance from '../axios';

const uploadProfileImage = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await instance.post('/users/me/image', formData);
    return response.data;
  } catch (error) {
    console.error('Error Upload Image');
    throw error;
  }
};

export default uploadProfileImage;
