import express from 'express';
import { Order } from '../models/Order';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Error fetching order history' });
  }
});

export default router;

