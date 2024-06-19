import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { EditInformationErrorMessageType } from '@/types/EditInformationErrorMessageType';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyPageInputBox from './MyPageInputBox';
import useUserProfile from '@/hooks/useUserProfile';

const MyPageForm = () => {
  const {
    user,
    uploadedImage,
    setUploadedImage,
    handleFileChange,
    editUserProfile,
  } = useUserProfile();

  const [inputs, setInputs] = useState({
    nickname: '',
    email: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [editInformationErrorMessage, setEditInformationErrorMessage] =
    useState<EditInformationErrorMessageType>({
      nicknameErrorMessage: null,
      passwordErrorMessage: null,
      passwordConfirmErrorMessage: null,
      unexpectedErrorMessage: null,
    });
  const PASSWORD_MIN_LENGTH = 8;

  useEffect(() => {
    if (user) {
      setInputs({
        nickname: user.nickname,
        email: user.email,
        newPassword: '',
        newPasswordConfirm: '',
      });
    }
  }, [user]);

  const { nickname, email, newPassword, newPasswordConfirm } = inputs;
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const newPasswordConfirmFocusOut = () => {
    if (inputs.newPassword !== inputs.newPasswordConfirm) {
      setEditInformationErrorMessage((prev) => ({
        ...prev,
        passwordErrorMessage: '비밀번호가 일치하지 않습니다.',
        passwordConfirmErrorMessage: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setEditInformationErrorMessage((prev) => ({
        ...prev,
        passwordErrorMessage: null,
        passwordConfirmErrorMessage: null,
      }));
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profileImageUrl = uploadedImage ?? user?.profileImageUrl ?? null;
    if (newPassword.length > 0 && newPassword.length < PASSWORD_MIN_LENGTH) {
      setEditInformationErrorMessage((prev) => ({
        ...prev,
        passwordErrorMessage: '8자 이상 작성해 주세요.',
        passwordConfirmErrorMessage: '8자 이상 작성해 주세요.',
      }));
      return;
    }
    if (newPasswordConfirm.length === 0) {
      setEditInformationErrorMessage((prev) => ({
        ...prev,
        passwordConfirmErrorMessage: '비밀번호 확인값을 입력해주세요.',
      }));
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setEditInformationErrorMessage((prev) => ({
        ...prev,
        passwordErrorMessage: '비밀번호가 일치하지 않습니다.',
        passwordConfirmErrorMessage: '비밀번호가 일치하지 않습니다.',
      }));
      return;
    }

    setEditInformationErrorMessage((prev) => ({
      ...prev,
      passwordConfirmErrorMessage: null,
      passwordErrorMessage: null,
    }));
    try {
      await editUserProfile({
        nickname,
        profileImageUrl,
        newPassword,
      });
      toast.success('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      toast.error('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col text-[#1b1b1b] gap-4 px-6">
      <div className="flex justify-between font-bold">
        <div className="text-[32px]">내정보</div>
        <button
          type="submit"
          form="myPageForm"
          className="text-[16px] text-white bg-[#112211] px-8 py-[10px] rounded cursor-pointer"
        >
          저장하기
        </button>
      </div>

      <form
        className="flex flex-col gap-8 width-[100%] tablet:w-[429px] mobile:w-[343px] px-[24px] mobile:px-4"
        noValidate
        onSubmit={onSubmit}
        id="myPageForm"
      >
        <MyPageInputBox
          inputName="nickname"
          onChangeInput={onChangeInput}
          value={nickname}
          labelName="닉네임"
          inputType="text"
          editInformationErrorMessage={editInformationErrorMessage}
          setEditInformationErrorMessage={setEditInformationErrorMessage}
        />
        <MyPageInputBox
          inputName="email"
          value={email}
          labelName="이메일"
          inputType="email"
        />
        <MyPageInputBox
          inputName="newPassword"
          onChangeInput={onChangeInput}
          value={newPassword}
          labelName="비밀번호"
          inputType="password"
          editInformationErrorMessage={editInformationErrorMessage}
          setEditInformationErrorMessage={setEditInformationErrorMessage}
        />
        <MyPageInputBox
          inputName="newPasswordConfirm"
          onChangeInput={onChangeInput}
          value={newPasswordConfirm}
          labelName="비밀번호 재입력"
          inputType="password"
          editInformationErrorMessage={editInformationErrorMessage}
          setEditInformationErrorMessage={setEditInformationErrorMessage}
          onFocusOut={newPasswordConfirmFocusOut}
        />
      </form>
    </div>
  );
};

export default MyPageForm;
