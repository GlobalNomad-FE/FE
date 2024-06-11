'use client';
import instance from '@/apis/axios';
import { API } from '@/utils/constants/API';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import { ReviewsDataType } from '@/types/reviewsType';

export const getActivitiesReviews = (
  activityId: number,
  page?: number,
  size?: number,
): Promise<ReviewsDataType> => {
  return instance
    .get(`${API.ACTIVITIE}/${activityId}/reviews`, {
      params: {
        page: page,
        size: size,
      },
    })
    .then((res) => res.data);
};

export const useGetActivitiesReviews = (
  activityId: number,
  page: number,
  size: number,
): UseQueryResult<ReviewsDataType> => {
  return useQuery({
    queryKey: ['activities', 'reviews', activityId],
    queryFn: () => getActivitiesReviews(activityId, page, size),
    placeholderData: keepPreviousData,
  });
};
