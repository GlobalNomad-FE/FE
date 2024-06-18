import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Chips from '@/components/reservationHistory/Chips';
import ReviewModal from '@/components/commons/Popups/ReviewModal/ReviewModal';
import ReservationInfoModal from '@/components/commons/Popups/ReservationHistory/ReservationInfoModal';
import useGetReservationDashboard from '@/apis/my-activitie-reservation-status/useGetReservationDashboard';
import { ReservationDayInfoType } from '@/types/activitiesReservationType';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface Props {
  selectedActivityId: number;
}

const Calendar = ({ selectedActivityId }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [isReservationModalOpen, setIsReeservationModalOpen] = useState(false);
  const [isSeletedDay, setIsSeletedDay] = useState(0);
  const [selectedReservationDate, setSelectedReservationDate] = useState({
    completed: 0,
    confirmed: 0,
    pending: 0,
  });

  const [dashboardData, setDashboardData] = useState(null);
  const shouldFetchData = selectedActivityId !== 0;

  const { data, isLoading, isError } = useGetReservationDashboard({
    activityId: shouldFetchData ? selectedActivityId : undefined,
    year: '2024',
    month: '06',
  });

  const handleCloseModal = () => {
    setIsReeservationModalOpen(false);
    setIsSeletedDay(0);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderHeader = () => {
    const dateFormat: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('kr-US', dateFormat).format(
      currentMonth,
    );

    return (
      <div className="flex justify-between items-center px-4 w-[342px] h-8">
        <div
          className="cursor-pointer"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
            )
          }
        >
          <Image
            src="/icons/prev.svg"
            alt="이전 월 아이콘"
            width={24}
            height={24}
          />
        </div>
        <div className="text-[20px] font-bold">{formattedDate}</div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
            )
          }
        >
          <Image
            src="/icons/next.svg"
            alt="다음 월 아이콘"
            width={24}
            height={24}
          />
        </div>
      </div>
    );
  };

  //요일 랜더링
  const renderDays = () => {
    return (
      <div
        style={{ minWidth: '326px' }}
        className="grid grid-cols-7 content-center justify-items-start w-[792px] tablet:w-[413px] mobile:w-[326px] h-[45px]  divide-x border-b"
      >
        {daysOfWeek.map((day, index) => (
          <div
            className="w-[61px] tablet:w-[61px] mobile:w-[37px] text-center font-medium text-[16px] p-3 pb-1 text-[#969696]"
            key={index}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  //날짜 랜더링
  const renderCells = () => {
    const monthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    );
    const startDate = startDayOfMonth(monthStart);
    const daysInMonth = getDaysInMonth(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
    );

    const prevMonthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0,
    ).getDate();

    const rows = [];
    let cells = [];

    // 이전 달의 날짜 채우기
    for (let i = startDate - 1; i >= 0; i--) {
      cells.push(
        <div
          className={`h-[154px] tablet:h-[125px] p-3 text-gray-200 text-[21px] bg-gray-100 ${
            i !== startDate - 1 && 'border-l'
          }`}
          key={`prev-${i}`}
        >
          <span>{prevMonthEnd - i}</span>
        </div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day + 1,
      );

      // 현재 날짜의 YYYY-MM-DD 형식 추출
      const currentDateStr = currentDate.toISOString().substring(0, 10);
      let dayData = {
        completed: 0,
        confirmed: 0,
        pending: 0,
      };

      //해당일에 예약이 있는 경우 값 셋팅
      data?.forEach(({ date, reservations }) => {
        if (date == currentDateStr) {
          dayData = { ...reservations };
        }
      });

      const { completed, confirmed, pending } = dayData;

      const iconCompleted = completed >= 1 && confirmed === 0 && pending === 0;
      const iconReservation = confirmed >= 1 || pending >= 1;

      cells.push(
        <div
          className={`h-[154px] tablet:h-[125px] p-[2px] text-[#969696] bg-white flex justify-between flex-col cursor-pointer ${
            cells.length !== 0 && 'border-l'
          } ${cells.length === 6 && 'border-r'} ${
            cells.length === 0 && 'rounded-bl-lg'
          }`}
          key={day}
          onClick={() => {
            setSelectedDate(currentDateStr);
            setIsReeservationModalOpen(true);
            setIsSeletedDay(day);
            setSelectedReservationDate(dayData);
          }}
        >
          <div className="pl-3 mobile:pl-1 pt-3 mobile:pt-1 text-[21px] mobile:text-[16px] flex flex-row">
            <div
              className={`${
                isSeletedDay === day &&
                'w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black text-[23px] mobile:text-[18px]'
              }`}
            >
              {day}
            </div>
            {(iconCompleted || iconReservation) && (
              <div className="h-10px mt-1 ml-1 w-2 h-2 relative">
                {iconCompleted && (
                  <Image
                    src="/icons/ellipse_gray.svg"
                    alt="예약 데이터 완료 표시 아이콘"
                    fill
                  />
                )}
                {iconReservation && (
                  <Image
                    src="/icons/ellipse_blue.svg"
                    alt="예약 데이터 예약 표시 아이콘"
                    fill
                  />
                )}
              </div>
            )}
          </div>
          <Chips reservations={dayData} />
        </div>,
      );

      if ((day + startDate) % 7 === 0) {
        rows.push(
          <div
            className="grid grid-cols-7 w-[792px] tablet:w-[413px] mobile:w-[326px] border-b"
            key={day}
          >
            {cells}
          </div>,
        );
        cells = [];
      }
    }

    // 다음 달의 날짜 채우기
    let day = 1;
    while (cells.length < 7) {
      cells.push(
        <div
          className={`h-[154px] tablet:h-[125px] p-3 text-gray-200 text-[21px] bg-gray-100 border-l ${
            cells.length === 6 && 'border-r rounded-br-lg'
          }`}
          key={`next-${day}`}
        >
          <span>{day}</span>
        </div>,
      );
      day++;
    }
    if (cells.length > 0) {
      rows.push(
        <div
          className="grid grid-cols-7 w-[792px] tablet:w-[413px] mobile:w-[326px] border-b-none"
          key="next"
        >
          {cells}
        </div>,
      );
    }

    return (
      <div
        style={{ minWidth: '326px' }}
        className="w-[792px] tablet:w-[413px] mobile:w-[326px]"
      >
        {rows}
      </div>
    );
  };

  return (
    <div className="mx-auto mt-10 w-[792px] tablet:w-[413px] mobile:w-[326px] flex flex-col items-center relative">
      {renderHeader()}
      <div
        className={`absolute right-0 top-12 ${
          !isReservationModalOpen && 'hidden'
        }`}
      >
        <ReservationInfoModal
          closePopup={handleCloseModal}
          selectedDate={selectedDate}
          selectedActivityId={selectedActivityId}
          reservationByDay={selectedReservationDate}
        />
      </div>
      <div
        style={{ minWidth: '326px' }}
        className="mt-6 w-full border-y border-l border-r rounded-t-lg rounded-b-lg bg-white"
      >
        {/* <div className="mt-6 w-full border-y border-x ounded-t-lg rounded-b-lg bg-white"> */}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
