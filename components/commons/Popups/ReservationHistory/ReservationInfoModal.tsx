import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import SelectBox from '@/components/reservationHistory/SelectBox';
import ReservationInfo from '@/components/reservationHistory/ReservationInfo';
import { ReservationStatusCountType } from '@/types/activitiesReservationType';

interface Props {
  closePopup: () => void;
  selectedDate: string;
  selectedActivityId: number;
  reservationByDay: ReservationStatusCountType;
}

const ReservationInfoModal = ({
  closePopup,
  selectedDate,
  selectedActivityId,
  reservationByDay,
}: Props) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    declined: 0,
    confirmed: 0,
    pending: 0,
  });
  const [selectTab, setSelectTab] = useState('신청');

  //YYYY년 MM월 DD일
  const handleDateFormat = () => {
    // 문자열을 Date 객체로 변환
    const dateParts = selectedDate.split('-');

    return dateParts[0] + '년 ' + dateParts[1] + '월 ' + dateParts[2] + '일';
  };

  // TODO : 내 체험 날짜별 예약정보(신청, 승인, 거절)이 있는 스케쥴 조회
  ///{teamId}/my-activities/{activityId}/reserved-schedule
  //selectBox 및 상태별 카운팅을 위한 목업 데이터
  const dayReservations = [
    {
      scheduleId: 3991,
      startTime: '4:00',
      endTime: '5:00',
      count: {
        declined: 0, //거절
        confirmed: 0, //승인
        pending: 1, //신청
      },
    },
    {
      scheduleId: 3992,
      startTime: '7:00',
      endTime: '8:00',
      count: {
        declined: 0,
        confirmed: 0,
        pending: 1,
      },
    },
    {
      scheduleId: 3993,
      startTime: '11:00',
      endTime: '13:00',
      count: {
        declined: 2,
        confirmed: 3,
        pending: 5,
      },
    },
  ];

  useEffect(() => {
    const totalCounts = dayReservations.reduce(
      (acc, reservation) => {
        acc.declined += reservation.count.declined;
        acc.confirmed += reservation.count.confirmed;
        acc.pending += reservation.count.pending;
        return acc;
      },
      { declined: 0, confirmed: 0, pending: 0 },
    );
    setStatusCounts(totalCounts);
  }, []);

  const handleSelect = (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  };

  const selectDate = handleDateFormat();

  handleDateFormat();
  return (
    <div
      className={`w-[429px] ${
        selectTab === '신청' ? 'h-[697px]' : 'h-[645px]'
      } rounded-3xl border border-[#DDD] bg-white p-6 text-black200`}
    >
      <div className="h-[35px] flex justify-between items-center">
        <h1 className="text-h1 text-black200">예약 정보</h1>
        <Image
          src="/icons/btn-X-big.svg"
          alt="닫기 버튼"
          width={40}
          height={40}
          onClick={closePopup}
          className="cursor-pointer"
        />
      </div>
      <div className="flex gap-[22px] mt-8 pl-2">
        <div
          className={`text-[20px] ${
            selectTab === '신청' && 'text-green200 font-semibold'
          } cursor-pointer`}
          onClick={() => setSelectTab('신청')}
        >
          신청 {statusCounts.pending}
        </div>
        <div
          className={`text-[20px] ${
            selectTab === '승인' && 'text-green200 font-semibold'
          } cursor-pointer`}
          onClick={() => setSelectTab('승인')}
        >
          승인 {statusCounts.confirmed}
        </div>
        <div
          className={`text-[20px] ${
            selectTab === '거절' && 'text-green200 font-semibold'
          } cursor-pointer`}
          onClick={() => setSelectTab('거절')}
        >
          거절 {statusCounts.declined}
        </div>
      </div>
      <div className="mt-3 relative">
        <Image
          src="/icons/modal-line.svg"
          alt="모달 내용 구분선 이미지"
          width={427}
          height={0}
        />
        <div
          className={`w-[72px] h-1 bg-green200 rounded-xl mt-[-2px] absolute ${
            selectTab !== '신청' &&
            (selectTab === '승인' ? 'ml-[72px]' : 'ml-[144px]')
          }`}
        ></div>
      </div>
      <div>
        <h2 className="text-[20px] font-semibold text-black200 mt-7">
          예약날짜
        </h2>
        <p className="my-4 text-[20px]">{selectDate}</p>
        <SelectBox reservations={dayReservations} onSelect={handleSelect} />
      </div>
      <div className="mt-8">
        <h2 className="text-[20px] font-semibold text-black200">예약내역</h2>
        <div
          className={`${
            selectTab === '신청' && 'h-[286px] overflow-scroll'
          } mt-4`}
        >
          <ReservationInfo selectTab={selectTab} />
        </div>
      </div>
      {selectTab !== '신청' && (
        <div className="mt-[80px]  flex justify-between text-[24px] font-semibold font-black200">
          <p>예약 현황</p>
          <p>5</p>
        </div>
      )}
    </div>
  );
};

export default ReservationInfoModal;
