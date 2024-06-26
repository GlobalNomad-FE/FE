import { useMutation } from '@tanstack/react-query';
import instance from '../axios';
import { AxiosError } from 'axios';

interface Request {
  activityId: number | undefined;
  reservationId: number | undefined;
  status: string;
}

async function updateReservationStatus({
  activityId,
  reservationId,
  status,
}: Request) {
  const response = await instance.patch(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    {
      status,
    },
  );
  return response.data;
}

const usePatchReservationRequest = () => {
  const { mutate } = useMutation({
    mutationFn: (request: Request) => updateReservationStatus(request),
  });

  return { mutate };
};

export default usePatchReservationRequest;
