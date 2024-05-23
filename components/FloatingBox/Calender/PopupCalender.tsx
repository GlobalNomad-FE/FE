import React, { useState } from 'react';
import Calendar from '@/components/commons/calendar/Calender';
import TimeSelector from '../TimeSelector';
import ReservationButton from '../ReservationButton';
import useDateStore from '@/libs/calendarStore';
import formatDateToYYYYMMDD from '@/utils/dateFormatter';
import data from '../mock.json';

export default function PopupCalendar() {
  const { date } = useDateStore();
  const { schedules } = data;
  const [value, setValue] = useState<null | number>(null);
  const formatDate = formatDateToYYYYMMDD(date);
  const handleTimeSelect = (id: number) => {
    setValue(id);
  };
  const handleReservation = () => {
    alert('예약이 완료되었습니다.');
  };

  return (
    <div className="w-30 z-10 absolute top-0 right-0 bg-white rounded-[18px] p-6 border border-gray200">
      <Calendar />
      <TimeSelector
        schedules={schedules}
        selectedDate={formatDate}
        value={value}
        handleTimeSelect={handleTimeSelect}
      />
      <ReservationButton value={value} handleReservation={handleReservation} />
    </div>
  );
}
