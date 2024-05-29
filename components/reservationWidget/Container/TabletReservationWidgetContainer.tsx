import React from 'react';
import ReservationWidgetWraaper from '@common/ReservationWidgetWraaper';
import Price from '@common/Price';
import DatePicker from '@common/DatePicker';
import ParticipantCount from '@common/ParticipantCount';
import TotalPrice from '@common/TotalPrice';
import ReservationButton from '@common/ReservationButton';
import data from '../mock.json';
import { useCalendar } from '../lib/Calendar.provider';

const TabletReservationWidgetContainer = () => {
  const { members, onChangeMembers, selectSchedule } = useCalendar();

  //TODO - API 바꿀것
  const { price } = data;
  const id = selectSchedule?.id;

  const handleCountPlus = () => {
    onChangeMembers(members + 1);
  };
  const handleCountMinus = () => {
    onChangeMembers(members > 1 ? members - 1 : 1);
  };
  //TODO - 임시 (팝업으로 나와야함)
  const handleReservation = () => {
    alert('예약이 완료되었습니다.');
  };

  return (
    <ReservationWidgetWraaper>
      <Price price={price} />
      <DatePicker />
      <ParticipantCount
        count={members}
        handleCountPlus={handleCountPlus}
        handleCountMinus={handleCountMinus}
      />
      <ReservationButton
        value={!!id}
        handleButtonClick={handleReservation}
        text={'예약하기'}
      />
      <TotalPrice total={price * members} />
    </ReservationWidgetWraaper>
  );
};

export default TabletReservationWidgetContainer;
