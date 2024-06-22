import React, { useState, useEffect } from 'react';
import PopupCalender from './PopupCalendar';
import { formatDate } from '@/utils/dateFormatter';
import { useCalendar } from '../lib/Calendar.provider';
import { useMediaQuery } from 'react-responsive';

export default function TabletCalendar() {
  const { selectSchedule } = useCalendar();
  const date = selectSchedule?.date;
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 });
  const handleOpenCalender = () => {
    'use client';
    if (isTabletOrMobile) document.body.style.overflow = 'hidden';
    setIsCalenderOpen(true);
  };

  const handleCloseCalender = () => {
    'use client';
    if (isTabletOrMobile) document.body.style.overflow = 'auto';
    setIsCalenderOpen(false);
  };

  useEffect(() => {
    if (!isTabletOrMobile) {
      document.body.style.overflow = 'auto';
    }
  }, [isTabletOrMobile]);

  return (
    <>
      <div onClick={handleOpenCalender}>
        <p className="text-body1-medium text-green200 underline cursor-pointer">
          {date
            ? `${formatDate(date)} ${selectSchedule?.startTime}~${
                selectSchedule?.endTime
              }`
            : '날짜 선택하기'}
        </p>
      </div>
      {isCalenderOpen && (
        <div>
          <PopupCalender handleClose={handleCloseCalender} />
        </div>
      )}
    </>
  );
}
