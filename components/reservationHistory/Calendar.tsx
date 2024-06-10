import Image from 'next/image';
import React, { useState } from 'react';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  /**
   * 달력 상단 월 표시
   */
  const renderHeader = () => {
    const dateFormat: Intl.DateTimeFormatOptions = {
      month: 'long',
      year: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', dateFormat).format(
      currentMonth,
    );

    return (
      <div className="flex justify-between items-center px-4 w-[342px]">
        <div
          className="cursor-pointer"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
            )
          }
        >
          <Image
            src="./icons/prev.svg"
            alt="이전 월 아이콘"
            width={24}
            height={24}
          />
        </div>
        <div className="text-lg font-semibold">{formattedDate}</div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
            )
          }
        >
          <Image
            src="./icons/next.svg"
            alt="다음 월 아이콘"
            width={24}
            height={24}
          />
        </div>
      </div>
    );
  };

  /**
   * 달력 요일 표시
   */
  const renderDays = () => {
    return (
      <div className="grid grid-cols-7 w-[792px]">
        {daysOfWeek.map((day, index) => (
          <div className="text-center font-medium text-[16px]" key={index}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  /**
   * 달력 일 표시
   */
  const renderCells = () => {
    const monthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    );
    const monthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    );
    const startDate = startDayOfMonth(monthStart);
    const daysInMonth = getDaysInMonth(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
    );

    const rows = [];
    let cells = [];

    for (let i = 0; i < startDate; i++) {
      cells.push(<div className="col empty" key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
      );
      const isSelected =
        currentDate.toDateString() === selectedDate.toDateString();
      cells.push(
        <div
          className={`p-4 text-center cursor-pointer ${
            isSelected ? 'bg-blue-500 text-white rounded-full' : ''
          }`}
          key={day}
          onClick={() => setSelectedDate(currentDate)}
        >
          <span>{day}</span>
        </div>,
      );

      if ((day + startDate) % 7 === 0 || day === daysInMonth) {
        rows.push(
          <div className="grid grid-cols-7 w-[792px]" key={day}>
            {cells}
          </div>,
        );
        cells = [];
      }
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="mx-auto mt-10 w-[792px] flex flex-col items-center">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
