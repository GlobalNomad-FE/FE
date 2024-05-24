'use client';
import React, { useState } from 'react';
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
import { useSelectTimeStore } from '@/libs/calendarStore';

const DesktopFloatingBoxContainer = () => {
  const [count, setCount] = useState(1);
  const { date } = useDateStore();
  const { selectTime } = useSelectTimeStore();
  const { schedules, price } = data;
  const formatDate = formatDateToYYYYMMDD(date);
  const id = selectTime?.id;

  const handleCountPlus = () => {
    setCount(count + 1);
  };
  const handleCountMinus = () => {
    setCount(count > 1 ? count - 1 : 1);
  };

  //TODO - 임시 (팝업모달 나오게 해야함.)
  const handleReservation = () => {
    alert(`예약이 완료되었습니다. ${selectTime}`);
  };

  return (
    <FloatingBox>
      <Price price={price} />
      <DatePicker />
      <TimeSelector schedules={schedules} selectedDate={formatDate} />
      <ParticipantCount
        count={count}
        handleCountPlus={handleCountPlus}
        handleCountMinus={handleCountMinus}
      />
      <ReservationButton
        value={!!id}
        handleButtonClick={handleReservation}
        text={'예약하기'}
      />
      <Total total={price * count} />
    </FloatingBox>
  );
};

export default DesktopFloatingBoxContainer;
