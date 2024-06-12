import React, { useState } from 'react';
import PopupCalender from './PopupCalendar';
import { formatDate } from '@/utils/dateFormatter';
import { useCalendar } from '../lib/Calendar.provider';

export default function TabletCalendar() {
  const { selectSchedule } = useCalendar();
  const date = selectSchedule?.date;
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const hadleOpenCalender = () => {
    setIsCalenderOpen(true);
  };

  const handleCloseCalender = () => {
    setIsCalenderOpen(false);
  };

  return (
    <>
      <div onClick={hadleOpenCalender}>
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
