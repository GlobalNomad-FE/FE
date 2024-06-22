'use client';
import instance from '@/apis/axios';
import { API } from '@/utils/constants/API';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Activity } from './useGetActivities';
import { BioImageType } from '@/components/activity/activityTitle/ActivityTitle';
import { Schedule } from '@/components/reservationWidget/lib/Calendar.types';

export interface ActivityDetail extends Activity {
  subImages: BioImageType[];
  schedules: Schedule[];
}

const getActivities = (activityId: number): Promise<ActivityDetail> => {
  return instance.get(`${API.ACTIVITIE}/${activityId}`).then((res) => res.data);
};

export const useGetActivitiesDetail = (
  activityId: number,
): UseQueryResult<ActivityDetail> => {
  return useQuery({
    queryKey: ['activities', 'detail', activityId],
    queryFn: () => getActivities(activityId),
  });
};
