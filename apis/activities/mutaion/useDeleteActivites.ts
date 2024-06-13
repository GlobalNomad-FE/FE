import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActivities } from '../../my-activities/@common/myActivites';
import { AxiosError } from 'axios';

export const useDeleteActivites = (activityId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ activityId }: { activityId: number }) =>
      deleteActivities(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error: AxiosError) => {},
  });

  return { mutate };
};
