import { useQuery } from '@tanstack/react-query';
import instance from '../axios';
import { myReservationStatusKey } from './keys';

interface BaseRequest {
  activityId?: number | undefined;
  year?: string;
  month?: string;
}

interface reservationsStatusCount {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface dayOfReservation {
  date: string;
  reservations: reservationsStatusCount;
}

async function getMyReservationStatus(request: BaseRequest) {
  const response = await instance.get<dayOfReservation[]>(
    '/my-activities/' + request.activityId + '/reservation-dashboard',
    {
      params: {
        activityId: request.activityId,
        year: request.year,
        month: request.month,
      },
    },
  );
  return response.data;
}

const useGetReservationDashboard = (request: BaseRequest, enabled: boolean) => {
  return useQuery({
    queryKey: myReservationStatusKey.getMyReservationStatus(
      request.activityId,
      request.year,
      request.month,
    ),
    queryFn: () => getMyReservationStatus(request),
    enabled, // enabled 옵션 추가
  });
};

export default useGetReservationDashboard;
