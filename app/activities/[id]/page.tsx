'use client';
import Gnb from '@/components/commons/gnb/gnb';
import ActivitieTitle from '@/components/activitie/activitieTitile/ActivitieTitle';
import ReservationWidgetContainerSelector from '@/components/reservationWidget/ReservationWidgetContainerSelector';
import { CalendarProvider } from '@/components/reservationWidget/lib/Calendar.provider';
import ActivitieBio from '@/components/activitie/ActivitieBio';
import Map from '@/components/activitie/Map';
import Review from '@/components/activitie/Review';
import { useGetActivitiesDetail } from '@/apis/activities/useGetActivitiesDetail';
import Footer from '@/components/commons/Footer';

export default function ActivitiesDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const activitieId = params?.id;

  const { data } = useGetActivitiesDetail(activitieId);

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
              <Review
                averageRating={data.rating}
                totalCount={data.reviewCount}
                id={data.id}
              />
            </div>
            <div>
              <CalendarProvider>
                <ReservationWidgetContainerSelector />
              </CalendarProvider>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
}
