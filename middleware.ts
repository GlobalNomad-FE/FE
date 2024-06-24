import { NextResponse, NextRequest } from 'next/server';

// 허용된 페이지 목록
const AUTH_PAGES = ['/login', '/signup'];

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;
  const accessToken = cookies.get('accessToken');

  // 로그인이 필요 없는 페이지
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (accessToken) {
      return NextResponse.next();
    } else {
      return NextResponse.next();
    }
  }

  // 로그인이 필요한 페이지
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

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
