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
import Cookies from 'js-cookie';

export default function ActivitiesDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const activitieId = params?.id;
  const cookiesUserId = Cookies.get('userID');
  const { data } = useGetActivitiesDetail(activitieId);
  const isFullWidth = Number(cookiesUserId) !== data?.userId;
  return (
    <>
      <Gnb />
      {data && (
        <main className="max-w-[1200px] mx-auto px-[24px] mb-24">
          <ActivitieTitle data={data} />
          <div className="flex gap-5 mt-[50px]">
            <div
              className={`flex flex-col ${
                isFullWidth ? 'w-[790px]' : 'w-full'
              }`}
            >
              <ActivitieBio description={data.description} />
              <Map location={data.address} />
              <Review
                averageRating={data.rating}
                totalCount={data.reviewCount}
                id={data.id}
              />
            </div>
            {isFullWidth && (
              <div>
                <CalendarProvider data={data}>
                  <ReservationWidgetContainerSelector />
                </CalendarProvider>
              </div>
            )}
          </div>
        </main>
      )}
      <Footer />
    </>
  );
}
