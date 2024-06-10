'use client';

import React from 'react';
import LoginInput from '@/components/commons/LoginInput';
import Link from 'next/link';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { USER_INPUT_VALIDATION } from '@/utils/user';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FormValues } from '@/apis/auth/auth.type';
import { auth } from '@/apis/auth/auth';

const { email, password, nickname, passwordConfirm } = USER_INPUT_VALIDATION;

interface ErrorMessage {
  message: string;
}

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
  nicknameRules: {
    required: nickname.errorMessage.empty,
    pattern: {
      value: nickname.regex,
      message: nickname.errorMessage.invalid,
    },
  },
};

const SignUp = () => {
  const router = useRouter();
  const { formState, register, handleSubmit, getValues } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const signUpMutation = useMutation({
    mutationFn: (data: FormValues) => auth.signup(data),
    mutationKey: ['signUp'],
    onSuccess: () => {
      router.push('/signin');
    },
    onError: (error: AxiosError<ErrorMessage>) => {
      if (error.response && error.response.status >= 400) {
        console.log('AxiosError');
        return;
      }
      console.error('AxiosError', error);
    },
  });

  const { isValid, errors } = formState;

  const onSubmit = (data: FormValues) => {
    signUpMutation.mutate(data);
  };

  return (
    <div className="flex w-full flex-col items-center pt-40 ">
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
        className="mt-10 flex w-[640px] flex-col gap-7"
      >
        <LoginInput
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          type="email"
          isError={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email', rules.emailRules)}
        />
        <LoginInput
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          isError={!!errors.nickname}
          errorMessage={errors.nickname?.message}
          {...register('nickname', rules.nicknameRules)}
        />
        <LoginInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          isError={!!errors.password}
          errorMessage={errors.password?.message}
          {...register('password', rules.passwordRules)}
        />
        <LoginInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          isError={!!errors.passwordConfirm}
          errorMessage={errors.passwordConfirm?.message}
          {...register('passwordConfirm', {
            validate: {
              notMatch: (value) => {
                const { password } = getValues();
                return password === value || '비밀번호가 일치하지 않습니다.';
              },
            },
          })}
        />
        <button
          type="submit"
          disabled={!isValid}
          className={`h-12 rounded-md text-base font-bold text-white ${
            isValid ? 'bg-nomad-black' : 'bg-gray-400'
          }`}
        >
          회원가입 하기
        </button>
      </form>
      <div className="mt-8 flex gap-2 text-base font-normal text-gray800">
        <p>회원이신가요?</p>
        <Link
          href="/signup"
          className="text-base font-normal text-green200 underline"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default SignUp;