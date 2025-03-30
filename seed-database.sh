#!/bin/bash

echo "======================================================"
echo "Seeding Database for Impact.com Test Environment"
echo "======================================================"
echo

# Check if backend container is running
echo "Checking if backend container is running..."
if ! podman ps | grep -q impact-backend; then
  echo "❌ Backend container is not running!"
  echo "Please start the containers first using ./start-with-machine.sh"
  exit 1
fi

echo "Attempting to seed the database..."
podman exec impact-backend node -e "const seedDB = require('./utils/seedDB'); seedDB().then(() => console.log('Database seeding completed!')).catch(err => console.error('Error seeding database:', err))"

echo -e "\nVerifying products were inserted..."
podman exec impact-mongo mongosh --eval "db = db.getSiblingDB('impact_ecommerce'); console.log('Product count:', db.products.countDocuments({})); console.log('Sample product:'); db.products.findOne()"

echo -e "\n======================================================"
echo "If products were successfully seeded, try accessing:"
echo "Backend API: http://localhost:5001/api/products"
echo "Frontend: http://localhost:3000"
echo "======================================================"
