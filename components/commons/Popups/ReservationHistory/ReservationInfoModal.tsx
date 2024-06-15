import Image from 'next/image';
import React, { useRef, useState } from 'react';
import SelectBox from '@/components/reservationHistory/SelectBox';

const ReservationInfoModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenModal(false);
  };
  return (
    <div className="w-[429px] h-[697px] rounded-3xl border border-[#DDD] bg-white p-6 text-black200">
      <div className="h-[67px] flex justify-between items-center">
        <h1 className="text-h1 text-black200">예약 정보</h1>
        <Image
          src="/icons/btn-X-big.svg"
          alt="닫기 버튼"
          width={40}
          height={40}
          onClick={handleCloseModal}
          className="cursor-pointer"
        />
      </div>
      <div className="flex gap-[22px] ">
        <div className="text-[20px] text-green200 font-semibold">신청 1</div>
        <div className="text-[20px] text-[#4B4B4B]">승인 4</div>
        <div className="text-[20px] text-[#4B4B4B]">거절 5</div>
      </div>
      <div className="border mt-3"></div>
      <div>
        <h2 className="text-h2 text-black200 mt-7">예약날짜</h2>
        <p className="my-4 text-[20px]">2024년 6월 15일</p>
        <div className="p-4 text-[16px] border">14:00 ~15 : 00</div>
        {/* <SelectBox /> */}
      </div>
      <div className="mt-8">
        <h2 className="text-h2 text-black200">예약내역</h2>
        <div className="p-4 border border-gray200 rounded mt-4">
          <div className="text-[16px]">
            <div className="flex gap-[10px]">
              <p>닉네임</p> <p>정만철</p>
            </div>
            <div className="flex gap-[10px]">
              <p>인원</p> <p>12명</p>
            </div>
          </div>
          <div className="flex justify-end text-[16px] gap-4">
            <button>승인하기</button>
            <button>거절하기</button>
          </div>
        </div>
        <div className="p-4 border border-gray200 rounded mt-4">
          <div className="text-[16px]">
            <div className="flex gap-[10px]">
              <p>닉네임</p> <p>정만철</p>
            </div>
            <div className="flex gap-[10px]">
              <p>인원</p> <p>12명</p>
            </div>
          </div>
          <div className="flex justify-end text-[16px] gap-4">
            <button>승인하기</button>
            <button>거절하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationInfoModal;
