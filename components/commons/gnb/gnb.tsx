'use client';

import instance from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useToggleButton } from '@/hooks/useToggleButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@/components/commons/avatar/avatar';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import { myInfo } from '@/types/myInfo';
import Cookies from 'js-cookie';
import MyNotifications from '../myNotifications/MyNotifications';

export default function GNB() {
  const router = useRouter();
  const [Auth, setAuth] = useState(false);
  const { isToggle: isDropdownOpen, handleToggleClick: isDropdownOpenToggle } =
    useToggleButton();
  const {
    isToggle: isNotificationOpen,
    handleToggleClick: isNotificationOpenToggle,
  } = useToggleButton();
  const ref = useRef<HTMLButtonElement>(null);

  useOutsideClick(ref, isDropdownOpen, isDropdownOpenToggle);

  const getMyInfo = async () => {
    const { data } = await instance.get<myInfo>('/users/me');
    return data;
  };

  const { data: MyInfoData, isPending } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    retry: 1,
  });

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    if (!Cookies.get('accessToken')) {
      isDropdownOpenToggle();
      router.push('/login');
    }
  };

  const handleMyPageClick = () => {
    isDropdownOpenToggle();
    router.push('/mypage');
  };

  const MyMenuList = [
    {
      text: '내 정보',
      handleClick: handleMyPageClick,
    },
    {
      text: '로그아웃',
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
    <div className="fixed top-0 bg-white w-full h-[70px] border-b border-gray200 flex z-40">
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
            <div className=" flex items-center gap-[40px] static">
              <MyNotifications />
              <div className="flex relative">
                <div className="h-[35.2px] border-r-[1px_gray300]" />
                <div className="flex w-fit-content">
                  <Avatar profileImageUrl={MyInfoData?.profileImageUrl} />
                  <button
                    onClick={isDropdownOpenToggle}
                    ref={ref}
                    className="flex text-[16px] items-center body1-regular text-[nomad-black]"
                  >
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
