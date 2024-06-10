'use client';
import React from 'react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Menu from '../Menu';
import { ActivityDetail } from '@/apis/activities/useGetActivitiesDetail';

/* TODO 데이터들어오는 값으로 바꿔야함 (체험상세조회 api)*/
interface BioImageType {
  id: number;
  imageUrl: string;
}

export default function ActivitieTitle({ data }: { data: ActivityDetail }) {
  const { subImages: bioImage, bannerImageUrl } = data;

  const renderBioImages = (bioImage: BioImageType[]) => {
    switch (bioImage.length) {
      case 1:
        return (
          <img
            src={bioImage[0].imageUrl}
            alt="체험사진"
            key={bioImage[0].id}
            className="col-span-2 row-span-2 object-cover w-full h-full"
          />
        );
      case 2:
        return (
          <>
            <img
              src={bioImage[0].imageUrl}
              alt="체험사진"
              key={bioImage[0].id}
              className="col-span-2 row-span-1 object-cover w-full h-full"
            />
            <img
              src={bioImage[1].imageUrl}
              alt="체험사진"
              key={bioImage[1].id}
              className="col-span-2 row-span-1 object-cover w-full h-full"
            />
          </>
        );
      case 3:
        return (
          <>
            <img
              src={bioImage[0].imageUrl}
              alt="체험사진"
              key={bioImage[0].id}
              className="col-span-1 row-span-1 object-cover w-full h-full"
            />
            <img
              src={bioImage[1].imageUrl}
              alt="체험사진"
              key={bioImage[1].id}
              className="col-span-1 row-span-1 object-cover w-full h-full"
            />
            <img
              src={bioImage[2].imageUrl}
              alt="체험사진"
              key={bioImage[2].id}
              className="col-span-2 row-span-1 object-cover w-full h-full"
            />
          </>
        );
      default:
        return bioImage.map((list) => (
          <img
            src={list.imageUrl}
            alt="체험사진"
            key={list.id}
            className="col-span-1 row-span-1 object-cover w-full h-full"
          />
        ));
    }
  };

  const SampleNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        style={{
          position: 'absolute',
          top: 130,
          right: 10,
          zIndex: 2,
          opacity: 0.8,
        }}
      >
        <Image
          src="/icons/next_btn.svg"
          width={24}
          height={47}
          className="btn"
          onClick={onClick}
          alt="다음아이콘"
        />
      </div>
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 10,
          zIndex: 2,
          opacity: 0.8,
        }}
      >
        <Image
          src="/icons/prev_btn.svg"
          width={24}
          height={47}
          className="btn"
          onClick={onClick}
          alt="이전아이콘"
        />
      </div>
    );
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <div className="mt-[150px] flex justify-between max-w-[1200px] items-center">
        <div className="flex flex-col">
          <div>{data.category}</div>
          <p className="text-title text-nomad-black mt-2.5 mb-4">
            {data.title}
          </p>
          <div className="flex gap-[12px]">
            <div className="flex gap-[6px] items-center">
              <Image
                src="/icons/star-on.svg"
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
        <Menu />
      </div>
      <div className="mt-[42px] flex h-[540px] tablet:h-[310px] rounded-2xl overflow-hidden gap-2 tablet:gap-1 mobile:h-[310px] mobile:rounded-none">
        <div className="w-1/2 h-full mobile:hidden">
          <img
            src={bannerImageUrl}
            alt="배너이미지"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 h-[540px] tablet:h-[310px] mobile:w-full">
          <div className="mobile:hidden grid grid-cols-2 grid-rows-2 gap-2 tablet:gap-1 h-full">
            {renderBioImages(bioImage)}
          </div>
          <div className="mobile:block  ">
            <Slider {...settings}>
              <div>
                <img
                  src={bannerImageUrl}
                  alt="배너이미지"
                  className="object-cover w-full h-[310px]"
                />
              </div>
              {bioImage.map((list) => (
                <div key={list.id}>
                  <img
                    src={list.imageUrl}
                    alt="체험사진"
                    className="object-cover w-full h-[310px]"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
