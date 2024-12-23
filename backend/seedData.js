const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/database');

// Load environment variables
require('dotenv').config();

// Connect to the database
connectDB();

// Sample product data
const products = [
  {
    name: 'CrossFit T-Shirt',
    description: 'Comfortable and breathable t-shirt for your workouts',
    price: 29.99,
    image: '/images/crossfit-tshirt.jpg',
    category: 'Apparel',
    stock: [
      { size: 'S', color: 'Black', quantity: 10 },
      { size: 'M', color: 'Black', quantity: 15 },
      { size: 'L', color: 'Black', quantity: 20 },
      { size: 'S', color: 'White', quantity: 10 },
      { size: 'M', color: 'White', quantity: 15 },
      { size: 'L', color: 'White', quantity: 20 },
    ]
  },
  {
    name: 'Weightlifting Belt',
    description: 'Durable leather belt for heavy lifts',
    price: 49.99,
    image: '/images/weightlifting-belt.jpg',
    category: 'Equipment',
    stock: [
      { size: 'S', color: 'Black', quantity: 5 },
      { size: 'M', color: 'Black', quantity: 10 },
      { size: 'L', color: 'Black', quantity: 15 },
    ]
  },
  {
    name: 'Jump Rope',
    description: 'High-speed jump rope for cardio workouts',
    price: 19.99,
    image: '/images/jump-rope.jpg',
    category: 'Equipment',
    stock: [
      { size: 'One Size', color: 'Black', quantity: 30 },
      { size: 'One Size', color: 'Red', quantity: 25 },
    ]
  }
];

// Function to seed the database
const seedDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();

