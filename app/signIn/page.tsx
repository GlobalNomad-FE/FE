import Input from '@/components/commons/Input';
import Link from 'next/link';
import Image from 'next/image';

const SignIn = () => {
  return (
    <div className="flex w-full flex-col items-center pt-24">
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

export default SignIn;
