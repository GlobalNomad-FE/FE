'use client';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import { enUS, Locale } from 'date-fns/locale';
import CalendarHeader from './CalendarHeader';
import './Calendar.css';
import useDateStore from '@/libs/calendarStore';

const customLocale: Locale = {
  ...enUS,
  localize: {
    ...enUS.localize,
    day: (n: number) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][n],
  },
  options: {
    ...enUS.options,
    weekStartsOn: 0, // 0은 일요일, 1은 월요일
  },
};

//TODO - 스케줄있는 날만 달력에 표시해줘야하나??? =>데이터처리 완료하고 차차 수정하기
export default function Calendar() {
  const { date, setDate } = useDateStore();
  const [month, setMonth] = useState(new Date().getMonth());

  const handleMonthChange = (date: Date) => {
    setMonth(date.getMonth());
  };

  return (
    <div>
      <DatePicker
        selected={date}
        onChange={(newDate: Date) => {
          setDate(newDate); // Zustand 스토어의 date 값을 업데이트
        }}
        inline
        autoComplete="off"
        locale={customLocale}
        minDate={new Date()} //이전날짜 선택못함
        onMonthChange={handleMonthChange}
        dayClassName={(d) =>
          d.getMonth() === month ? 'custom-day' : 'custom-day gray-day'
        }
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <CalendarHeader
            date={date}
            decreaseMonth={decreaseMonth}
            increaseMonth={increaseMonth}
          />
        )}
      />
    </div>
  );
}
