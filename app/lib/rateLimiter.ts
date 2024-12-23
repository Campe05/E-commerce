import { NextResponse } from 'next/server'

const WINDOW_SIZE = 60 * 1000 // 1 minute
const MAX_REQUESTS = 100 // Maximum requests per minute

interface RateLimitRecord {
  count: number
  resetTime: number
}

const ipMap = new Map<string, RateLimitRecord>()

export function rateLimiter(ip: string): NextResponse | null {
  const now = Date.now()
  const record = ipMap.get(ip) || { count: 0, resetTime: now + WINDOW_SIZE }

  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = now + WINDOW_SIZE
  } else {
    record.count++
  }

  ipMap.set(ip, record)

  if (record.count > MAX_REQUESTS) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  return null
}

