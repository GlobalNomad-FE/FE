'use client';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import React from 'react';
import { enUS, Locale } from 'date-fns/locale';
import CalendarHeader from './CalendarHeader';
import './Calendar.css';
import { useCalendar } from '@/components/reservationWidget/lib/Calendar.provider';

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

export default function Calendar() {
  const {
    selectMonth,
    selectDate,
    onChangeSelectDate,
    onChangeSelectMonth,
    data,
  } = useCalendar();

  const handleMonthChange = (date: Date) => {
    onChangeSelectMonth(date.getMonth());
  };

  const isScheduledDate = () => {
    return data.schedules.map((schedule) => new Date(schedule.date));
  };

  return (
    <div className="flex justify-center">
      <DatePicker
        selected={selectDate}
        onChange={(newDate: Date) => {
          onChangeSelectDate(newDate);
        }}
        inline
        autoComplete="off"
        locale={customLocale}
        minDate={new Date()} //이전날짜 선택못함
        onMonthChange={handleMonthChange}
        highlightDates={isScheduledDate()}
        dayClassName={(d) => {
          return d.getMonth() === selectMonth
            ? 'custom-day'
            : 'custom-day gray-day';
        }}
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
