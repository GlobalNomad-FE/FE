import { ChangeEvent } from 'react';
import { EditInformationErrorMessageType } from '@/types/EditInformationErrorMessageType';
import MyPageInputLabel from './MypageInputLabel';

interface MyPageInputBoxProps {
  inputName: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelName: string;
  inputType: string;
  editInformationErrorMessage?: EditInformationErrorMessageType | null;
  setEditInformationErrorMessage?: React.Dispatch<
    React.SetStateAction<EditInformationErrorMessageType>
  >;
  onFocusOut?: () => void;
}

const MyPageInputBox = ({
  inputName,
  onChangeInput,
  value,
  labelName,
  inputType,
  editInformationErrorMessage,
  setEditInformationErrorMessage,
  onFocusOut,
}: MyPageInputBoxProps) => {
  let borderColorClass = '';

  const onClickInput = () => {
    if (setEditInformationErrorMessage) {
      if (inputName === 'nickname') {
        setEditInformationErrorMessage((prev) => ({
          ...prev,
          nicknameErrorMessage: null,
        }));
      } else if (inputName === 'newPassword') {
        setEditInformationErrorMessage((prev) => ({
          ...prev,
          passwordErrorMessage: null,
        }));
      } else if (inputName === 'newPasswordConfirm') {
        setEditInformationErrorMessage((prev) => ({
          ...prev,
          passwordConfirmErrorMessage: null,
        }));
      }
    }
  };

  if (
    inputName === 'nickname' &&
    editInformationErrorMessage?.nicknameErrorMessage
  ) {
    borderColorClass = 'border-red-40';
  } else if (
    inputName === 'newPassword' &&
    editInformationErrorMessage?.passwordErrorMessage
  ) {
    borderColorClass = 'border-red-40';
  } else if (
    inputName === 'newPasswordConfirm' &&
    editInformationErrorMessage?.passwordConfirmErrorMessage
  ) {
    borderColorClass = 'border-red-40';
  }

  return (
    <div className="flex flex-col w-[792px] gap-4">
      <MyPageInputLabel labelName={labelName} />
      <input
        className={`w-full py-4 pl-4 border border-gray-50 rounded ${borderColorClass}`}
        type={inputType}
        id={inputName}
        onChange={onChangeInput}
        value={value}
        name={inputName}
        onBlur={inputName === 'newPasswordConfirm' ? onFocusOut : undefined}
        onClick={onClickInput}
      />
      {inputName === 'nickname' &&
        editInformationErrorMessage?.nicknameErrorMessage && (
          <div className="text-red-40 text-xs ml-1">
            {editInformationErrorMessage.nicknameErrorMessage}
          </div>
        )}

      {inputName === 'newPassword' &&
        editInformationErrorMessage?.passwordErrorMessage && (
          <div className="text-red-40 text-xs ml-1">
            {editInformationErrorMessage.passwordErrorMessage}
          </div>
        )}
      {inputName === 'newPasswordConfirm' &&
        editInformationErrorMessage?.passwordConfirmErrorMessage && (
          <div className="text-red-40 text-xs ml-1">
            {editInformationErrorMessage.passwordConfirmErrorMessage}
          </div>
        )}
    </div>
  );
};

export default MyPageInputBox;
