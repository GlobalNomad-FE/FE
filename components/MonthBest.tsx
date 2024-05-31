import React from 'react';
import Image from 'next/image';
import useMediaQuery from '@/hooks/useMediaQuery';

const MonthBest = () => {
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="flex justify-center">
      <div
        className={`relative mt-[70px] w-full ${
          isMobile ? 'h-[240px]' : 'h-[550px]'
        }`}
      >
        <div className="absolute bg-custom-gradient w-full h-full z-10"></div>
        <Image
          src="/images/스트릿댄스.png"
          alt="스트릿댄스"
          fill
          objectFit="cover"
        />
      </div>
      <div
        className={`absolute max-w-[1268px] w-full mx-auto font-bold font-white z-10 ${
          isMobile ? 'px-[24px] top-[145px]' : 'px-[32px] top-[230px]'
        }`}
      >
        <h1
          className={
            isMobile
              ? 'text-[24px] max-w-[200px]'
              : isTablet
              ? 'text-[54px] max-w-[440px]'
              : 'text-[68px] max-w-[502px]'
          }
        >
          함께 배우면 즐거운 스트릿 댄스
        </h1>
        <h2
          className={
            isMobile ? 'text-[14px]' : isTablet ? 'text-[20px]' : 'text-[24px]'
          }
        >
          1월의 인기 체험 BEST 🔥
        </h2>
      </div>
    </div>
  );
};

export default MonthBest;
