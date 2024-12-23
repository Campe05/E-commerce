import { NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/app/models/User';
import { hashPassword } from '@/app/lib/auth';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await createUser(username, email, hashedPassword);

    return NextResponse.json({ message: 'User registered successfully', userId: newUser.id }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

