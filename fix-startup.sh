#!/bin/bash

echo "Attempting to fix the startup issues..."

# Stop any existing containers
echo "Stopping any existing containers..."
podman stop impact-frontend impact-backend impact-mongo 2>/dev/null || true
podman rm impact-frontend impact-backend impact-mongo 2>/dev/null || true
podman pod rm impact-pod 2>/dev/null || true

# Check if podman is properly installed
echo "Checking Podman installation..."
podman --version || { echo "Podman is not properly installed. Please install Podman first."; exit 1; }

# Create a network for the containers
echo "Creating a network..."
podman network create impact-network 2>/dev/null || true

# Create a pod for the containers
echo "Creating pod..."
podman pod create --name impact-pod -p 3000:3000 -p 5000:5000 -p 27017:27017

# Start MongoDB
echo "Starting MongoDB..."
podman run -d --pod=impact-pod --name=impact-mongo \
  -v mongo-data:/data/db:Z \
  docker.io/mongo:latest

# Build and start backend
echo "Building and starting backend..."
podman build -t impact-backend ./backend
podman run -d --pod=impact-pod --name=impact-backend \
  -e MONGODB_URI=mongodb://localhost:27017/impact_ecommerce \
  -e PORT=5000 \
  impact-backend

# Build and start frontend
echo "Building and starting frontend..."
podman build -t impact-frontend ./frontend
podman run -d --pod=impact-pod --name=impact-frontend \
  -e REACT_APP_API_URL=http://localhost:5000 \
  impact-frontend

echo "Waiting for services to start up..."
sleep 5

echo "Checking container status..."
podman ps

echo
echo "The application should now be accessible at: http://localhost:3000"
echo "If you still can't access it, try running ./check-status.sh for more diagnostics."