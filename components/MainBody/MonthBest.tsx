import React from 'react';
import Image from 'next/image';
import useGetActivities from '@/apis/activities/useGetActivities';

const MonthBest = () => {
  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: null,
    size: 1,
    sort: 'most_reviewed',
  });

  return (
    <div className="flex justify-center">
      <div className="relative mt-[70px] w-full mobile:h-[240px] h-[550px]">
        <div className="absolute bg-custom-gradient w-full h-full z-10" />
        {isError && (
          <div className="flex justify-center">
            데이터를 불러오는데 실패하였습니다.
            <br />
            다시 시도해주세요.
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center">
            <Image
              src="/icons/spinner.svg"
              width={150}
              height={150}
              alt="loading icon"
            />
          </div>
        ) : (
          data && (
            <Image
              src={data?.activities[0].bannerImageUrl}
              alt={data?.activities[0].title}
              fill
              objectFit="cover"
            />
          )
        )}
      </div>
      <div className="absolute max-w-[1268px] w-full mx-auto font-bold font-white z-10 mobile:px-[24px] mobile:top-[170px] px-[32px] tablet:top-[400px] top-[380px]">
        <h1 className="w-full mobile:text-[24px] mobile:max-h-[36px] tablet:text-[54px] tablet:max-h-[81px] text-[68px] max-h-[102px] overflow-y-hidden">
          {isLoading ? '로딩 중입니다..' : data?.activities[0].title}
        </h1>
        <h2 className="mobile:text-[14px] tablet:text-[20px] text-[24px]">
          사이트 인기 체험 BEST 🔥
        </h2>
      </div>
    </div>
  );
};

export default MonthBest;
