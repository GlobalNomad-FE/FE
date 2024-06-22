'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useToggleButton } from '@/hooks/useToggleButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@/components/commons/avatar/avatar';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import Cookies from 'js-cookie';
import MyNotifications from '../myNotifications/MyNotifications';
import { useGetProfile } from '@/apis/user/useGetProfile';

export default function GNB() {
  const router = useRouter();
  const [Auth, setAuth] = useState(false);
  const { data: MyInfoData, isPending } = useGetProfile();

  const { isToggle: isDropdownOpen, handleToggleClick: isDropdownOpenToggle } =
    useToggleButton();

  const ref = useRef<HTMLButtonElement>(null);

  useOutsideClick(ref, isDropdownOpen, isDropdownOpenToggle);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    if (!Cookies.get('accessToken')) {
      isDropdownOpenToggle();
      router.push('/login');
    }
    window.location.reload();
  };

  const MyMenuList = [
    {
      icon: '/icons/account-check.svg',
      alt: '내정보 아이콘',
      label: '내 정보',
      path: '/myprofile',
    },
    {
      icon: '/icons/textbox-check.svg',
      alt: '예약내역 아이콘',
      label: '예약 내역',
      path: '/my-reservations',
    },
    {
      icon: '/icons/setting-check.svg',
      alt: '체험관리 아이콘',
      label: '내 체험 관리',
      path: '/activities',
    },
    {
      icon: '/icons/calendar-check.svg',
      alt: '예약현황 아이콘',
      label: '예약 현황',
      path: '/reservationHistory',
    },
    {
      icon: '/icons/logout-check.png',
      alt: '로그아웃 아이콘',
      label: '로그아웃',
      path: '',
      handleClick: handleLogout,
    },
  ];

  useEffect(() => {
    if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
      setAuth(true);
      return;
    }
    setAuth(false);
  }, []);

  if (isPending) {
    return null;
  }

  return (
    <div className="fixed top-0 text-black bg-white w-full h-[70px] border-b border-gray200 flex z-40">
      <div className="max-w-[1248px] w-full mx-auto flex items-center justify-between px-[24px]">
        <Link href="/">
          <Image
            src="/icons/logo_small.svg"
            alt="로고"
            height={28}
            width={166}
          />
        </Link>
        <div>
          {!Auth ? (
            <div className="flex gap-[25px] relative text-body2-regular font-medium text-black200">
              <Link href="/login">로그인</Link>
              <Link href="/signup">회원가입</Link>
            </div>
          ) : (
            <div className=" flex items-center gap-[25px] static">
              <MyNotifications />
              <div className="w-[1px] h-[22px] bg-gray200" />
              <div className=" flex relative gap-10">
                <div className="flex w-fit-content gap-[16px]">
                  <button
                    onClick={isDropdownOpenToggle}
                    ref={ref}
                    className="flex text-[16px] items-center body1-regular gap-[10px] text-nomad-black "
                  >
                    <Avatar profileImageUrl={MyInfoData?.profileImageUrl} />
                    {MyInfoData?.nickname}
                  </button>
                  {isDropdownOpen && (
                    <DropdownMenu dropdownMenuList={MyMenuList} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
