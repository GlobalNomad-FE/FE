'use client';
import Image from 'next/image';
import Gnb from '@/components/commons/gnb/gnb';
import Footer from '@/components/commons/Footer';
import Calendar from '@/components/reservationHistory/Calendar';
import SelectBox from '@/components/reservationHistory/SelectBox';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import useGetMyActivities from '@/apis/my-activitie-reservation-status/useGetMyActivities';
import React, { useState } from 'react';

export default function Page() {
  //내 체험 리스트
  const { data, isLoading, isError } = useGetMyActivities({
    method: 'cursor',
    cursorId: null,
    size: 15,
  });

  const myActivityes = data?.activities;

  const [selectedActivityId, setSelectedActivityId] = useState<number>(0);

  const handleSelect = (id: number) => {
    setSelectedActivityId(id); //선택한 체험의 id셋팅
  };

  //TODO: selectedActivityId로 월별 예약 리스트 데이터 가져오기
  //TODO: 월별 예약 리스트 목업 데이터
  let MonthReservations = [
    {
      date: '2024-06-01',
      reservations: {
        completed: 3,
        confirmed: 0,
        pending: 0,
      },
    },
    {
      date: '2024-06-13',
      reservations: {
        completed: 0,
        confirmed: 0,
        pending: 1,
      },
    },
    {
      date: '2024-06-15',
      reservations: {
        completed: 5,
        confirmed: 2,
        pending: 0,
      },
    },
    {
      date: '2024-06-18',
      reservations: {
        completed: 9,
        confirmed: 10,
        pending: 11,
      },
    },
    {
      date: '2024-06-23',
      reservations: {
        completed: 7,
        confirmed: 0,
        pending: 2,
      },
    },
    {
      date: '2024-06-27',
      reservations: {
        completed: 0,
        confirmed: 3,
        pending: 1,
      },
    },
  ];

  return (
    <div style={{ minWidth: '350px' }} className="text-black200 bg-gray50">
      <Gnb />
      <div className="pt-[142px] tablet:pt-[94px] mobile:pt-[94px] w-full flex justify-center">
        <SideNavigationMenu />
        <div className="w-[800px] pl-[24px] tablet:w-[429px] mobile:w-[326px] mobile:px-4 text-[32px] mb-[142px] tablet:mb-[128px]">
          <p className="w-[800px] mobile:w-full font-bold">예약 현황</p>
          {myActivityes ? (
            <>
              <SelectBox myActivityes={myActivityes} onSelect={handleSelect} />
              <Calendar
                MonthReservations={MonthReservations}
                selectedActivityId={selectedActivityId}
              />
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
      <Footer />
    </div>
  );
}
