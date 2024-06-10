'use client';
import Gnb from '@/components/commons/gnb/gnb';
import ActivitieTitle from '@/components/activitie/activitieTitile/ActivitieTitle';
import ReservationWidgetContainerSelector from '@/components/reservationWidget/ReservationWidgetContainerSelector';
import { CalendarProvider } from '@/components/reservationWidget/lib/Calendar.provider';
import ActivitieBio from '@/components/activitie/ActivitieBio';
import Map from '@/components/activitie/Map';
import Review from '@/components/activitie/Review';
import { useGetActivitiesDetail } from '@/apis/activities/useGetActivitiesDetail';

export default function ActivitiesDetailPage() {
  const id = 1123;
  const { data } = useGetActivitiesDetail(id);

  console.log(data);
  return (
    <>
      <Gnb />
      {data && (
        <main className="max-w-[1200px] mx-auto px-[24px]">
          <ActivitieTitle data={data} />
          <div className="flex gap-5 mt-[50px]">
            <div className="w-[790px] flex flex-col">
              <ActivitieBio description={data.description} />
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
      )}
    </>
  );
}
