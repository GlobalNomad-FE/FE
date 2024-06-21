'use client';
import Image from 'next/image';
import { MouseEvent, useEffect, useState } from 'react';
import ReviewModal from '../Popups/ReviewModal/ReviewModal';
import Menu from '@/components/activitie/Menu';
import Button from '../Button';
import BasePopupTwoBtns from '../Popups/BasePopupTwoBtns';
import useMediaQuery from '@/hooks/useMediaQuery';
import useUpdateReservationStatus from '@/apis/my-reservations/usePatchMyReservations';
import { useRouter } from 'next/navigation';
import { ReservationsExperienceType } from './ExperienceType';
import { toast } from 'react-toastify';

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
 * @param reviewSubmitted 후기 작성 여부
 */
const ReservationsExperience = ({
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
  reviewSubmitted,
}: ReservationsExperienceType) => {
  const [status, setStatus] = useState(experienceStatus);
  const [openPopup, setOpenPopup] = useState(false);

  const { mutate: updateStatus } = useUpdateReservationStatus({
    onSuccess: () => {
      toast.success('취소가 완료되었습니다.');
      setStatus('canceled');
    },
    onError: () => {
      toast.error('취소에 실패했습니다.');
    },
  });

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const router = useRouter();

  const handleOpenPopup = (e: MouseEvent) => {
    e.preventDefault();
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const showAlert = () => {
    updateStatus({ reservationId: id, status: 'canceled' });
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

  useEffect(() => {
    if (status === 'confirmed') {
      const now = new Date();
      const endDateTime = new Date(`${date}T${endTime}`);
      if (now > endDateTime) {
        setStatus('completed');
      }
    }
  }, [date, endTime, status]);

  return (
    <button
      onClick={() => router.push(`activities/${activityId}`)}
      className="max-w-[792px] h-[204px] tablet:h-[156px] mobile:h-[128px] rounded-[24px] flex text-black200 text-[16px] bg-white"
      style={{ boxShadow: '0px 4px 16px 0px rgba(17, 34, 17, 0.05)' }}
    >
      <div className="min-w-[204px] h-[204px] tablet:min-w-[156px] tablet:h-[156px] mobile:min-w-[128px] mobile:h-[128px] relative">
        <Image
          src={bannerImageUrl}
          alt="체험 이미지"
          fill
          object-fit="cover"
          className="rounded-l-[24px]"
        />
      </div>
      <div className="flex flex-col justify-between w-full h-full p-6 text-left tablet:p-[12px] mobile:p-[9px]">
        <div>
          <p className={`${textProps().color} font-bold mobile:text-[14px]`}>
            {textProps().text}
          </p>
          <p className="text-[20px] tablet:text-[18px] mobile:text-[14px] font-bold mt-2 tablet:m-0 mobile:mt-[5px]">
            {title}
          </p>
          <p className="text-[18px] tablet:text-[14px] mobile:text-[12px] mt-3 tablet:mt-[5px] mobile:mt-[5px]">
            {date} · {startTime} - {endTime} · {headCount}명
          </p>
        </div>
        <div className="h-10 mobile:h-[32px] flex justify-between mt-4 tablet:mt-[12px] mobile:mt-[5px] items-center mobile:mr-[3px]">
          <p className="text-[24px] tablet:text-[20px] mobile:text-[16px] font-medium">
            ₩{totalPrice.toLocaleString('ko-KR')}
          </p>
          <div>
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
                reservationId={id}
                reviewSubmitted={reviewSubmitted}
              />
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ReservationsExperience;
