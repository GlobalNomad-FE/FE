import { useQuery } from '@tanstack/react-query';
import instance from '../axios';
import { notificationsKey } from './keys';

interface Notification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface GetMyNotificationsResponse {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
}

async function getMyNotifications(): Promise<GetMyNotificationsResponse> {
  const response = await instance.get<GetMyNotificationsResponse>(
    '/my-notifications',
  );
  return response.data;
}

const useGetMyNotifications = () => {
  return useQuery<GetMyNotificationsResponse>({
    queryKey: notificationsKey.getMyNotifications(),
    queryFn: getMyNotifications,
    refetchInterval: 1000, // 1초마다 데이터를 새로고침
  });
};

export default useGetMyNotifications;
