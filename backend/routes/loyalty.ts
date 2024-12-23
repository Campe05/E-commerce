import express from 'express';
import { getLoyaltyProgramForUser, addPointsToUser } from '../services/loyaltyService';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const loyaltyProgram = await getLoyaltyProgramForUser(req.user.id);
    res.json(loyaltyProgram);
  } catch (error) {
    next(error);
  }
});

router.post('/add-points', authenticateToken, async (req, res, next) => {
  try {
    const { points, reason } = req.body;
    const updatedLoyaltyProgram = await addPointsToUser(req.user.id, points, reason);
    res.json(updatedLoyaltyProgram);
  } catch (error) {
    next(error);
  }
});

export default router;

