import React from 'react';
import MinusIcon from '@/public/icons/minus-btn.svg';
import PlusIcon from '@/public/icons/plus-btn.svg';

const ParticipantCount = ({
  count,
  handleCountPlus,
  handleCountMinus,
}: {
  count: number;
  handleCountPlus: () => void;
  handleCountMinus: () => void;
}) => (
  <div className="flex flex-col gap-[12px] border-t border-t-gray200 pt-[1.2rem]">
    <p className="text-h3-bold text-green400">참여 인원 수</p>
    <div className="border border-gray200 rounded-md flex shadow-custom bg-white overflow-hidden w-[150px]">
      <button
        className="p-[1rem]"
        onClick={handleCountMinus}
        disabled={count <= 1}
      >
        <MinusIcon />
      </button>
      <div className="p-[8px] w-[52px] flex justify-center items-center text-body2-regular">
        {count}
      </div>
      <button className="p-[10px]" onClick={handleCountPlus}>
        <PlusIcon />
      </button>
    </div>
  </div>
);

export default ParticipantCount;
