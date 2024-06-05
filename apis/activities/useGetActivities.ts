import { useSuspenseQuery } from '@tanstack/react-query';
import instance from '../axios';
import { activitiesKey } from './keys';

interface GetActivitiesRequest {
  page: number;
  size: number;
}

interface GetActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: {
    id: number;
    userId: number;
    title: string;
    description: string;
    category: string;
    price: number;
    address: string;
    bannerImageUrl: string;
    rating: number;
    reviewCount: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

async function getActivities({ page, size }: GetActivitiesRequest) {
  const response = await instance.get<GetActivitiesResponse>('/activities', {
    params: {
      method: 'offset',
      page,
      size,
    },
  });
  return response.data;
}

const useGetActivities = ({ page, size }: GetActivitiesRequest) => {
  return useSuspenseQuery({
    queryKey: activitiesKey.getActivities(page, size),
    queryFn: () => getActivities({ page, size }),
  });
};

export default useGetActivities;
