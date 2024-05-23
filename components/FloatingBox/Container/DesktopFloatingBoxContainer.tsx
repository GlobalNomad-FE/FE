'use client';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import FloatingBox from '../FloatingBox';
import Price from '../Price';
import DatePicker from '../DatePicker';
import TimeSelector from '../TimeSelector';
import ParticipantCount from '../ParticipantCount';
import Total from '../TotalPrice';
import ReservationButton from '../ReservationButton';
import data from '../mock.json';
import useDateStore from '@/libs/calendarStore';
import formatDateToYYYYMMDD from '@/utils/dateFormatter';

const DesktopFloatingBoxContainer = () => {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState<null | number>(null);
  const { date } = useDateStore();
  const { schedules, price } = data;
  const formatDate = formatDateToYYYYMMDD(date);

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });

  const handleCountPlus = () => {
    setCount(count + 1);
  };
  const handleCountMinus = () => {
    setCount(count > 1 ? count - 1 : 1);
  };
  const handleTimeSelect = (id: number) => {
    setValue(id);
  };
  //TODO - 임시
  const handleReservation = () => {
    alert('예약이 완료되었습니다.');
  };

  return (
    <FloatingBox>
      <Price price={price} />
      <DatePicker />
      <TimeSelector
        schedules={schedules}
        selectedDate={formatDate}
        value={value}
        handleTimeSelect={handleTimeSelect}
      />
      <ParticipantCount
        count={count}
        handleCountPlus={handleCountPlus}
        handleCountMinus={handleCountMinus}
      />
      <ReservationButton value={value} handleReservation={handleReservation} />
      <Total total={price * count} />
    </FloatingBox>
  );
};

export default DesktopFloatingBoxContainer;
