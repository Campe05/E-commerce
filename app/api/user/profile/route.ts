import { NextResponse } from 'next/server'
import pool from '@/app/lib/db'
import { verifyToken } from '@/app/lib/jwt'

async function authenticate(request: Request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) {
    return null
  }

  const token = authHeader.split(' ')[1]
  const payload = verifyToken(token)

  if (!payload) {
    return null
  }

  const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [payload.userId])
  return result.rows[0]
}

export async function GET(request: Request) {
  try {
    const user = await authenticate(request)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

