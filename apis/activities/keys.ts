export const activitiesKey = {
  getActivities: (
    methodValue: number | null, // cursorId 또는 page 값
    size?: number,
    category?: string,
    keyword?: string,
    sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest',
  ) => ['activities', methodValue, size, category, keyword, sort],
};
