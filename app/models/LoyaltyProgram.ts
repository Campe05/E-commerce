import mongoose from 'mongoose';

const loyaltyProgramSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  tier: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum'], default: 'Bronze' },
  pointsHistory: [{
    amount: Number,
    reason: String,
    date: { type: Date, default: Date.now }
  }]
});

export const LoyaltyProgram = mongoose.model('LoyaltyProgram', loyaltyProgramSchema);

