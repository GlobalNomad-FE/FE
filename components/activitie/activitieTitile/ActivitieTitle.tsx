import React from 'react';
import Image from 'next/image';
import data from '@/components/reservationWidget/mock.json';

/* TODO 데이터들어오는 값으로 바꿔야함 */

export default function ActivitieTitle() {
  const { subImageUrls: bioImage, bannerImageUrl } = data;
  return (
    <div>
      <div className="mt-[150px] flex justify-between max-w-[1200px] items-center">
        <div className=" flex flex-col">
          <div>{data.category}</div>
          <p className="text-title text-nomad-black mt-2.5 mb-4">타이틀</p>
          <div className="flex gap-[12px]">
            <div className="flex gap-[6px] items-center">
              <Image
                src="/icons/Star.svg"
                alt="별점아이콘"
                width={18}
                height={18}
              />
              <p className="text-body2-regular text-nomad-black">
                {data.rating} ({data.reviewCount})
              </p>
            </div>
            <div className="flex gap-[6px] items-center">
              <Image
                src="/icons/Location.svg"
                alt="주소핀아이콘"
                width={18}
                height={18}
              />
              <p className="text-body2-regular text-nomad-black">
                {data.address}{' '}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/icons/meatball.svg"
            width={40}
            height={40}
            alt="메뉴아이콘"
          />
        </div>
      </div>
      <div className="mt-[42px] flex h-[540px]  rounded-2xl overflow-hidden gap-[8px] ">
        <div className="w-[595px]  ">
          <img
            src={bannerImageUrl}
            alt="배너이미지"
            style={{ objectFit: 'cover', height: '100%' }}
          />
        </div>
        <div className="grid grid-cols-2 gap-[8px] ">
          {bioImage.map((list) => {
            return (
              <img
                src={list.imageUrl}
                alt="체험사진"
                key={list.id}
                style={{ objectFit: 'cover' }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
