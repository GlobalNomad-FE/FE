import React from 'react';
import { ReservationStatusCountType } from '@/types/activitiesReservationType';

interface Props {
  reservations: ReservationStatusCountType;
}

/**
 * 캘린더의 예약 관련 카운터 정보를 담은 칩 컴포넌트
 * @param data activitiesReservationType - ReservationStatusCountType
 */
const Chips: React.FC<Props> = ({ reservations }) => {
  const { pending, confirmed, completed } = reservations;

  return (
    <div className="flex flex-col h-[69px] w-[108.5px]">
      <div className="mb-2">
        {pending !== 0 && <StatusChipStyle count={pending} status="pending" />}
        {confirmed !== 0 && (
          <StatusChipStyle count={confirmed} status="confirmed" />
        )}
        {completed !== 0 && (
          <StatusChipStyle count={completed} status="completed" />
        )}
      </div>
    </div>
  );
};

interface StatusProps {
  status: string;
  count: number;
}

const StatusChipStyle: React.FC<StatusProps> = ({ status, count }) => {
  //status에 따른 기본 값 : pending(거절)
  let bgColor = 'blue300';
  let fontColor = 'white';
  let text = '예약';

  if (status !== 'pending') {
    if (status === 'confirmed') {
      //confirmed : 승인
      bgColor = '[#FFF4E8]';
      fontColor = '[#FF7C1D]';
      text = '승인';
    } else if (status === 'completed') {
      //completed : 완료
      bgColor = 'gray200';
      fontColor = 'gray600';
      text = '완료';
    }
  }

  return (
    <div
      className={`bg-${bgColor} text-${fontColor} rounded-[4px] px-1 py-[1px] text-[14px]`}
    >
      {text} {count}
    </div>
  );
};

export default Chips;
