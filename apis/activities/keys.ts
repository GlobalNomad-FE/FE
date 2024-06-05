export const activitiesKey = {
  getActivities: (
    method: 'cursor' | 'offset',
    methodValue: number | null, // cursorId 또는 page 값
    size: number,
    category?: string,
    keyword?: string,
    sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
  ) => ['activities', method, methodValue, size, category, keyword, sort],
};