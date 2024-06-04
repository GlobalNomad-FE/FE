import React from 'react';
import Gnb from '@/components/commons/gnb/gnb';
import ActivitieTitle from '@/components/activitie/activitieTitile/ActivitieTitle';
import ReservationWidgetContainerSelector from '@/components/reservationWidget/ReservationWidgetContainerSelector';
import { CalendarProvider } from '@/components/reservationWidget/lib/Calendar.provider';
import data from '@/components/reservationWidget/mock.json';
import ActivitieBio from '@/components/activitie/ActivitieBio';
import Map from '@/components/activitie/Map';
import Review from '@/components/activitie/Review';

export default function ActivitiesDetailPage() {
  const { description } = data;
  return (
    <main className="max-w-[1200px] mx-auto px-[24px]">
      <Gnb />
      <ActivitieTitle />
      <div className="flex gap-5 mt-[50px]">
        <div className="w-[790px] flex flex-col">
          <ActivitieBio description={description} />
          <Map location={data.address} />
          <Review />
        </div>
        <div className="">
          <CalendarProvider>
            <ReservationWidgetContainerSelector />
          </CalendarProvider>
        </div>
      </div>
    </main>
  );
}
