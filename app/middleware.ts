import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

export async function middleware(request: NextRequest) {
  const res = await limiter(request as any, NextResponse as any);
  return res || NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};

