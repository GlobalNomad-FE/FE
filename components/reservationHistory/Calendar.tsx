import Image from 'next/image';

const Calendar = () => {
  return (
    <div className="text-[#969696]">
      <div className="w-[800px] tablet:w-[429px] mobile:w-full flex justify-center">
        <div className="w-[342px] mobile:w-full flex justify-between my-[30px] tablet:my-[24px]">
          <Image
            src="./icons/prev.svg"
            alt="이전 월 아이콘"
            width={24}
            height={24}
          />
          <p className="text-[20px] font-bold">2023년 2월</p>
          <Image
            src="./icons/next.svg"
            alt="다음 월 아이콘"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className="w-[800px] tablet:w-[429px] mobile:w-full h-[813px] border bg-white rounded-lg border-[#E8E8E8]">
        <p className="">달력 컴포넌트 분리</p>
      </div>
    </div>
  );
};

export default Calendar;
