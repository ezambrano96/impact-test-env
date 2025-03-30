#!/bin/bash

echo "======================================================"
echo "Checking MongoDB Container Status and Data"
echo "======================================================"
echo

# Check if mongo container is running
echo "Checking if MongoDB container is running..."
if podman ps | grep -q impact-mongo; then
  echo "✅ MongoDB container is running"
else
  echo "❌ MongoDB container is NOT running!"
  echo "Trying to get more information..."
  podman ps -a | grep impact-mongo
fi

# Check MongoDB logs
echo -e "\nChecking MongoDB logs..."
podman logs impact-mongo | tail -n 20

# Try to connect to MongoDB and check collections
echo -e "\nAttempting to connect to MongoDB and check collections..."
podman exec impact-mongo mongosh --eval "db = db.getSiblingDB('impact_ecommerce'); db.getCollectionNames(); db.products.countDocuments({}); db.products.find().limit(1).pretty()"

echo -e "\n======================================================"
echo "Database seeding check"
echo "======================================================"

# Check backend logs for database seeding
echo "Checking backend logs for database seeding messages..."
podman logs impact-backend | grep -i "seed\|mongodb\|mongo\|database"

echo -e "\n======================================================"
echo "Possible solutions if no products are found:"
echo "1. Try restarting with the SEED_DB flag explicitly set:"
echo "   podman stop impact-backend"
echo "   podman rm impact-backend"
echo "   podman run -d --name impact-backend --network impact-network -p 5001:5001 -e MONGODB_URI=mongodb://impact-mongo:27017/impact_ecommerce -e PORT=5001 -e SEED_DB=true impact-backend"
echo "2. Alternatively, you can manually trigger database seeding by running:"
echo "   podman exec impact-backend node -e \"require('./utils/seedDB')()\""
echo "======================================================"
