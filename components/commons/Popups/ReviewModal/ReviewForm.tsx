import React from 'react';
import Button from '@/components/commons/Button';
import Rating from './Rating';

const ReviewForm = () => {
  return (
    <>
      <Rating />
      <form
        className="flex flex-col w-full gap-[24px]"
        // onSubmit={handleSubmit}
      >
        <textarea
          className="w-full h-[240px] px-[16px] py-[8px] border border-gray-500 rounded-[4px] text-body1-regular"
          placeholder="후기를 작성해주세요"
        />
        <Button
          type="submit"
          width={'full'}
          height={56}
          fontSize={16}
          textBold={true}
          btnColor={'green'}
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
