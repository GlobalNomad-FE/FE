import React, { useState } from 'react';
import PopupCalender from './PopupCalender';
import { useSelectTimeStore } from '@/libs/calendarStore';
import { formatDate } from '@/utils/dateFormatter';
import { se } from 'date-fns/locale/se';

export default function TabletCalender() {
  const { selectTime } = useSelectTimeStore();
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const date = selectTime?.date;

  const hadleOpenCalender = () => {
    setIsCalenderOpen(true);
  };

  const handleCloseCalender = () => {
    setIsCalenderOpen(false);
  };

  return (
    <>
      <div onClick={hadleOpenCalender}>
        <p className="text-body1-medium text-nomad-black underline">
          {date
            ? `${formatDate(date)} ${selectTime?.startTime}~${
                selectTime?.endTime
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
