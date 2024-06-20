import instance from '../axios';

export interface EditMyInformationType {
  nickname: string;
  profileImageUrl: string | null;
  newPassword: string;
}

class EditMyInformationError extends Error {
  status: number;

  constructor(status: number) {
    super('EditInforMation Error');
    this.status = status;
    this.name = 'EditInformationError';
  }
}

const editMyInfo = async ({
  nickname,
  profileImageUrl,
  newPassword,
}: EditMyInformationType): Promise<any> => {
  const response = await instance.patch('/users/me', {
    nickname,
    profileImageUrl,
    newPassword,
  });

  if (response.status !== 200) {
    throw new EditMyInformationError(response.status);
  }

  return response.data;
};

export default editMyInfo;
