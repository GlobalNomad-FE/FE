'use client'; // Ensure this is the very fir
import { useState, ChangeEvent } from 'react';
import { z } from 'zod';
import Image from 'next/image';

interface Props {
  type: 'text' | 'password' | 'email' | 'number' | 'time';
  password?: string; //비밀번호 확인의 경우 기존 비밀번호가 담김
  isError?: boolean;
  errorMessage?: string;
}

// 이메일 스키마 정의
const EmailSchema = z.string().email();

/**
 * 이메일과 비밀번호를 받는 인풋박스입니다.
 * @param type email, password
 * @param password 비밀번호 확인의 경우 기존 비밀번호. 미존재시 null
 * @returns Input
 */
const Input = ({ type, password = '' }: Props) => {
  const [errorMessageColor, setErrorMessageColor] = useState('gray500');

  const labelName = type === 'email' ? '이메일' : '비밀번호';
  const placeholder =
    type === 'email' ? '이메일을 입력해 주세요' : '비밀번호를 입력해주세요';
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 8 && type === 'password') {
      setErrorMessageColor('red100');
      return setErrorMessage('8자 이상 입력해주세요');
    }
    //TODO : 비밀번호 확인 시 비밀번호가 다른 경우, 오류 발생
    if (password && password !== e.target.value) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      setErrorMessageColor('red100');
    }
  };

  const [visibility, setVisibility] = useState(true);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <label className="flex flex-col font-normal text-base gap-[8px] relative w-[560px] text-[16px] ">
      {labelName}
      <input
        type={
          type === 'email' || (type === 'password' && visibility)
            ? type
            : 'text'
        }
        className={`w-[560px] h-12 text-[16px] px-5 py-4 bg-white rounded-md border border-${errorMessageColor}`}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <Image
          alt="비밀번호 눈 아이콘"
          className="absolute pt-[44px] right-3 cursor-pointer "
          src={`/icons/btn_visibility_${visibility ? 'off' : 'on'}.svg`}
          onClick={handleVisibility}
          width={24}
          height={24}
        />
      )}
      <div className={`text-${errorMessageColor} text-[16px]`}>
        {errorMessage}
      </div>
    </label>
  );
};

export default Input;
