import { NextResponse } from 'next/server';

export function middleware(req) {
  const theme = req.cookies.get('theme') || 'light';
  const response = NextResponse.next();
  response.headers.set('Set-Cookie', `theme=${theme}; Path=/`);
  return response;
}
