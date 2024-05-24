import React from 'react';
import Price from '../Price';
import ReservationButton from '../ReservationButton';
import Calendar from '@/components/commons/calendar/Calender';

export default function MobileFloatingBoxContainer() {
  // const { date } = useDateStore();
  // const { schedules, price } = data;
  return (
    <div>
      {/* <Price price={price} /> */}
      <div>날짜 선택하기</div>
      <Calendar />
      {/* <Reservati onButton value={} /> */}
    </div>
  );
}
