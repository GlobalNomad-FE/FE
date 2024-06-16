import Image from 'next/image';
import React, { useRef, useState } from 'react';
import SelectBox from '@/components/reservationHistory/SelectBox';

const ReservationInfoModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectTab, setSelectTab] = useState('신청');

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenModal(false);
  };
  return (
    <div
      className={`w-[429px] ${
        selectTab === '신청' ? 'h-[697px]' : 'h-[645px]'
      } rounded-3xl border border-[#DDD] bg-white p-6 text-black200`}
    >
      <div className="h-[35px] flex justify-between items-center">
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
      <div className="flex gap-[22px] mt-8 pl-2">
        <div
          className={`text-[20px] ${
            selectTab === '신청' && 'text-green200 font-semibold'
          } cursor-pointer`}
          onClick={() => setSelectTab('신청')}
        >
          신청 1
        </div>
        <div
          className={`text-[20px] ${
            selectTab === '승인' && 'text-green200 font-semibold'
          } cursor-pointer`}
          onClick={() => setSelectTab('승인')}
        >
          승인 4
        </div>
        <div
          className={`text-[20px] ${
            selectTab === '거절' && 'text-green200 font-semibold'
          } cursor-pointer`}
          onClick={() => setSelectTab('거절')}
        >
          거절 5
        </div>
      </div>
      <div className="mt-3 relative">
        <Image
          src="/icons/modal-line.svg"
          alt="모달 내용 구분선 이미지"
          width={427}
          height={0}
        />
        <div
          className={`w-[72px] h-1 bg-green200 rounded-xl mt-[-2px] absolute ${
            selectTab !== '신청' &&
            (selectTab === '승인' ? 'ml-[72px]' : 'ml-[144px]')
          }`}
        ></div>
      </div>
      <div>
        <h2 className="text-[20px] font-semibold text-black200 mt-7">
          예약날짜
        </h2>
        <p className="my-4 text-[20px]">2024년 6월 15일</p>
        <div className="p-4 text-[16px] border">14:00 ~15 : 00</div>
        {/* <SelectBox /> */}
      </div>
      <div className="mt-8">
        <h2 className="text-[20px] font-semibold text-black200">예약내역</h2>
        <div
          className={`${
            selectTab === '신청' && 'h-[286px] overflow-scroll'
          } mt-4`}
        >
          <div className="p-4 border border-gray200 rounded mt-4">
            <div className="text-[16px]">
              <div className="flex gap-[10px]">
                <p className="text-gray500 font-semibold">닉네임</p>{' '}
                <p className="text-black200 font-medium">정만철</p>
              </div>
              <div className="flex gap-[10px]">
                <p className="text-gray500 font-semibold">인원</p>{' '}
                <p className="text-black200 font-medium">12명</p>
              </div>
            </div>
            <div className="flex justify-end text-[16px] gap-4">
              {selectTab === '신청' ? (
                <>
                  <button>승인하기</button>
                  <button>거절하기</button>
                </>
              ) : selectTab === '승인' ? (
                <button>예약승인</button>
              ) : (
                <button>예약거절</button>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTab !== '신청' && (
        <div className="mt-[80px]  flex justify-between text-[24px] font-semibold font-black200">
          <p>예약 현황</p>
          <p>5</p>
        </div>
      )}
    </div>
  );
};

export default ReservationInfoModal;
