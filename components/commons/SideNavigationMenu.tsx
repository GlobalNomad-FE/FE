// SideNavigationMenu.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';
import AccountCheckIcon from '@/public/icons/account-check.svg';
import TextboxCheckIcon from '@/public/icons/textbox-check.svg';
import SettingCheckIcon from '@/public/icons/setting-check.svg';
import CalendarCheckIcon from '@/public/icons/calendar-check.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileImage from '../myProfile/ProfileImage';
import useUserStore from '@/libs/useUserStore';

export default function SideNavigationMenu() {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const { uploadedImage, setUploadedImage } = useUserStore(); // zustand 스토어 사용
  const [nickname] = useState<string>('기본 닉네임');

  const handleClick = (index: number) => {
    setSelectedItem(index);
  };

  const menuItems = [
    {
      icon: AccountCheckIcon,
      alt: '내정보 아이콘',
      label: '내 정보',
      path: '/myprofile',
    },
    {
      icon: TextboxCheckIcon,
      alt: '예약내역 아이콘',
      label: '예약 내역',
      path: '/my-reservations',
    },
    {
      icon: SettingCheckIcon,
      alt: '체험관리 아이콘',
      label: '내 체험 관리',
      path: '/activities',
    },
    {
      icon: CalendarCheckIcon,
      alt: '예약현황 아이콘',
      label: '예약 현황',
      path: '/reservationHistory',
    },
  ];

  return (
    <div
      className="w-[385px] h-[432px] tablet:w-[250px] flex flex-col bg-white border border-gray200 rounded-xl p-[24px] gap-[24px] mobile:hidden"
      style={{ boxShadow: '0px 4px 16px 0px rgba(17, 34, 17, 0.05)' }}
    >
      <div className="flex justify-center relative">
        <div
          className="w-[160px] h-[160px] rounded-[160px] bg-gray200 overflow-hidden relative "
          style={{ boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)' }}
        >
          <ProfileImage
            nickname={nickname}
            profileImageUrl="/images/mangom.jpeg"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>
        <div className="absolute bottom-0 z-2 cursor-pointer">
          <Image
            src="/icons/penIcon.svg"
            alt="수정아이콘"
            width={44}
            height={44}
          />
        </div>
      </div>
      <ul className="text-body1-bold flex flex-col gap-[8px]">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <li
              className={`flex gap-[4px] items-center rounded-[12px] h-[44px] px-[16px] py-[9px] cursor-pointer
          ${
            selectedItem === index || item.path === pathname
              ? 'bg-green400 text-black200'
              : 'hover:bg-green400 hover:text-black200 text-[#A1A1A1]'
          }`}
              onClick={() => handleClick(index)}
            >
              <item.icon />
              <p>{item.label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
