import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/app/models/User';
import { verifyPassword, createToken } from '@/app/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = createToken(user.id);

    return NextResponse.json({ token, userId: user.id });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

