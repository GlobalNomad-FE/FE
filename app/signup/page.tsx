'use client';

import Input from '@/components/commons/Input';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

const SignUp = () => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex w-full flex-col items-center pt-20">
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
      <form className="mt-10 flex flex-col gap-4">
        <Input type="email" />
        <Input type="text" placeholder="닉네임을 입력해 주세요" />
        <Input type="password" onChange={handlePasswordChange} />
        <Input
          type="passwordCheck"
          password={password}
          placeholder="비밀번호를 한번 더 입력해 주세요"
        />
        <button
          type="submit"
          className="h-12 rounded-md bg-gray-400 text-base font-bold text-white"
        >
          회원가입 하기
        </button>
      </form>
      <div className="mt-8 flex gap-2 text-base font-normal text-gray800">
        <p>이미 회원이신가요?</p>
        <Link
          href="/signin"
          className="text-base font-normal text-green200 underline"
        >
          로그인
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
