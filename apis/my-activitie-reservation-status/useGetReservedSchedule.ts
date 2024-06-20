import { useQuery } from '@tanstack/react-query'; //
import instance from '../axios';
import { reservedScheduleKey } from './keys';

interface BaseRequest {
  activityId: number | undefined;
  date: string;
}

interface reservationsStatusCount {
  confirmed: number;
  pending: number;
  declined: number;
}

export interface dayOfReservation {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: reservationsStatusCount;
}

async function getReservedSchedule(request: BaseRequest) {
  const response = await instance.get<dayOfReservation[]>(
    '/my-activities/' + request.activityId + '/reserved-schedule',
    {
      params: {
        activityId: request.activityId,
        date: request.date,
      },
    },
  );
  return response.data;
}

const useGetReservedSchedule = (request: BaseRequest, enabled: boolean) => {
  return useQuery({
    queryKey: reservedScheduleKey.getReservedSchedule(
      request.activityId,
      request.date,
    ),
    queryFn: () => getReservedSchedule(request),
    enabled, // enabled 옵션 추가
  });
};

export default useGetReservedSchedule;
