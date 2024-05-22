'use client'; // app라우터에서는 맨위에 이거 써야 훅 쓸수 있는것 같습니다

import React, { useState } from 'react';
import ModalBox from '@/components/commons/ModalBox';
import Pagination from '@/components/commons/Pagination';
import useModalStore from '@/libs/modalStore';
import Image from 'next/image';
import usePopupStore from '@/libs/popupStore';
import PopupBox from '@/components/commons/PopupBox';

//여기부터는 임시데이터 만드는 코드 (테스트를 위해 임시로 만든 데이터임)
const imageUrls: string[] = [
  '갈대숲',
  '석양',
  '숲',
  '스트릿댄스',
  '썰매견',
  '열기구-페스티벌',
  '열대어-구경',
  '자전거여행',
  '징검다리',
  '피오르체험',
];

interface Data {
  page: number;
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

const dataArray: Data[] = [];
const totalCount = 100;
for (let i = 0; i < totalCount; i++) {
  const page = Math.floor(i / 8) + 1;

  const newData: Data = {
    page: page,
    id: i + 1,
    title: `체험${i + 1}`,
    price: 5000 + 1000 * i,
    bannerImageUrl: imageUrls[i % imageUrls.length],
    rating: parseFloat((5.0 - 0.1 * i).toFixed(1)),
    reviewCount: 0 + i,
  };

  dataArray.push(newData);
}
//여기까지

export default function Page() {
  const { openModal, setOpenModal } = useModalStore();
  const { openPopup, setOpenPopup } = usePopupStore();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const handleOpenTestModal = () => {
    setOpenModal('openTestModal');
  };

  const handleOpenTest2Modal = () => {
    setOpenModal('openTest2Modal');
  };

  const handleOpenTestPopup = () => {
    setOpenPopup('가입이 완료되었습니다!');
  };

  return (
    <main className="p-10 bg-white">
      <div className="grid grid-cols-4">
        {dataArray
          .filter((item) => item.page === currentPage)
          .map((item) => (
            <div className="text-black200" key={item.id}>
              <div className="relative w-[283px] h-[283px] rounded-3xl overflow-hidden">
                <Image
                  src={`/images/${item.bannerImageUrl}.png`}
                  alt={item.bannerImageUrl}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                {item.rating}, {item.reviewCount}
              </div>
              <div>{item.title}</div>
              <div>{item.price}</div>
            </div>
          ))}
      </div>
      <Pagination
        totalCount={totalCount}
        size={8}
        onPageChange={handlePageChange}
      />
      {openModal && <ModalBox />}
      {openPopup && <PopupBox />}
    </main>
  );
}
