export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface CalendarContextProps {
  selectDate: Date;
  formatedDate: string;
  onChangeSelectDate: (date: Date) => void;
  selectSchedule: Schedule | null;
  onChangeSchedule: (schdule: Schedule | null) => void;
  members: number;
  onChangeMembers: (members: number) => void;
  selectMonth: number | null;
  onChangeSelectMonth: (month: number | null) => void;
}
