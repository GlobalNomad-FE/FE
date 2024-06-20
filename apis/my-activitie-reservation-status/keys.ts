export const reservationsKey = {
  getMyReservations: (
    status?: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed',
  ) => ['myReservations', status],
};

export const myActivitiesKey = {
  getActivities: (
    methodValue: number | null, // cursorId 또는 page 값
    size?: number,
    category?: string,
    keyword?: string,
    sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
  ) => ['my-activities', methodValue, size, category, keyword, sort],
};

export const myReservationStatusKey = {
  getMyReservationStatus: (
    activityId?: number,
    year?: string,
    month?: string,
  ) => ['reservation-dashboard', activityId, year, month],
};

export const reservedScheduleKey = {
  getReservedSchedule: (activityId?: number, date?: string) => [
    'reserved-schedule',
    activityId,
    date,
  ],
};
export const reservedTimeKey = {
  getReservedTime: (
    activityId: number | undefined,
    scheduleId: number | undefined,
    status: string,
  ) => ['reserved-time', activityId, scheduleId, status],
};
