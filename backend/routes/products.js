const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    // TODO: Implementar filtrado, paginación y ordenamiento
    // Ejemplo:
    // const { category, page, limit, sortBy } = req.query;
    // const query = category ? { category } : {};
    // const products = await Product.find(query)
    //   .sort(sortBy)
    //   .skip((page - 1) * limit)
    //   .limit(Number(limit));
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Create one product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
    stock: req.body.stock
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one product
router.patch('/:id', getProduct, async (req, res) => {
  // TODO: Validar y sanitizar los datos de entrada
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.image != null) {
    res.product.image = req.body.image;
  }
  if (req.body.category != null) {
    res.product.category = req.body.category;
  }
  if (req.body.stock != null) {
    res.product.stock = req.body.stock;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Deleted Product' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for getting product object by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

module.exports = router;

// TODO: Implementar endpoints adicionales según sea necesario
// Por ejemplo:
// - Búsqueda de productos
// - Obtener productos por categoría
// - Actualizar stock de productos

