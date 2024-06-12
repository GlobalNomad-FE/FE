'use client';

import Gnb from '@/components/commons/gnb/gnb';
import Footer from '@/components/commons/Footer';
import Calendar from '@/components/reservationHistory/Calendar';
import SelectBox from '@/components/reservationHistory/SelectBox';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';

import React from 'react';

export default function Page() {
  return (
    <div className="text-black200 bg-gray50">
      <Gnb />
      <div className="pt-[142px] tablet:pt-[94px] w-full flex justify-center">
        <SideNavigationMenu />
        <div className="pl-[24px] mobile:w-full mobile:px-4 tablet:[17px] text-[32px] mb-[142px] tablet:mb-[128px]">
          <p className="w-[800px] tablet:w-[429px] mobile:w-full font-bold">
            예약현황
          </p>
          <SelectBox />
          <Calendar />
        </div>
      </div>
      <Footer />
    </div>
  );
}
