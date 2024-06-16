import React from 'react';
import { ReservationStatusCountType } from '@/types/activitiesReservationType';

interface Props {
  reservations: ReservationStatusCountType;
}

/**
 * 캘린더의 예약 관련 카운터 정보를 담은 칩 컴포넌트
 * @param data activitiesReservationType - ReservationStatusCountType
 */
const Chips = ({ reservations }: Props) => {
  const { pending, confirmed, completed } = reservations;

  return (
    <div className="flex flex-col justify-end h-[69px] w-[108.5px] tablet:w-[55px] tablet:h-[23px] mobile:w-[45px] mobile:h-[20px]">
      {pending !== 0 && <StatusChipStyle count={pending} status="pending" />}
      {confirmed !== 0 && (
        <StatusChipStyle count={confirmed} status="confirmed" />
      )}
      {completed !== 0 && (
        <StatusChipStyle count={completed} status="completed" />
      )}
    </div>
  );
};

interface StatusProps {
  status: string;
  count: number;
}

const StatusChipStyle: React.FC<StatusProps> = ({ status, count }) => {
  let bgColor = '';
  let fontColor = '';
  let text = '';

  if (status === 'confirmed') {
    //confirmed : 승인
    bgColor = '[#FFF4E8]';
    fontColor = '[#FF7C1D]';
    text = '승인';
  } else if (status === 'pending') {
    //pending : 거절
    bgColor = '[#3366FF]';
    fontColor = 'white';
    text = '예약';
  } else {
    //completed : 완료
    bgColor = 'gray200';
    fontColor = 'gray600';
    text = '완료';
  }

  return (
    <div
      className={`bg-${bgColor} text-${fontColor} rounded-[4px] px-1 py-[1px] text-[14px] mobile:text-[12px]`}
    >
      {text} {count}
    </div>
  );
};

export default Chips;
