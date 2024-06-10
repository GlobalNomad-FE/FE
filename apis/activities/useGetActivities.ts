import { useQuery } from '@tanstack/react-query';
import instance from '../axios';
import { activitiesKey } from './keys';

interface BaseRequest {
  category?: string;
  keyword?: string;
  sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
}

interface InfinityScrollRequest extends BaseRequest {
  method: 'cursor';
  cursorId: number | null;
  size: number;
}

interface PaginationRequest extends BaseRequest {
  method: 'offset';
  page: number;
  size: number;
}

type GetActivitiesRequest = InfinityScrollRequest | PaginationRequest;

export interface Activity {
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
}

interface GetActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
}

async function getActivities(request: GetActivitiesRequest) {
  const params =
    request.method === 'cursor'
      ? {
          method: request.method,
          cursorId: request.cursorId,
          size: request.size,
        }
      : { method: request.method, page: request.page, size: request.size };

  const response = await instance.get<GetActivitiesResponse>('/activities', {
    params: {
      ...params,
      category: request.category,
      keyword: request.keyword,
      sort: request.sort,
    },
  });
  return response.data;
}

const useGetActivities = (request: GetActivitiesRequest) => {
  return useQuery({
    queryKey: activitiesKey.getActivities(
      request.method === 'cursor' ? request.cursorId : request.page,
      request.size,
      request.category,
      request.keyword,
      request.sort,
    ),
    queryFn: () => getActivities(request),
  });
};

export default useGetActivities;
