import { useMutation } from '@tanstack/react-query';
import { ReservationData } from '../@common/activities';
import instance from '@/apis/axios';
import { API } from '@/utils/constants/API';
import { AxiosError, AxiosResponse } from 'axios';
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
  const { mutate, isError } = useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    { activityId: number; reservationData: ReservationData }
  >({
    mutationFn: ({
      activityId,
      reservationData,
    }: {
      activityId: number;
      reservationData: ReservationData;
    }) => postActivitiesReservation(activityId, reservationData),
  });

  return { mutate, isError };
};
