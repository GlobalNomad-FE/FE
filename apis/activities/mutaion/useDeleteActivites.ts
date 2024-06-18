import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActivities } from '../../my-activities/@common/myActivites';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export const useDeleteActivites = (activityId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    any
  >({
    mutationFn: ({ activityId }: { activityId: number }) =>
      deleteActivities(activityId),
    onSuccess: () => {
      toast.success('삭제가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  return { mutate };
};
