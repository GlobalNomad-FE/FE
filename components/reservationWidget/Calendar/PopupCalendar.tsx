'use client';
import React from 'react';
import Calendar from '@/components/commons/calendar/Calendar';
import TimeSelector from '@common/TimeSelector';
import ReservationButton from '@common/ReservationButton';
import ParticipantCount from '@common/ParticipantCount';
import CloseIcon from '@/public/icons/btn-X-big.svg';
import { useMediaQuery } from 'react-responsive';
import { useCalendar } from '../lib/Calendar.provider';

interface Props {
  handleClose: () => void;
}

export default function PopupCalendar({ handleClose }: Props) {
  const { members, onChangeMembers, selectSchedule, data } = useCalendar();
  const id = selectSchedule?.id;
  //TODO: api로 불러오는 데이터 Provider로 관리예정
  const { schedules } = data;

  const handleCountPlus = () => {
    onChangeMembers(members + 1);
  };
  const handleCountMinus = () => {
    onChangeMembers(members > 1 ? members - 1 : 1);
  };
  const isTabletOrMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      className="mobile:overflow-y-scroll flex h-fit flex-col justify-between w-30 top-0 right-0 z-[5] bg-white rounded-2xl p-6 border border-gray200 mobile:w-full mobile:border-none mobile:h-full mobile:fixed tablet:absolute"
      style={{ boxShadow: '0px 4px 16px rgba(17, 34, 17, 0.05)' }}
    >
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <p className="text-h1 text-black200 ">날짜</p>
          <button>
            <CloseIcon onClick={handleClose} />
          </button>
        </div>
        <Calendar />
        <TimeSelector schedules={schedules} />
        {isTabletOrMobile || (
          <ParticipantCount
            count={members}
            handleCountPlus={handleCountPlus}
            handleCountMinus={handleCountMinus}
          />
        )}
      </div>
      <div className="w-full mobile:mt-8">
        <ReservationButton
          value={!!id}
          handleButtonClick={handleClose}
          text={'확인하기'}
        />
      </div>
    </div>
  );
}
