import express from 'express';
import { sendSpecialOfferEmail } from '../services/notifications';
import { User } from '../models/User';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/send-special-offer', authenticateToken, async (req, res) => {
  try {
    const { userId, offerDetails } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await sendSpecialOfferEmail(user, offerDetails);
    res.status(200).json({ message: 'Special offer notification sent successfully' });
  } catch (error) {
    console.error('Error sending special offer notification:', error);
    res.status(500).json({ message: 'Error sending special offer notification' });
  }
});

export default router;

