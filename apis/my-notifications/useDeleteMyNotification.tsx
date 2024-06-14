import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/apis/axios';

const deleteNotification = (notificationId: number) => {
  return instance.delete(`/my-notifications/${notificationId}`);
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ notificationId }: { notificationId: number }) =>
      deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNotifications'] });
    },
  });

  return { mutate };
};
