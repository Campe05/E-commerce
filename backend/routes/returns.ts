import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { createReturn } from '../services/returnService';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { orderNumber, productName, reason, description } = req.body;
    const userId = req.user.id;
    
    const returnRequest = await createReturn(userId, orderNumber, productName, reason, description);
    
    res.status(201).json(returnRequest);
  } catch (error) {
    console.error('Error creating return request:', error);
    res.status(500).json({ message: 'Error creating return request' });
  }
});

export default router;

