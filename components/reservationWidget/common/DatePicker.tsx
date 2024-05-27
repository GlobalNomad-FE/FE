import React from 'react';
import Calender from '../../commons/calendar/Calendar';
import TabletCalendar from '../Calendar/TabletCalendar';
import useMediaQuery from '@/hooks/useMediaQuery';

const DatePicker = () => {
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  return (
    <div className="border-t border-t-gray200 mt-4">
      <p className="text-h3-bold text-black200 mt-4 mb-4">날짜</p>
      {/* pc-Calendar컴포넌트 , tablet-TabletCalender컴포넌트 */}
      {!isTablet ? <Calender /> : <TabletCalendar />}
    </div>
  );
};

export default DatePicker;
