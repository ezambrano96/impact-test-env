#!/bin/bash

# Script to start the Impact.com test environment using Podman

echo "Starting Impact.com test environment with Podman..."

# Check if podman is installed
if ! command -v podman &> /dev/null; then
    echo "Error: Podman is not installed. Please install Podman first."
    exit 1
fi

# Check if podman-compose is installed
if ! command -v podman-compose &> /dev/null; then
    echo "Warning: podman-compose is not installed. Will use plain podman commands."
    
    # Create pod
    echo "Creating pod..."
    podman pod create --name impact-pod -p 3000:3000 -p 5000:5000 -p 27017:27017
    
    # Start MongoDB
    echo "Starting MongoDB..."
    podman run -d --pod=impact-pod --name=impact-mongo \
      -v ./mongo-init:/docker-entrypoint-initdb.d:Z \
      -v mongo-data:/data/db:Z \
      docker.io/mongo:latest
    
    # Build and start backend
    echo "Building and starting backend..."
    podman build -t impact-backend ./backend
    podman run -d --pod=impact-pod --name=impact-backend \
      -v ./backend:/app:Z \
      -e MONGODB_URI=mongodb://localhost:27017/impact_ecommerce \
      -e PORT=5000 \
      impact-backend
    
    # Build and start frontend
    echo "Building and starting frontend..."
    podman build -t impact-frontend ./frontend
    podman run -d --pod=impact-pod --name=impact-frontend \
      -v ./frontend:/app:Z \
      -e REACT_APP_API_URL=http://localhost:5000 \
      impact-frontend
else
    # Use podman-compose
    echo "Using podman-compose to start services..."
    podman-compose -f podman-compose.yml up -d
fi

echo ""
echo "Impact.com test environment is starting up!"
echo "- Frontend will be available at: http://localhost:3000"
echo "- Backend API will be available at: http://localhost:5000"
echo "- MongoDB will be available at: localhost:27017"
echo ""
echo "Use './podman-stop.sh' to stop the environment"