import { useQuery } from '@tanstack/react-query';
import instance from '../axios';
import { reservationsKey } from './keys';

interface MyReservations {
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface GetMyReservationsResponse {
  totalCount: number;
  reservations: MyReservations[];
}

async function getMyReservations(): Promise<GetMyReservationsResponse> {
  const response = await instance.get<GetMyReservationsResponse>(
    '/my-reservations?size=10000',
  );
  return response.data;
}

const useGetMyReservations = () => {
  return useQuery<GetMyReservationsResponse>({
    queryKey: reservationsKey.getMyReservations(), // key 생성 시 기본 값으로 설정
    queryFn: getMyReservations,
  });
};

export default useGetMyReservations;
