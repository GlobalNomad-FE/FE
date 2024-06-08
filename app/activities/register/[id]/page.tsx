import {
  QueryClient,
  queryOptions,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { getActivitiesID } from '@/apis/activities/@common/activities';
import Registerpage from '@/components/activitie/registerPage';

export default function ResgiterModify({ params }: { params: { id: number } }) {
  const activitieId = params?.id;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(
    queryOptions({
      queryKey: ['register', 'detail', activitieId],
      queryFn: () => getActivitiesID(Number(activitieId)),
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Registerpage id={activitieId} />
    </HydrationBoundary>
  );
}
