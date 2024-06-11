'use client';
import { getMyActivites } from '../my-activities/@common/myActivites';
import {
  useInfiniteQuery,
  keepPreviousData,
  infiniteQueryOptions,
} from '@tanstack/react-query';
import { GetActivitiesResponse } from './useGetActivities';

export const useGetInfinityActivitiesList = () => {
  const { data, fetchNextPage, ...rest } = useInfiniteQuery(
    infiniteQueryOptions<GetActivitiesResponse>({
      queryKey: ['activities'],
      queryFn: ({ pageParam }) => {
        return getMyActivites(pageParam as number | undefined, 5);
      },
      initialPageParam: undefined,
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) => {
        return lastPage.cursorId ? lastPage.cursorId : undefined;
      },
    }),
  );
  return { data, fetchNextPage, ...rest };
};
