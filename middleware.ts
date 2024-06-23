import { NextResponse, NextRequest } from 'next/server';

const AUTH_PAGES = ['/', '/login'];

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;
  const accessToken = cookies.get('userID');

  // 로그인이 필요 없는 페이지
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    // 로그인 되어 있는 경우 메인 페이지로 리다이렉트
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      return NextResponse.next();
    }
  }

  // 로그인이 필요한 페이지
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // accessToken이 있는 경우 요청 계속 진행
  return NextResponse.next();
}

// 특정 경로(인가가 필요한 페이지)로 요청했을 때 쿠키에 토큰이 없으면 로그인 페이지로 리다이렉트됩니다.
export const config = {
  matcher: [
    '/myprofile',
    '/activities',
    '/my-reservations',
    '/reservationHistory',
  ],
};
