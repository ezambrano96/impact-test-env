db = db.getSiblingDB('impact_ecommerce');

// Create collection (will be used later)
db.createCollection('products');
db.createCollection('orders');

// Create indexes
db.products.createIndex({ sku: 1 }, { unique: true });
db.orders.createIndex({ createdAt: -1 });