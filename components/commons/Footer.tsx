import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bottom-0 flex h-24 w-full min-w-[400px] items-center justify-between whitespace-nowrap border-none bg-nomad-black p-0 px-20 text-white mobile:px-0">
      <div className="flex w-full items-center justify-between justify-items-center pb-6 mobile:flex-col">
        <div className="flex w-3/5 justify-between gap-4">
          <div className=" text-gray600 "> @codeit - 2024 </div>
          <div className="flex gap-5 whitespace-nowrap ">
            <div className=" text-gray600">Privacy Policy</div>
            <div className=" text-gray600">FAQ</div>
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
            <Image
              src="/icons/twitter.svg"
              height={20}
              width={20}
              alt="트위터"
            />
          </Link>
          <Link href="https://youtube.com/">
            <Image
              src="/icons/youtube.svg"
              height={20}
              width={20}
              alt="유튜브"
            />
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
    </footer>
  );
}
