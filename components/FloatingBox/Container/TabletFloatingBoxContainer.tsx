import React, { useState } from 'react';
import FloatingBox from '../FloatingBox';
import Price from '../Price';
import DatePicker from '../DatePicker';
import ParticipantCount from '../ParticipantCount';
import TotalPrice from '../TotalPrice';
import ReservationButton from '../ReservationButton';
import data from '../mock.json';
import { useSelectTimeStore } from '@/libs/calendarStore';

const TabletFloatingBoxContainer = () => {
  const [count, setCount] = useState(1);
  const { selectTime } = useSelectTimeStore();
  const { price } = data;
  const id = selectTime?.id;

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
      <ReservationButton
        value={!!id}
        handleButtonClick={handleReservation}
        text={'예약하기'}
      />
      <TotalPrice total={price * count} />
    </FloatingBox>
  );
};

export default TabletFloatingBoxContainer;
