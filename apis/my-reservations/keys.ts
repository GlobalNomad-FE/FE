export const reservationsKey = {
  getMyReservations: (
    status?: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed',
  ) => ['myReservations', status],
};
