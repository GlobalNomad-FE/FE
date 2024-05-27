import React from 'react';
import ReservationWidgetWraaper from '@common/ReservationWidgetWraaper';
import Price from '@common/Price';
import DatePicker from '@common/DatePicker';
import TimeSelector from '@common/TimeSelector';
import ParticipantCount from '@common/ParticipantCount';
import TotalPrice from '@common/TotalPrice';
import ReservationButton from '@common/ReservationButton';
import data from '../mock.json';
import { useCalendar } from '../lib/Calendar.provider';

const DesktopReservationWidgetContainer = () => {
  const { members, onChangeMembers, selectSchedule } = useCalendar();
  //TODO - 데이터 들어오면 provider에서 불러오거나 바꿔야할것
  const { schedules, price } = data;

  const id = selectSchedule?.id;

  const handleCountPlus = () => {
    onChangeMembers(members + 1);
  };
  const handleCountMinus = () => {
    onChangeMembers(members > 1 ? members - 1 : 1);
  };

  //TODO - 임시 (팝업모달 나오게 해야함.)
  const handleReservation = () => {
    alert(`예약이 완료되었습니다. ${selectSchedule?.id}`);
  };

  return (
    <ReservationWidgetWraaper>
      <Price price={price} />
      <DatePicker />
      <TimeSelector schedules={schedules} />
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

export default DesktopReservationWidgetContainer;
