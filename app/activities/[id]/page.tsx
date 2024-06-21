'use client';
import ActivityTitle from '@/components/activity/activityTitle/ActivityTitle';
import ReservationWidgetContainerSelector from '@/components/reservationWidget/ReservationWidgetContainerSelector';
import { CalendarProvider } from '@/components/reservationWidget/lib/Calendar.provider';
import ActivityBio from '@/components/activity/ActivityBio';
import Map from '@/components/activity/Map';
import Review from '@/components/activity/Review';
import { useGetActivitiesDetail } from '@/apis/activities/useGetActivitiesDetail';
import Cookies from 'js-cookie';

export default function ActivitiesDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const activityId = params?.id;
  const cookiesUserId = Cookies.get('userID');
  const { data } = useGetActivitiesDetail(activityId);
  const isFullWidth = Number(cookiesUserId) !== data?.userId;
  return (
    <>
      {data && (
        <main className="max-w-[1200px] mx-auto px-[24px] mb-24">
          <ActivityTitle data={data} />
          <div className="flex gap-5 mt-[50px]">
            <div
              className={`flex flex-col ${
                isFullWidth ? 'w-[790px]' : 'w-full'
              }`}
            >
              <ActivityBio description={data.description} />
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
    </>
  );
}
