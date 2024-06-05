'use client'; // Ensure this is the very fir
import { useState, ChangeEvent } from 'react';
import { z } from 'zod';
import Image from 'next/image';
import classNames from 'classnames';

interface Props {
  type: 'email' | 'password' | 'text' | 'passwordCheck'; // email, password, text (nickname), passwordCheck
  password?: string; // 비밀번호 확인의 경우 기존 비밀번호가 담김
  placeholder?: string; // placeholder text
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // onChange 핸들러
}

// 이메일 스키마 정의
const EmailSchema = z.string().email();

/**
 * 이메일과 비밀번호를 받는 인풋박스입니다.
 * @param type email, password, text (nickname), passwordCheck
 * @param password 비밀번호 확인의 경우 기존 비밀번호. 미존재시 null
 * @param placeholder 인풋박스의 플레이스홀더 텍스트
 * @param onChange 인풋박스의 onChange 핸들러
 * @returns Input
 */
const Input = ({ type, password = '', placeholder = '', onChange }: Props) => {
  const [errorMessageColor, setErrorMessageColor] = useState('gray500');
  const [errorMessage, setErrorMessage] = useState('');

  const labelName =
    type === 'email'
      ? '이메일'
      : type === 'password'
      ? '비밀번호'
      : type === 'passwordCheck'
      ? '비밀번호 확인'
      : '닉네임';

  const defaultPlaceholder =
    type === 'email'
      ? '이메일을 입력해 주세요'
      : type === 'password' || type === 'passwordCheck'
      ? '비밀번호를 입력해주세요'
      : '닉네임을 입력해주세요';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    setErrorMessage('');
    setErrorMessageColor('gray500');
    if (type === 'email') {
      try {
        const validatedEmail = EmailSchema.parse(e.target.value);
        console.log('Valid email:', e.target.value);
        console.log('Valid email:', validatedEmail);
      } catch (error) {
        setErrorMessage('잘못된 이메일입니다.');
        setErrorMessageColor('red100');
      }
    }
    if (type === 'passwordCheck' && password && password !== e.target.value) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      setErrorMessageColor('red100');
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.length < 8 &&
      (type === 'password' || type === 'passwordCheck')
    ) {
      setErrorMessage('8자 이상 입력해주세요.');
      setErrorMessageColor('red100');
      return;
    }
    if (type === 'passwordCheck' && password && password !== e.target.value) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      setErrorMessageColor('red100');
    }
    if (type === 'text' && e.target.value.length < 2) {
      setErrorMessage('닉네임은 2글자 이상만 사용할 수 있습니다.');
      setErrorMessageColor('red100');
    }
  };

  const [visibility, setVisibility] = useState(true);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <label className="flex flex-col font-normal text-base gap-[12.8px] relative w-[560px] text-[16px] ">
      {labelName}
      <input
        type={
          type === 'email' ||
          (type === 'password' && visibility) ||
          (type === 'passwordCheck' && visibility)
            ? type
            : 'text'
        }
        className={classNames(
          'w-[560px] h-12 text-[16px] px-5 py-4 bg-white rounded-md border',
          {
            'border-gray500': errorMessageColor === 'gray500',
            'border-red100': errorMessageColor === 'red100',
          },
        )}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder || defaultPlaceholder}
      />
      {(type === 'password' || type === 'passwordCheck') && (
        <Image
          alt="비밀번호 눈 아이콘"
          className="absolute pt-[50px] right-3 cursor-pointer "
          src={`/icons/btn_visibility_${visibility ? 'off' : 'on'}.svg`}
          onClick={handleVisibility}
          width={24}
          height={24}
        />
      )}
      <div
        className={classNames('text-[16px]', {
          'text-gray500': errorMessageColor === 'gray500',
          'text-red100': errorMessageColor === 'red100',
        })}
      >
        {errorMessage}
      </div>
    </label>
  );
};

export default Input;
