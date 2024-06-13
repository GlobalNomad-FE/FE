import React, { useState } from 'react';
import Button from '@/components/commons/Button';
import useMediaQuery from '@/hooks/useMediaQuery';
import Image from 'next/image';
import usePostReview from '@/apis/my-reservations/usePostReview';
import BasePopup from '@/components/commons/Popups/BasePopup';

interface Props {
  reservationId: number;
  closeModal: () => void;
}

const ReviewForm = ({ reservationId, closeModal }: Props) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { mutate } = usePostReview();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleStars = (clicked: number) => {
    setRating(clicked);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(
      {
        reservationId: reservationId,
        rating: rating,
        content: reviewText,
      },
      {
        onSuccess: () => {
          setPopupMessage('리뷰를 성공적으로 저장 했습니다.');
          setOpenPopup(true);
        },
        onError: (error: any) => {
          if (error.response) {
            setPopupMessage(error.response.data.message);
            setOpenPopup(true);
          } else {
            setPopupMessage(
              '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
            );
            setOpenPopup(true);
          }
        },
      },
    );
  };

  return (
    <>
      <div className={'flex justify-center gap-[8px] p-[12px]'}>
        {[1, 2, 3, 4, 5].map((id) => (
          <Image
            key={id}
            src={id <= rating ? '/icons/star-on.svg' : '/icons/star-off.svg'}
            alt={id <= rating ? '노란 별' : '빈 별'}
            width={56}
            height={56}
            onClick={() => handleStars(id)}
            className="cursor-pointer"
          />
        ))}
      </div>
      <form
        className="flex flex-col w-full mobile:gap-[12px] gap-[24px]"
        onSubmit={rating && reviewText ? handleSubmit : undefined}
      >
        <textarea
          className="text-black200 w-full px-[16px] py-[8px] border border-gray-500 rounded-[4px] text-body1-regular mobile:h-[346px] h-[240px]"
          placeholder="후기를 작성해주세요"
          value={reviewText}
          onChange={handleReviewChange}
        />
        <Button
          type="submit"
          width={'full'}
          height={isMobile ? 48 : 56}
          fontSize={16}
          textBold={true}
          btnColor={!rating || !reviewText ? 'gray' : 'nomadBlack'}
          textColor={'white'}
          rounded={4}
          hover={true}
          disabled={!rating || !reviewText}
        >
          작성하기
        </Button>
      </form>
      <BasePopup
        isOpen={openPopup}
        closePopup={handleClosePopup}
        closeAllPopup={
          popupMessage === '리뷰를 성공적으로 저장 했습니다.'
            ? closeModal
            : undefined
        }
      >
        {popupMessage}
      </BasePopup>
    </>
  );
};

export default ReviewForm;
