import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import instance from '../axios';
import { reservationsKey } from './keys';

interface UpdateReservationStatusPayload {
  reservationId: number;
  status: string;
}

async function updateReservationStatus({
  reservationId,
  status,
}: UpdateReservationStatusPayload): Promise<any> {
  const response = await instance.patch(`/my-reservations/${reservationId}`, {
    status,
  });
  return response.data;
}

const useUpdateReservationStatus = (
  options?: UseMutationOptions<
    any,
    Error,
    UpdateReservationStatusPayload,
    unknown
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateReservationStatusPayload>({
    mutationFn: updateReservationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reservationsKey.getMyReservations(),
      });
    },
    ...options,
  });
};

export default useUpdateReservationStatus;
