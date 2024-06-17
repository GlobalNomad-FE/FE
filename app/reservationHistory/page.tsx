'use client';

import Gnb from '@/components/commons/gnb/gnb';
import Footer from '@/components/commons/Footer';
import Calendar from '@/components/reservationHistory/Calendar';
import SelectBox from '@/components/reservationHistory/SelectBox';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import React, { useState } from 'react';

export default function Page() {
  //TODO: 내 체험 리스트 데이터 가져오기
  //TODO: 내 체험 리스트 목업
  const myActivityes = [
    {
      id: 1154,
      userId: 409,
      title: '길다길어111',
      description: '길어요',
      category: '식음료',
      price: 112220,
      address: '대전 동구 판교1길 3',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-13_346_1718181839344.jpeg',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-06-12T17:44:04.519Z',
      updatedAt: '2024-06-12T17:44:04.519Z',
    },
    {
      id: 1155,
      userId: 409,
      title: '길다길어222',
      description: '길어요',
      category: '식음료',
      price: 112220,
      address: '대전 동구 판교1길 3',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-13_346_1718181839344.jpeg',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-06-12T17:44:04.519Z',
      updatedAt: '2024-06-12T17:44:04.519Z',
    },
    {
      id: 1156,
      userId: 409,
      title: '길다길어333',
      description: '길어요',
      category: '식음료',
      price: 112220,
      address: '대전 동구 판교1길 3',
      bannerImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-13_346_1718181839344.jpeg',
      rating: 0,
      reviewCount: 0,
      createdAt: '2024-06-12T17:44:04.519Z',
      updatedAt: '2024-06-12T17:44:04.519Z',
    },
  ];

  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    null,
  );

  const handleSelect = (id: number) => {
    setSelectedActivityId(id); //선택한 체험의 id셋팅
  };

  //TODO: selectedActivityId로 월별 예약 리스트 데이터 가져오기
  //TODO: 월별 예약 리스트 목업 데이터
  const MonthReservations = [
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
    <div className="text-black200 bg-gray50">
      <Gnb />
      <div className="pt-[142px] tablet:pt-[94px] mobile:pt-[94px] w-full flex justify-center">
        <SideNavigationMenu />
        <div className="w-[800px] pl-[24px] tablet:w-[429px] mobile:w-[326px] mobile:px-4 text-[32px] mb-[142px] tablet:mb-[128px]">
          <p className="w-[800px] mobile:w-full font-bold">예약현황</p>
          <SelectBox myActivityes={myActivityes} onSelect={handleSelect} />
          <Calendar MonthReservations={MonthReservations} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
