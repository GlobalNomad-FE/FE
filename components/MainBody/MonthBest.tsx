import React from 'react';
import Image from 'next/image';

const MonthBest = () => {
  return (
    <div className="flex justify-center">
      <div className="relative mt-[70px] w-full mobile:h-[240px] h-[550px]">
        <div className="absolute bg-custom-gradient w-full h-full z-10" />
        <Image
          src="/images/스트릿댄스.png"
          alt="스트릿댄스"
          fill
          objectFit="cover"
        />
      </div>
      <div className="absolute max-w-[1268px] w-full mx-auto font-bold font-white z-10 mobile:px-[24px] mobile:top-[145px] px-[32px] top-[230px]">
        <h1 className="mobile:text-[24px] mobile:max-w-[200px] tablet:text-[54px] tablet:max-w-[440px] text-[68px] max-w-[502px]">
          함께 배우면 즐거운 스트릿 댄스
        </h1>
        <h2 className="mobile:text-[14px] tablet:text-[20px] text-[24px]">
          1월의 인기 체험 BEST 🔥
        </h2>
      </div>
    </div>
  );
};

export default MonthBest;
