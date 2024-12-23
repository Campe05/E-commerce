import express from 'express';
import { Discount } from '../models/Discount';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/apply', authenticateToken, async (req, res) => {
  try {
    const { code, orderId } = req.body;
    const discount = await Discount.findOne({ code, validUntil: { $gt: new Date() } });
    if (!discount) {
      return res.status(404).json({ message: 'Invalid or expired discount code' });
    }
    // Apply discount to order (you'll need to implement this logic)
    // For example: await Order.findByIdAndUpdate(orderId, { $set: { discount: discount.percentage } });
    res.status(200).json({ message: 'Discount applied successfully', discount: discount.percentage });
  } catch (error) {
    console.error('Error applying discount:', error);
    res.status(500).json({ message: 'Error applying discount' });
  }
});

export default router;

