import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // ... otros campos existentes
  inventory: { type: Number, required: true, min: 0 },
});

export const Product = mongoose.model('Product', productSchema);

