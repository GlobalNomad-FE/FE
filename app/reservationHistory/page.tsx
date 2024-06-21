'use client';
import Image from 'next/image';
import Calendar from '@/components/reservationHistory/Calendar';
import SelectBox from '@/components/reservationHistory/SelectBox';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import useGetMyActivities from '@/apis/my-activity-reservation-status/useGetMyActivities';
import React, { useState } from 'react';

export default function Page() {
  //내 체험 리스트
  const { data, isLoading, isError } = useGetMyActivities({
    method: 'cursor',
    cursorId: null,
    size: 15,
  });

  const myActivities = data?.activities;

  const [selectedActivityId, setSelectedActivityId] = useState<
    number | undefined
  >();

  const handleSelect = (id: number) => {
    setSelectedActivityId(id); //선택한 체험의 id
  };

  return (
    <>
      <main className="flex justify-center min-h-[100vh] max-h-[100%] bg-gray50 text-black200 pt-[142px] tablet:pt-[94px] mobile:pt-[94px] pb-[72px] px-6 mobile:px-4">
        <div className="w-[1200px] flex gap-6">
          <SideNavigationMenu />
          <div className="w-[791px] tablet:w-[429px] mobile:w-[326px] text-[32px] mb-[142px] tablet:mb-[128px]">
            <p className="w-[791px] mobile:w-full font-bold">예약 현황</p>
            {myActivities ? (
              <>
                <SelectBox
                  myActivities={myActivities}
                  onSelect={handleSelect}
                />
                <Calendar selectedActivityId={selectedActivityId} />
              </>
            ) : (
              <div className="h-[1133px] pt-[111px] tablet:pt-[100px] mobile:pt-[80px] flex flex-col items-center">
                <div className="w-[130px] tablet:w-[105px] mobile:w-[105px] h-[177px] tablet:h-[148px] mobile:h-[148px] overflow-hidden relative">
                  <Image
                    src="/icons/empty.svg"
                    alt="예약 현황 미존재를 나타내는 이미지"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p className="font-medium text-gray500 text-[24px] pt-[50px] tablet:pt-[36px]">
                  아직 등록한 체험이 없어요.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
