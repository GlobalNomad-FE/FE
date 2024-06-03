'use client';
import { ReactNode, createContext, useState, useContext } from 'react';
import { CalendarContextProps, Schedule } from './Calendar.types';
import formatDateToYYYYMMDD from '@/utils/dateFormatter';

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined,
);
export interface CalendarProviderProps {
  children: ReactNode | ReactNode[];
}

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [selectSchedule, setSelectSchedule] = useState<Schedule | null>(null);
  const [members, setMembers] = useState<number>(1);
  const [selectMonth, setSelectMonth] = useState<number | null>(
    new Date().getMonth(),
  );
  const onChangeSelectDate = (date: Date) => {
    setSelectSchedule(null);
    setSelectDate(date);
  };
  const onChangeSchedule = (schdule: Schedule | null) => {
    if (schdule) {
      setSelectSchedule(schdule);
    }
  };
  const onChangeMembers = (members: number) => {
    setMembers(members);
  };
  const onChangeSelectMonth = (month: number | null) => {
    setSelectMonth(month);
  };

  return (
    <CalendarContext.Provider
      value={{
        selectDate,
        formatedDate: formatDateToYYYYMMDD(selectDate),
        selectMonth,
        selectSchedule,
        members,
        onChangeMembers,
        onChangeSchedule,
        onChangeSelectDate,
        onChangeSelectMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useData must be used within a CalendarProvider');
  }
  return context;
};
