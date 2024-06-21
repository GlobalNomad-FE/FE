import {
  QueryClient,
  queryOptions,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getActivitiesID } from '@/apis/activities/@common/activities';
import RegisterPage from '@/components/activity/RegisterPage';

export default function RegisterModify({ params }: { params: { id: number } }) {
  const activityId = params?.id;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(
    queryOptions({
      queryKey: ['register', 'detail', activityId],
      queryFn: () => getActivitiesID(Number(activityId)),
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RegisterPage id={activityId} />
    </HydrationBoundary>
  );
}
