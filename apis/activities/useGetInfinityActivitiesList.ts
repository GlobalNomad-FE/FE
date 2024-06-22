'use client';
import { getMyActivities } from '../my-activities/@common/myActivity';
import { useInfiniteQuery, infiniteQueryOptions } from '@tanstack/react-query';
import { GetActivitiesResponse } from './useGetActivities';

export const useGetInfinityActivitiesList = () => {
  const { data, fetchNextPage, ...rest } = useInfiniteQuery(
    infiniteQueryOptions<GetActivitiesResponse>({
      queryKey: ['activities', 'list'],
      queryFn: ({ pageParam }) => {
        return getMyActivities(pageParam as number | undefined, 5);
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        return lastPage.cursorId ? lastPage.cursorId : undefined;
      },
    }),
  );
  return { data, fetchNextPage, ...rest };
};
