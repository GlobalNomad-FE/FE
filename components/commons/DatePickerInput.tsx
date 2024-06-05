import DatePicker from 'react-datepicker';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { DateType } from '../input/TimeInput';
import 'react-datepicker/dist/react-datepicker.css';
import './DateInput.css';

interface SelectDateProps {
  onSelectedDateChange: (date: DateType) => void; // 선택된 날짜 변경 시 호출될 콜백 함수
}

/**
 * 캘린더 선택이 가능한 inputBox입니다.
 * @param onSelectedDateChange 날짜 선택 시 실행될 함수(date를 넘겨줍니다.)
 */
const DatePickerInput: React.FC<SelectDateProps> = ({
  onSelectedDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<DateType>(new Date());

  const datePickerRef = useRef<DatePicker>(null);

  const handleImageClick = () => {
    datePickerRef.current?.setFocus();
  };

  return (
    <div className="relative w-full h-[56px]">
      <DatePicker
        ref={datePickerRef}
        className="text-black200 border border-black100 rounded px-[16px] py-[8px] bg-white h-[56px] text-[16px] w-full"
        dateFormat="YY/MM/dd"
        selected={selectedDate}
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
