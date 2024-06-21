import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 쿠키에서 accessToken 가져오기
  const accessToken = request.cookies.get('accessToken');
  console.log('Access Token:', accessToken);

  // accessToken이 없는 경우 로그인 페이지로 리다이렉트
  if (!accessToken) {
    console.log('Redirecting to /login due to missing access token');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // accessToken이 있는 경우 요청 계속 진행
  return NextResponse.next();
}

// 특정 경로(인가가 필요한 페이지)로 요청했을 때 쿠키에 토큰이 없으면 로그인 페이지로 redirect됩니다.
export const config = {
  matcher: ['/myprofile/:path*'],
};
