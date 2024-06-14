'use client';
import { getMyActivites } from '../my-activities/@common/myActivites';
import {
  useSuspenseInfiniteQuery,
  infiniteQueryOptions,
} from '@tanstack/react-query';
import { GetActivitiesResponse } from './useGetActivities';

export const useGetInfinityActivitiesList = () => {
  const { data, fetchNextPage, ...rest } = useSuspenseInfiniteQuery(
    infiniteQueryOptions<GetActivitiesResponse>({
      queryKey: ['activities', 'list'],
      queryFn: ({ pageParam }) => {
        return getMyActivites(pageParam as number | undefined, 5);
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        return lastPage.cursorId ? lastPage.cursorId : undefined;
      },
    }),
  );
  return { data, fetchNextPage, ...rest };
};
