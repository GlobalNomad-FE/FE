import React, { useState } from 'react';
import PopupCalender from './PopupCalender';

export default function TabletCalender() {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const hadleOpenCalender = () => {
    setIsCalenderOpen(true);
  };
  return (
    <>
      <div onClick={hadleOpenCalender}>날짜 선택하기</div>
      {isCalenderOpen && (
        <div>
          <PopupCalender />
        </div>
      )}
    </>
  );
}
{
  /* 
TabletCalender 는 DatePicker컴포넌트에 들어감(창크기에 따라 선택되게 할꺼임)
날짜 선택하기 누르면 팝업 캘린더 켜져야함
*/
}
