const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  size: String,
  color: String,
  quantity: Number
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: [stockSchema]
});

module.exports = mongoose.model('Product', productSchema);

