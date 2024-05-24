import DatePicker from 'react-datepicker';
import Image from 'next/Image';
import { useState, useRef } from 'react';

import 'react-datepicker/dist/react-datepicker.css';

interface SelectDateProps {
  selectDate: Date | null; // 선택된 날짜를 받을 props
  onSelectedDateChange: (date: Date | null) => void; // 선택된 날짜 변경 시 호출될 콜백 함수
}

const DatePickerInput: React.FC<SelectDateProps> = ({
  selectDate,
  onSelectedDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const datePickerRef = useRef<DatePicker>(null);

  const handleImageClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  return (
    <div className="relative w-[379px] h-[56px]">
      <DatePicker
        ref={datePickerRef}
        className="text-black200 border border-black100 rounded px-[16px] py-[8px] bg-white w-[379px] h-[56px] text-[16px]"
        dateFormat="YY/MM/dd"
        selected={selectDate || selectedDate}
        onChange={(date) => {
          onSelectedDateChange(date);
          setSelectedDate(date);
        }}
        minDate={new Date()}
      />
      <Image
        className="absolute top-4 right-3 cursor-pointer"
        alt="달력아이콘"
        src="/icons/calendar-minimalistic.svg"
        width={27.3}
        height={27.3}
        onClick={handleImageClick}
      />
    </div>
  );
};

export default DatePickerInput;
