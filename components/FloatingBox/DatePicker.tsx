import React, { useState } from 'react';
import Calender from '../commons/calendar/Calender';
import TabletCalender from './Calender/TabletCalender';
import { useMediaQuery } from 'react-responsive';

const DatePicker = () => {
  const isDesktopOrTablet = useMediaQuery({ minWidth: 1024 });

  return (
    <div className="border-t border-t-gray200 mt-4">
      <p className="text-h3-bold text-black200 mt-4 mb-4">날짜</p>
      {/* pc-Calendar컴포넌트 , tablet-TabletCalender컴포넌트 */}
      {isDesktopOrTablet ? <Calender /> : <TabletCalender />}
    </div>
  );
};

export default DatePicker;
