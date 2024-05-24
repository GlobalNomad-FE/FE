// import penIcon from '/icons/penIcon.svg';
import Image from 'next/image';
import { useState } from 'react';
import AccountCheckIcon from '@/public/icons/account-check.svg';
import TextboxCheckIcon from '@/public/icons/textbox-check.svg';
import SettingCheckIcon from '@/public/icons/setting-check.svg';
import CalendarCheckIcon from '@/public/icons/calendar-check.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNavigationMenu() {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  const handleClick = (index: number) => {
    setSelectedItem(index);
  };

  //TODO - 주소 정해지면 경로 바꿔야함
  const menuItems = [
    {
      icon: AccountCheckIcon,
      alt: '내정보 아이콘',
      label: '내 정보',
      path: '/',
    },
    {
      icon: TextboxCheckIcon,
      alt: '예약내역 아이콘',
      label: '예약 내역',
      path: '/testMenuBar',
    },
    {
      icon: SettingCheckIcon,
      alt: '체험관리 아이콘',
      label: '내 체험 관리',
      path: '/aa',
    },
    {
      icon: CalendarCheckIcon,
      alt: '예약현황 아이콘',
      label: '예약 현황',
      path: '/bb',
    },
  ];

  return (
    <div className="w-[38.5rem] tablet:w-[25rem] flex flex-col bg-white border border-gray200 rounded-xl p-[2.4rem] gap-[2.4rem] ">
      <div className="flex justify-center relative">
        <div
          className="w-[16rem] h-[16rem] rounded-[160px] bg-gray200 overflow-hidden relative "
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
      <ul className="text-body1-bold flex flex-col gap-[0.8rem]">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <li
              className={`flex gap-[0.4rem] items-center rounded-[12px] h-[4.4rem] px-[1.6rem] py-[0.9rem] cursor-pointer
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
