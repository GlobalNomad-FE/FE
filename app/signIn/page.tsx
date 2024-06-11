import React from 'react';
import LoginInput from '@/components/commons/LoginInput';
import Link from 'next/link';
import { FormValues } from '@/apis/auth/auth.type';
import { useForm } from 'react-hook-form';
import { USER_INPUT_VALIDATION } from '@/utils/user';
import { useAuth } from '@/context/Authcontext';
import EmptyLayout from '@/layouts/EmptyLayout';

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
  const { signIn } = useAuth();

  const { formState, register, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const { isValid, errors } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      await signIn(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center pt-24">
      <div>
        <Link href="/">
          <img src="/icons/logo.svg" alt="글로벌노마드 로고 이미지" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex w-loginForm flex-col gap-7"
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
            isValid ? 'bg-gnDarkGreen' : 'bg-gray-400'
          }`}
        >
          로그인 하기
        </button>
      </form>
      <div className="mt-8 flex gap-2 text-base font-normal text-gnGray800">
        <p>회원이 아니신가요?</p>
        <Link
          href="/signUp"
          className="text-base font-normal text-gnDarkGreen underline"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;

Login.getLayout = function getLayout(page: React.ReactNode) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
