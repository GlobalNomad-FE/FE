import Image from 'next/image';
import { Activity, MyActivitieType } from '@/types/myActivitiesType';
import { useState } from 'react';

interface SelectBoxProps {
  myActivityes: Activity[];
  onSelect: (id: number) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ myActivityes, onSelect }) => {
  const [selectActivity, setSelectActivity] = useState<Activity | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (activity: Activity) => {
    setSelectActivity(activity);
    setIsOpen(false);
    onSelect(activity.id); // 선택된 활동의 id 값을 상위 컴포넌트로 전달
  };

  return (
    <div className="relative w-[800px] tablet:w-[429px] mobile:w-full h-[48px] mt-[42px]">
      <div
        className="px-4 py-3 border border-gray500 rounded-[4px] bg-white flex justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="bg-white w-[45px] px-1 text-[14px] bottom-10 absolute">
          체험명
        </p>
        <p className="text-[16px]">
          {selectActivity ? selectActivity.title : '체험을 선택하세요'}
        </p>
        <Image
          src="./icons/arrow_down.svg"
          alt="아래 화살표 아이콘"
          width={24}
          height={24}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray500 rounded-[4px] mt-1 max-h-60 overflow-auto">
          {myActivityes.map((activity) => (
            <li
              key={activity.id}
              className="px-4 py-2 text-[16px] cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(activity)}
            >
              {activity.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
