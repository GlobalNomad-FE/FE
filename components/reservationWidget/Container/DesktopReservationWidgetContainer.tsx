'use client';
import React from 'react';
import ReservationWidgetWrapper from '@common/ReservationWidgetWrapper';
import Price from '@common/Price';
import DatePicker from '@common/DatePicker';
import TimeSelector from '@common/TimeSelector';
import ParticipantCount from '@common/ParticipantCount';
import TotalPrice from '@common/TotalPrice';
import ReservationButton from '@common/ReservationButton';
import { useCalendar } from '../lib/Calendar.provider';
import BasePopup from '@/components/commons/Popups/BasePopup';
import { useState } from 'react';
import { usePostActivityReservation } from '@/apis/activities/mutation/usePostActivityReservation';
import { AxiosError } from 'axios';

const DesktopReservationWidgetContainer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { members, onChangeMembers, selectSchedule, data } = useCalendar();
  const { schedules, price, id: activityId } = data;
  const id = selectSchedule?.id;
  const reservationData = {
    scheduleId: id,
    headCount: members,
  };

  const { mutate } = usePostActivityReservation();

  const handleCountPlus = () => {
    onChangeMembers(members + 1);
  };
  const handleCountMinus = () => {
    onChangeMembers(members > 1 ? members - 1 : 1);
  };

  const handleReservation = () => {
    mutate(
      { activityId, reservationData },
      {
        onSuccess: () => {
          setIsPopupOpen(true);
        },
        onError: (error: AxiosError<{ message: string }>) => {
          setIsPopupOpen(true);
          if (error.response?.status === 401) {
            setErrorMessage('로그인을 해주세요.');
          } else if (error.response?.status === 400) {
            setErrorMessage('이미 지난 일정은 예약할 수 없습니다.');
          } else if (error.response?.data.message) {
            setErrorMessage(error.response?.data.message);
          }
        },
      },
    );
  };

  return (
    <ReservationWidgetWrapper>
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
      {isPopupOpen && (
        <BasePopup
          isOpen={isPopupOpen}
          closePopup={() => {
            setIsPopupOpen(false);
          }}
        >
          {errorMessage ? errorMessage : '예약이 완료되었습니다.'}
        </BasePopup>
      )}
    </ReservationWidgetWrapper>
  );
};

export default DesktopReservationWidgetContainer;
