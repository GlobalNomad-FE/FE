'use client';
import Image from 'next/image';
import { formatDate2 } from '@/utils/dateFormatter';
import { ReviewsType } from '@/types/reviewsType';
import Pagination from './commons/Pagination';
import { useState } from 'react';
import { useGetActivitiesReviews } from '@/apis/activities/useGetActivitesReviews';

export default function ReviewTable({ id }: { id: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetActivitiesReviews(id, currentPage, 3);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {data &&
        data.reviews.map((item: ReviewsType) => {
          const { user } = item;
          const { profileImageUrl, nickname } = user;
          return (
            <div
              className="flex gap-4 border-t border-gray400 py-6 first:border-none first:pt-0"
              key={item.id}
            >
              <div
                style={{ minHeight: '45px', minWidth: '45px' }}
                className="w-[45px] h-[45px] rounded-[45px] bg-gray200 overflow-hidden relative"
              >
                {profileImageUrl && (
                  <Image
                    src={profileImageUrl}
                    alt="기본프로필이미지"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <p className="text-nomad-black text-body1-bold">{nickname}</p>
                  <p>|</p>
                  <p className="text-gray400 text-body1-regular">
                    {formatDate2(item.updatedAt)}
                  </p>
                </div>
                <div className="text-nomad-black text-body1-regular">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      {data && (
        <Pagination
          totalCount={data.totalCount}
          itemsInPage={3}
          visiblePages={5}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
