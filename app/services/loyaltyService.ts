import { LoyaltyProgram } from '../models/LoyaltyProgram';
import { User } from '../models/User';

export async function addPointsToUser(userId: string, points: number, reason: string) {
  const loyaltyProgram = await LoyaltyProgram.findOneAndUpdate(
    { userId },
    { 
      $inc: { points },
      $push: { pointsHistory: { amount: points, reason } }
    },
    { new: true, upsert: true }
  );

  // Update tier based on total points
  if (loyaltyProgram.points >= 10000) {
    loyaltyProgram.tier = 'Platinum';
  } else if (loyaltyProgram.points >= 5000) {
    loyaltyProgram.tier = 'Gold';
  } else if (loyaltyProgram.points >= 1000) {
    loyaltyProgram.tier = 'Silver';
  }

  await loyaltyProgram.save();
  return loyaltyProgram;
}

export async function getLoyaltyProgramForUser(userId: string) {
  return await LoyaltyProgram.findOne({ userId });
}

