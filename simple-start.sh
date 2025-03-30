#!/bin/bash

echo "Starting Impact.com test environment with simple Podman configuration..."

# Stop any existing containers
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
  -v ./mongo-init:/docker-entrypoint-initdb.d:Z \
  docker.io/mongo:latest

# Build and start backend
echo "Building and starting backend..."
cd backend && podman build -t impact-backend .
cd ..
podman run -d --name impact-backend \
  --network impact-network \
  -p 5000:5000 \
  -e MONGODB_URI=mongodb://impact-mongo:27017/impact_ecommerce \
  -e PORT=5000 \
  impact-backend

# Build and start frontend
echo "Building and starting frontend..."
cd frontend && podman build -t impact-frontend .
cd ..
podman run -d --name impact-frontend \
  --network impact-network \
  -p 3000:3000 \
  -e REACT_APP_API_URL=http://localhost:5000 \
  impact-frontend

echo "Waiting for services to start up..."
sleep 5

echo "Checking container status..."
podman ps

echo
echo "The application should now be accessible at: http://localhost:3000"