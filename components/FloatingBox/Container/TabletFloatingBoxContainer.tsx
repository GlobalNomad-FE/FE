import React, { useState } from 'react';
import FloatingBox from '../FloatingBox';
import Price from '../Price';
import DatePicker from '../DatePicker';
import ParticipantCount from '../ParticipantCount';
import TotalPrice from '../TotalPrice';
import ReservationButton from '../ReservationButton';
import data from '../mock.json';
import useDateStore from '@/libs/calendarStore';
import formatDateToYYYYMMDD from '@/utils/dateFormatter';
import TabletCalender from '../Calender/TabletCalender';

const TabletFloatingBoxContainer = () => {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState<null | number>(null);

  const { price } = data;

  const handleCountPlus = () => {
    setCount(count + 1);
  };
  const handleCountMinus = () => {
    setCount(count > 1 ? count - 1 : 1);
  };
  const handleReservation = () => {
    alert('예약이 완료되었습니다.');
  };

  return (
    <FloatingBox>
      <Price price={price} />
      <DatePicker />
      <ParticipantCount
        count={count}
        handleCountPlus={handleCountPlus}
        handleCountMinus={handleCountMinus}
      />
      <ReservationButton value={value} handleReservation={handleReservation} />
      <TotalPrice total={price * count} />
    </FloatingBox>
  );
};

export default TabletFloatingBoxContainer;
