import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import SelectBox from '@/components/reservationHistory/SelectBox';
import ReservationInfo from '@/components/reservationHistory/ReservationInfo';
import { ModalReservationStatusCountType } from '@/types/activitiesReservationType';
import useGetReservedSchedule from '@/apis/my-activitie-reservation-status/useGetReservedSchedule';
import useGetReservedTime from '@/apis/my-activitie-reservation-status/useGetReservedTime';

interface Props {
  closePopup: () => void;
  selectedDate: string;
  selectedActivityId: number | undefined;
  isModalOpen: boolean;
}

const ReservationInfoModal: React.FC<Props> = ({
  closePopup,
  selectedDate,
  selectedActivityId,
  isModalOpen,
}) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<
    number | undefined
  >();
  const [selectTab, setSelectTab] = useState('pending');

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //YYYY년 MM월 DD일
  const handleDateFormat = () => {
    const dateParts = selectedDate.split('-');
    return `${dateParts[0]}년 ${dateParts[1]}월 ${dateParts[2]}일`;
  };

  // 내 체험 날짜별 예약정보(신청, 승인, 거절)이 있는 스케쥴 조회
  const shouldFetchData = isModalOpen && selectedActivityId !== undefined;
  const {
    data: dayReservations,
    isLoading: dayReservationIsLoading,
    isError: dayReservationsIsError,
  } = useGetReservedSchedule(
    {
      activityId: selectedActivityId,
      date: selectedDate,
    },
    shouldFetchData,
  );

  const statusTotalCounts = dayReservations?.reduce(
    (acc, reservation) => {
      acc.declined += reservation.count.declined;
      acc.confirmed += reservation.count.confirmed;
      acc.pending += reservation.count.pending;
      return acc;
    },
    { declined: 0, confirmed: 0, pending: 0 },
  );

  const handleSelect = (scheduleId: number | undefined) => {
    setSelectedScheduleId(scheduleId);
  };

  useEffect(() => {
    handleSelect(undefined);
    setSelectTab('pending');
    setSelectedScheduleId(undefined);
  }, [selectedDate]);

  // 내 체험 예약 시간대별 예약 내역 조회
  const {
    data: reservedTimeData,
    isLoading: reservedTimeIsLoading,
    isError: reservedTimeIsError,
  } = useGetReservedTime(
    {
      activityId: selectedActivityId,
      scheduleId: selectedScheduleId,
      status: selectTab,
    },
    shouldFetchData,
  );

  const selectDate = handleDateFormat();

  return (
    <div
      ref={modalRef}
      className={`w-[429px] ${
        selectTab === 'pending' ? 'h-[697px]' : 'h-[645px]'
      } rounded-3xl border border-[#DDD] bg-white p-6 text-black200 z-20 absolute ml-[-420px]`}
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
            selectTab === 'pending' && 'text-green200 font-semibold'
          } cursor-pointer`}
          onClick={() => setSelectTab('pending')}
        >
          신청 {statusTotalCounts?.pending || 0}
        </div>
        <div
          className={`text-[20px] ${
            selectTab === 'confirmed' && 'text-green200 font-semibold'
          } cursor-pointer`}
          onClick={() => setSelectTab('confirmed')}
        >
          승인 {statusTotalCounts?.confirmed || 0}
        </div>
        <div
          className={`text-[20px] ${
            selectTab === 'declined' && 'text-green200 font-semibold'
          } cursor-pointer`}
          onClick={() => setSelectTab('declined')}
        >
          거절 {statusTotalCounts?.declined || 0}
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
            selectTab !== 'pending' &&
            (selectTab === 'confirmed' ? 'ml-[72px]' : 'ml-[144px]')
          }`}
        ></div>
      </div>
      <div className="h-[420px]">
        <div>
          <h2 className="text-[20px] font-semibold text-black200 mt-7">
            예약날짜
          </h2>
          <p className="my-4 text-[20px]">{selectDate}</p>
          <SelectBox
            selectedDate={selectedDate}
            reservations={dayReservations}
            onSelect={handleSelect}
          />
        </div>
        <div className="mt-8">
          <h2 className="text-[20px] font-semibold text-black200">예약내역</h2>
          <div
            className={`${
              selectTab === 'pending' && 'h-[286px] overflow-scroll'
            } mt-4`}
          >
            {reservedTimeData?.reservations.map((reservationInfo, index) => (
              <ReservationInfo
                key={index}
                selectTab={selectTab}
                reservationInfo={reservationInfo}
              />
            ))}
          </div>
        </div>
      </div>
      {selectTab !== 'pending' && (
        <div className="flex justify-between text-[24px] font-semibold font-black200">
          <p>예약 현황</p>
          <p>
            {statusTotalCounts
              ? statusTotalCounts.pending + statusTotalCounts.confirmed
              : 0}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReservationInfoModal;
