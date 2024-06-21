// pages/login.tsx
'use client';

import React, { useState, useEffect } from 'react';
import LoginInput from '@/components/commons/LoginInput';
import Link from 'next/link';
import { FormValues } from '@/apis/auth/auth.type';
import { useForm } from 'react-hook-form';
import { USER_INPUT_VALIDATION } from '@/utils/user';
import { useAuth } from '@/context/Authcontext';
import Image from 'next/image';
import BasePopup from '@/components/commons/Popups/BasePopup';
import { useRouter } from 'next/navigation';

const { email, password } = USER_INPUT_VALIDATION;

const rules = {
  emailRules: {
    required: email.errorMessage.empty,
    pattern: {
      value: email.regex,
      message: email.errorMessage.invalid,
    },
  },
  passwordRules: {
    required: password.errorMessage.empty,
    pattern: {
      value: password.regex,
      message: password.errorMessage.invalid,
    },
    minLength: {
      value: 8,
      message: password.errorMessage.minLength,
    },
  },
};

const Login = () => {
  const { signIn, user } = useAuth();
  const { formState, register, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    if (user) {
      // 사용자 정보가 업데이트되면 루트 페이지로 리다이렉트
      // 이때 페이지가 새로고침됨
      window.location.href = '/';
    }
  }, [user]);

  const handleOpenPopup = (message: string) => {
    setPopupMessage(message);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const { isValid, errors } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn(data);
    } catch (error) {
      handleOpenPopup('아이디 또는 비밀번호를 잘못 입력했습니다.');
    }
  };

  return (
    <div className="flex w-full flex-col items-center pt-40 text-black200">
      <div>
        <Link href="/">
          <Image
            src="/icons/logo_big.svg"
            width={340}
            height={192}
            alt="글로벌노마드 로고 이미지"
          />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-7 w-full max-w-4xl  lg:px-32 md:px-22 sm:px-16 px-6"
      >
        <LoginInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          isError={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email', rules.emailRules)}
        />
        <LoginInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          isError={!!errors.password}
          errorMessage={errors.password?.message}
          {...register('password', rules.passwordRules)}
        />
        <button
          type="submit"
          disabled={!isValid}
          className={`h-12 rounded-md text-base font-bold text-white ${
            isValid ? 'bg-nomad-black' : 'bg-gray-400'
          }`}
        >
          로그인 하기
        </button>
      </form>
      <div className="mt-8 flex gap-2 text-base font-normal text-gray800">
        <p>회원이 아니신가요?</p>
        <Link
          href="/signup"
          className="text-base font-normal text-green200 underline"
        >
          회원가입
        </Link>
      </div>

      <BasePopup isOpen={openPopup} closePopup={handleClosePopup}>
        {popupMessage}
      </BasePopup>
    </div>
  );
};

export default Login;
