import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import React, { useEffect, useState } from 'react';
import { setDefaultOptions } from 'date-fns';
import { enUS, Locale } from 'date-fns/locale';
import CalendarHeader from './CalendarHeader';
import './Calendar.css';

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
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth());
  const [clientLoaded, setClientLoaded] = useState(false);

  const handleMonthChange = date => {
    setMonth(date.getMonth());
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 클라이언트 측에서만 실행
      setClientLoaded(true);
    }
  }, []);

  return (
    <div>
      {clientLoaded ? (
        <DatePicker
          selected={date}
          onChange={date => setDate(date)}
          inline
          autoComplete="off"
          locale={customLocale}
          minDate={new Date()} //이전날짜 선택못함
          onMonthChange={handleMonthChange}
          dayClassName={d =>
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
      ) : null}
    </div>
  );
}
