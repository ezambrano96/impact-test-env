#!/bin/bash

echo "======================================================"
echo "Restarting Impact.com Test Environment with Database Seeding"
echo "======================================================"
echo

# First, make sure we're using the Podman machine
echo "Configuring Podman machine environment..."
eval $(podman machine env) || true

# Stop and remove existing containers
echo "Stopping any existing containers..."
podman stop impact-frontend impact-backend impact-mongo 2>/dev/null || true
podman rm impact-frontend impact-backend impact-mongo 2>/dev/null || true

# Create a network for the containers
echo "Creating a network..."
podman network create impact-network 2>/dev/null || true

# Start MongoDB
echo "Starting MongoDB..."
podman run -d --name impact-mongo \
  --network impact-network \
  -p 27017:27017 \
  -v mongo-data:/data/db:Z \
  docker.io/mongo:latest

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to start up..."
sleep 5

# Build and start backend with explicit SEED_DB flag
echo "Building backend image..."
cd backend
podman build -t impact-backend .
cd ..

echo "Starting backend container with database seeding enabled..."
podman run -d --name impact-backend \
  --network impact-network \
  -p 5001:5001 \
  -e MONGODB_URI=mongodb://impact-mongo:27017/impact_ecommerce \
  -e PORT=5001 \
  -e SEED_DB=true \
  impact-backend

# Build and start frontend
echo "Building frontend image..."
cd frontend
podman build -t impact-frontend .
cd ..

echo "Starting frontend container..."
podman run -d --name impact-frontend \
  --network impact-network \
  -p 3000:3000 \
  -e REACT_APP_API_URL=http://localhost:5001 \
  impact-frontend

echo "Waiting for services to start up..."
sleep 5

echo "Checking container status..."
podman ps

# Verify database was seeded
echo -e "\nVerifying database seeding..."
sleep 2
podman exec impact-mongo mongosh --eval "db = db.getSiblingDB('impact_ecommerce'); console.log('Product count:', db.products.countDocuments({}));"

echo
echo "======================================================"
echo "The application should now be accessible at:"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5001/api/products"
echo "MongoDB: localhost:27017"
echo "======================================================"
