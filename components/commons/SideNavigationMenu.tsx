// import penIcon from '/icons/penIcon.svg';
// import profileIcon from '/icons/account-check.svg';
import Image from 'next/image';
import { useState } from 'react';

export default function SideNavigationMenu() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (index) => {
    setSelectedItem(index);
  };

  const menuItems = [
    {
      icon: '/icons/account-check.svg',
      alt: '내정보 아이콘',
      label: '내 정보',
    },
    {
      icon: '/icons/textbox-check.svg',
      alt: '예약내역 아이콘',
      label: '예약 내역',
    },
    {
      icon: '/icons/setting-check.svg',
      alt: '체험관리 아이콘',
      label: '내 체험 관리',
    },
    {
      icon: '/icons/calendar-check.svg',
      alt: '예약현황 아이콘',
      label: '예약 현황',
    },
  ];

  return (
    <div className="w-[38.5rem] tablet:w-[25rem] flex flex-col bg-white border border-gray200 rounded-xl p-[2.4rem] gap-[2.4rem] ">
      <div className="flex justify-center relative">
        <div
          className="w-[16rem] h-[16rem] rounded-[16rem] bg-gray200 overflow-hidden relative "
          style={{ boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)' }}
        >
          <Image
            src="/images/mangom.jpeg"
            alt="기본프로필이미지"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="absolute tablet:right-[30px] right-[90px] bottom-0 z-99 cursor-pointer">
          <Image
            src="/icons/penIcon.svg"
            alt="수정아이콘"
            width={44}
            height={44}
          />
        </div>
      </div>
      <ul className="text-[#A1A1A1] text-body1-bold flex flex-col gap-[0.8rem]">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex gap-[0.4rem] items-center rounded-[1.2rem] h-[4.4rem] px-[1.6rem] py-[0.9rem] cursor-pointer
          ${
            selectedItem === index
              ? 'bg-green400 text-black200'
              : 'hover:bg-green400 hover:text-black200'
          }`}
            onClick={() => handleClick(index)}
          >
            <Image src={item.icon} alt={item.alt} width={24} height={24} />
            <p>{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
