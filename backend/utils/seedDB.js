const mongoose = require('mongoose');
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation technology.',
    price: 149.99,
    sku: 'HDPHN-001',
    image: 'https://via.placeholder.com/500x500?text=Headphones'
  },
  {
    name: 'Smart Watch',
    description: 'Advanced smartwatch with health tracking and notifications.',
    price: 199.99,
    sku: 'WATCH-002',
    image: 'https://via.placeholder.com/500x500?text=SmartWatch'
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable bluetooth speaker with 20hr battery life.',
    price: 79.99,
    sku: 'SPKR-003',
    image: 'https://via.placeholder.com/500x500?text=Speaker'
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant backpack with laptop compartment and USB charging port.',
    price: 59.99,
    sku: 'BKPK-004',
    image: 'https://via.placeholder.com/500x500?text=Backpack'
  },
  {
    name: 'Wireless Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 29.99,
    sku: 'CHRG-005',
    image: 'https://via.placeholder.com/500x500?text=Charger'
  },
  {
    name: 'Smart Home Hub',
    description: 'Central hub for controlling all your smart home devices.',
    price: 129.99,
    sku: 'HOME-006',
    image: 'https://via.placeholder.com/500x500?text=SmartHub'
  },
  {
    name: 'Ultra HD Monitor',
    description: '27-inch 4K monitor with HDR support for vivid colors.',
    price: 349.99,
    sku: 'MNTR-007',
    image: 'https://via.placeholder.com/500x500?text=Monitor'
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with customizable switches.',
    price: 89.99,
    sku: 'KBRD-008',
    image: 'https://via.placeholder.com/500x500?text=Keyboard'
  },
  {
    name: 'Ergonomic Mouse',
    description: 'Vertical ergonomic mouse designed for comfort during long sessions.',
    price: 49.99,
    sku: 'MOUSE-009',
    image: 'https://via.placeholder.com/500x500?text=Mouse'
  },
  {
    name: 'External SSD',
    description: '1TB portable SSD with USB-C connection for fast data transfers.',
    price: 159.99,
    sku: 'SSD-010',
    image: 'https://via.placeholder.com/500x500?text=SSD'
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

// Export the function for use in server.js or a separate seed script
module.exports = seedDatabase;