import React from 'react';
import Button from '@/components/commons/Button';
import Rating from './Rating';
import useMediaQuery from '@/hooks/useMediaQuery';

const ReviewForm = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <Rating />
      <form
        className={`flex flex-col w-full  ${
          isMobile ? 'gap-[12px]' : 'gap-[24px]'
        }`}
        // onSubmit={handleSubmit}
      >
        <textarea
          className={`w-full px-[16px] py-[8px] border border-gray-500 rounded-[4px] text-body1-regular ${
            isMobile ? 'h-[346px]' : 'h-[240px]'
          }`}
          placeholder="후기를 작성해주세요"
        />
        <Button
          type="submit"
          width={'full'}
          height={isMobile ? 48 : 56}
          fontSize={16}
          textBold={true}
          btnColor={'nomadBlack'}
          textColor={'white'}
          rounded={4}
          hover={true}
        >
          작성하기
        </Button>
      </form>
    </>
  );
};

export default ReviewForm;
