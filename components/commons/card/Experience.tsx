'use client';

import Image from 'next/image';
import { useState } from 'react';
import ReviewModal from '../Popups/ReviewModal/ReviewModal';
import Menu from '@/components/activitie/Menu';
import Button from '../Button';
import BasePopupTwoBtns from '../Popups/BasePopupTwoBtns';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Reservation {
  id: number;
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  headCount?: number;
  experienceStatus?: string;
  totalPrice: number;
  bannerImageUrl: string;
  activityId?: number;
  rating?: number;
  reviewCount?: number;
  type: 'activities' | 'reservations';
}

/**
 * 이미지와 함께 체험정보와 예약상태를 볼 수 있는 카드 컴포넌트 입니다.
 * @param id 체험id
 * @param title 체험 제목
 * @param date 체험일
 * @param startTime 체험시작 시간
 * @param endTime 체험종료 시간
 * @param headCount 인원
 * @param experienceStatus 체험 상태. pending(보류), confirmed(확정), declined(거절) canceled(취소), completed(완료)
 * @param totalPrice 금액
 * @param bannerImageUrl 체험 이미지
 * @param activityId 예약 ID
 * @param rating 별점
 * @param reviewCount 리뷰 수
 * @param price 체험 가격
 * @param type 내 체험 관리 : 'activities' | 예약 내역 : 'reservations'
 */

const Experience = ({
  id,
  title,
  date = '',
  startTime = '',
  endTime = '',
  headCount = 0,
  totalPrice,
  experienceStatus,
  bannerImageUrl,
  activityId = 0,
  type,
  rating,
  reviewCount,
}: Reservation) => {
  const [status, setStatus] = useState(experienceStatus);
  const [openPopup, setOpenPopup] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const showAlert = () => {
    alert('취소가 완료되었습니다.');
    setStatus('canceled');
  };

  const textProps = () => {
    const textPropsObj = { color: '', text: '-' };

    switch (status) {
      case 'pending':
        textPropsObj.color = 'text-blue200';
        textPropsObj.text = '예약 완료';
        break;
      case 'confirmed':
        textPropsObj.color = 'text-[#FF7C1D]';
        textPropsObj.text = '예약 승인';
        break;
      case 'declined':
        textPropsObj.color = 'text-red100';
        textPropsObj.text = '예약 거절';
        break;
      case 'canceled':
        textPropsObj.color = 'text-gray500';
        textPropsObj.text = '예약 취소';
        break;
      case 'completed':
        textPropsObj.color = 'text-gray500';
        textPropsObj.text = '체험 완료';
        break;
    }

    return textPropsObj;
  };

  return (
    <div className="max-w-[792px] h-[204px] tablet:h-[156px] mobile:h-[128px] rounded-[24px] flex text-black200 text-[16px] bg-white">
      <div className="min-w-[204px] h-[204px] tablet:min-w-[156px] tablet:h-[156px] mobile:min-w-[128px] mobile:h-[128px] relative">
        <Image
          src={bannerImageUrl}
          alt="체험 이미지"
          fill
          object-fit="cover"
          className="rounded-l-[24px]"
        />
      </div>
      <div className="flex flex-col justify-between w-full p-6 tablet:p-[12px] mobile:p-[9px]">
        <div>
          {type === 'reservations' ? (
            <p className={`${textProps().color} font-bold mobile:text-[14px]`}>
              {textProps().text}
            </p>
          ) : (
            <div className="flex gap-[6px]">
              <Image
                src="/icons/star-on.svg"
                alt="별점아이콘"
                width={19}
                height={19}
              />
              <span>
                {rating} ({reviewCount})
              </span>
            </div>
          )}
          <p className="text-[20px] tablet:text-[18px] mobile:text-[14px] font-bold mt-2 tablet:m-0 mobile:mt-[5px]">
            {title}
          </p>
          {type === 'reservations' && (
            <p className="text-[18px] tablet:text-[14px] mobile:text-[12px] mt-3 tablet:mt-[5px] mobile:mt-[5px]">
              {date} · {startTime} - {endTime} · {headCount}명
            </p>
          )}
        </div>
        <div className="h-10 mobile:h-[32px] flex justify-between mt-4 tablet:mt-[12px] mobile:mt-[5px] items-center mobile:mr-[3px]">
          <p className="text-[24px] tablet:text-[20px] mobile:text-[16px] font-medium">
            {type === 'reservations'
              ? `₩${totalPrice.toLocaleString('ko-KR')}`
              : `₩${totalPrice.toLocaleString('ko-KR')} /인`}
          </p>
          <div className="">
            {status === 'pending' && (
              <>
                {isDesktop && (
                  <Button
                    width={144}
                    height={40}
                    fontSize={15}
                    btnColor={'white'}
                    textColor={'nomadBlack'}
                    textBold={true}
                    hover={true}
                    border={true}
                    onClick={handleOpenPopup}
                  >
                    예약취소
                  </Button>
                )}
                {isTablet && (
                  <Button
                    width={112}
                    height={40}
                    fontSize={15}
                    btnColor={'white'}
                    textColor={'nomadBlack'}
                    textBold={true}
                    hover={true}
                    border={true}
                    onClick={handleOpenPopup}
                  >
                    예약취소
                  </Button>
                )}
                {isMobile && (
                  <Button
                    width={80}
                    height={32}
                    fontSize={15}
                    btnColor={'white'}
                    textColor={'nomadBlack'}
                    textBold={true}
                    hover={true}
                    border={true}
                    onClick={handleOpenPopup}
                  >
                    예약취소
                  </Button>
                )}
                <BasePopupTwoBtns
                  buttonText="취소하기"
                  isOpen={openPopup}
                  closePopup={handleClosePopup}
                  clickEvent={showAlert}
                >
                  예약을 취소하시겠어요?
                </BasePopupTwoBtns>
              </>
            )}
            {status === 'completed' && (
              <ReviewModal
                title={title}
                bannerImageUrl={bannerImageUrl}
                date={date}
                startTime={startTime}
                endTime={endTime}
                headCount={headCount}
                totalPrice={totalPrice}
                reservationId={activityId}
              />
            )}
            {type === 'activities' && <Menu />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
