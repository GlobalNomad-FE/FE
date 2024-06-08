import { useController } from 'react-hook-form';
import DatePickerInput from '../DatePickerInput';
import { useState } from 'react';
import Selectbox from '../Selectbox';
import Image from 'next/image';

interface InputProps {
  error?: string;
  name: string;
  control: any;
  placeholder: string;
  labelName: string;
}

export default function TimeInput({ labelName }: InputProps) {
  const [date, setDate] = useState('');

  const handleDate = (date) => {
    setDate(date);
  };

  const selectList = Array.from({ length: 25 }, (_, i) => ({
    value: `${i}:00`,
    label: `${i}:00`,
  }));

  return (
    <div>
      <div className="text-h2 text-black200 mb-6">{labelName}</div>
      <div className="flex gap-[10px] flex-col items-center">
        <div className="text-h3-regular text-gray600 mb-[8px] flex  w-full gap-5">
          <div className="w-[379px]">날짜</div>
          <div className="w-[140px]">시작 시간</div>
          <div className="w-[140px] ml-4">종료 시간</div>
        </div>
        <div className="flex gap-5 items-center">
          <DatePickerInput onSelectedDateChange={handleDate} />
          <div className="flex gap-3">
            <div className="w-[140px]">
              <Selectbox
                width="140px"
                placeholder="0:00"
                onSelect={handleDate}
                options={selectList}
              />
            </div>
            <Image src="/icons/물결.svg" width={14} height={26} alt="~아이콘" />
            <div className="w-[140px]">
              <Selectbox
                width="140px"
                placeholder="0:00"
                onSelect={handleDate}
                options={selectList}
              />
            </div>
          </div>
          <button>
            <Image
              src="/icons/time_plus.svg"
              width={56}
              height={56}
              alt="시간추가아이콘"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
