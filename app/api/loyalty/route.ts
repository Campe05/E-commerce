import { NextResponse } from 'next/server';
import { getLoyaltyProgramForUser } from '../../services/loyaltyService';
import { authenticateToken } from '../../middleware/auth';

export async function GET(req: Request) {
  try {
    const userId = await authenticateToken(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loyaltyProgram = await getLoyaltyProgramForUser(userId);
    return NextResponse.json(loyaltyProgram);
  } catch (error) {
    console.error('Error fetching loyalty program:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

