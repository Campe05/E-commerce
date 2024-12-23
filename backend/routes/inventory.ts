import express from 'express';
import { Product } from '../models/Product';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();

router.put('/update/:productId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    const { inventory } = req.body;
    const product = await Product.findByIdAndUpdate(productId, { inventory }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Inventory updated successfully', product });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ message: 'Error updating inventory' });
  }
});

export default router;

