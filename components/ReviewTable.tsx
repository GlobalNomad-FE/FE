'use client';
import Image from 'next/image';
import { formatDate2 } from '@/utils/dateFormatter';
import { ReviewsType, ReviewsDataType } from '@/types/reviewsType';
import Pagination from './commons/Pagination';
import { useState } from 'react';

interface ReviewTableProps {
  data: ReviewsDataType;
}

//TODO - 데이터 연동하면 페이지네이션 수정할것.
export default function ReviewTable({ data }: ReviewTableProps) {
  const { totalCount, reviews } = data;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {reviews.map((list: ReviewsType) => {
        const { user } = list;
        const { profileImageUrl, nickname } = user;
        return (
          <div
            className="flex gap-4 border-b border-gray400 py-6 last:border-none first:pt-0"
            key={list.id}
          >
            <div className="w-[45px] h-[45px] rounded-[45px] bg-gray200 overflow-hidden relative">
              <Image
                src={profileImageUrl}
                alt="기본프로필이미지"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <p className="text-nomad-black text-body1-bold">{nickname}</p>
                <p>|</p>
                <p className="text-gray400 text-body1-regular">
                  {formatDate2(list.updatedAt)}
                </p>
              </div>
              <div className="text-nomad-black text-body1-regular">
                {list.content}
              </div>
            </div>
          </div>
        );
      })}
      <Pagination
        totalCount={totalCount}
        itemsInPage={3}
        visiblePages={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
