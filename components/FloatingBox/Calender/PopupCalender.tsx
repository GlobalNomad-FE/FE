import React, { useState } from 'react';
import Calender from '@/components/commons/calendar/Calender';
import TimeSelector from '../TimeSelector';
import ReservationButton from '../ReservationButton';
import useDateStore from '@/libs/calendarStore';
import formatDateToYYYYMMDD from '@/utils/dateFormatter';
import { useSelectTimeStore } from '@/libs/calendarStore';
import data from '../mock.json';
import CloseIcon from '@/public/icons/btn-X-big.svg';

interface Props {
  handleClose: () => void;
}

export default function PopupCalendar({ handleClose }: Props) {
  const { date } = useDateStore();
  const { schedules } = data;
  const { selectTime } = useSelectTimeStore();
  const formatDate = formatDateToYYYYMMDD(date);
  const id = selectTime?.id;

  return (
    <div
      className="w-30 z-10 absolute top-0 right-0   bg-white rounded-2xl p-6 border border-gray200 "
      style={{ boxShadow: '0px 4px 16px rgba(17, 34, 17, 0.05)' }}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-h1 text-black200 ">날짜</p>
        <button>
          <CloseIcon onClick={handleClose} />
        </button>
      </div>
      <Calender />
      <TimeSelector schedules={schedules} selectedDate={formatDate} />
      <ReservationButton
        value={!!id}
        handleButtonClick={handleClose}
        text={'확인하기'}
      />
    </div>
  );
}
