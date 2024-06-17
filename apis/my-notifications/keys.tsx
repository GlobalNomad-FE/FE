export const notificationsKey = {
  getMyNotifications: (deletedAt?: null | string) => [
    'myNotifications',
    deletedAt,
  ],
};
