import { ActivityDetail } from '@/apis/activities/useGetActivitiesDetail';

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface CalendarContextProps {
  selectDate: Date;
  formatDate: string;
  onChangeSelectDate: (date: Date) => void;
  selectSchedule: Schedule | null;
  onChangeSchedule: (schedule: Schedule | null) => void;
  members: number;
  onChangeMembers: (members: number) => void;
  selectMonth: number | null;
  onChangeSelectMonth: (month: number | null) => void;
  data: ActivityDetail;
}
