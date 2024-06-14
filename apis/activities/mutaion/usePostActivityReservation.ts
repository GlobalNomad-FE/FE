import { useMutation } from '@tanstack/react-query';
import { ReservationData } from '../@common/activities';
import instance from '@/apis/axios';
import { API } from '@/utils/constants/API';
import { AxiosError } from 'axios';
/**
 * 체험 예약 신청
 * @param activityId
 * @param reservationData  scheduleId: number, headCount: number;
 */
const postActivitiesReservation = (
  activityId: number,
  reservationData: ReservationData,
) => {
  return instance.post(
    `${API.ACTIVITIE}/${activityId}/reservations`,
    reservationData,
  );
};

export const usePostActivityReservation = () => {
  const { mutate, isError } = useMutation({
    mutationFn: ({
      activityId,
      reservationData,
    }: {
      activityId: number;
      reservationData: ReservationData;
    }) => postActivitiesReservation(activityId, reservationData),
    onError: (error: AxiosError) => {},
  });

  return { mutate, isError };
};
