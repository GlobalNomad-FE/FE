import Input from '@/components/commons/Input';
import Link from 'next/link';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { USER_INPUT_VALIDATION } from '@/utils/user';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const { email, password, nickname, passwordConfirm } = USER_INPUT_VALIDATION;

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
    mutationFn: (data: FormValues) => auth.signUp(data),
    mutationKey: ['signUp'],
    onSuccess: () => {
      router.push('/login');
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
      <form className="mt-10 flex flex-col gap-6">
        <Input type={'email'} />
        <Input type={'password'} />
        <button
          type="submit"
          className=" h-12 rounded-md bg-gray-400 text-base font-bold text-white 
          "
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
    </div>
  );
};

export default SignUp;
