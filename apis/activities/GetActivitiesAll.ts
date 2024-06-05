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

async function getActivitiesAll({ page, size }: GetActivitiesRequest) {
  const response = await instance.get<GetActivitiesResponse>('/activities', {
    params: {
      method: 'offset',
      page,
      size,
    },
  });
  return response.data;
}

const useGetActivitiesAll = ({ page, size }: GetActivitiesRequest) => {
  return useSuspenseQuery({
    queryKey: activitiesKey.GetActivitiesAll(page, size),
    queryFn: () => getActivitiesAll({ page, size }),
  });
};

export default useGetActivitiesAll;
