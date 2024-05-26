import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className="flex bottom-[0] h-40 fixed justify-between items-center content-center pt-8 pb-16 px-[104px] bg-nomad-black w-full">
      <div className="flex gap-64">
        <span className="text-gray500">©codeit - 2023</span>
        <div className="flex items-center gap-3">
          <span className="text-gray500">Privacy Policy</span>
          <span className="text-gray500">FAQ</span>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Link href="https://facebook.com/">
          <Image
            src="/icons/facebook.svg"
            height={20}
            width={20}
            alt="페이스북"
          />
        </Link>
        <Link href="https://twitter.com/">
          <Image src="/icons/twitter.svg" height={20} width={20} alt="트위터" />
        </Link>
        <Link href="https://youtube.com/">
          <Image src="/icons/youtube.svg" height={20} width={20} alt="유튜브" />
        </Link>
        <Link href="https://instagram.com/">
          <Image
            src="/icons/instagram.svg"
            height={20}
            width={20}
            alt="인스타그램"
          />
        </Link>
      </div>
    </div>
  );
}
