import { useQuery } from '@tanstack/react-query'; //
import instance from '../axios';
import { reservedTimeKey } from './keys';

interface BaseRequest {
  activityId: number | undefined;
  scheduleId: number | undefined;
  status: string;
}

interface reservation {
  id: number;
  status: string;
  totalPrice: number;
  headCount: number;
  nickname: string;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  activityId: number;
  scheduleId: number;
  reviewSubmitted: boolean;
  teamId: string;
}

export interface reservedTime {
  totalCount: number;
  cursorId: string;
  reservations: reservation[];
}

async function getReservedTime(request: BaseRequest) {
  const response = await instance.get<reservedTime>(
    '/my-activities/' + request.activityId + '/reservations',
    {
      params: {
        activityId: request.activityId,
        scheduleId: request.scheduleId,
        status: request.status,
      },
    },
  );
  return response.data;
}

const useGetReservedTime = (request: BaseRequest, enabled: boolean) => {
  return useQuery({
    queryKey: reservedTimeKey.getReservedTime(
      request.activityId,
      request.scheduleId,
      request.status,
    ),
    queryFn: () => getReservedTime(request),
    enabled,
  });
};

export default useGetReservedTime;
