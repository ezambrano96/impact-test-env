#!/bin/bash

echo "======================================================"
echo "Starting Impact.com Test Environment with Podman Machine"
echo "======================================================"
echo

# First, make sure we're using the Podman machine
echo "Configuring Podman machine environment..."
eval $(podman machine env)

# Check if podman is properly configured
echo "Verifying Podman connection..."
podman info > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Error: Cannot connect to Podman. Please run ./setup-podman-machine.sh first."
    exit 1
fi

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
  docker.io/mongo:latest

# Build and start backend
echo "Building backend image..."
cd backend
podman build -t impact-backend .
cd ..

echo "Starting backend container..."
podman run -d --name impact-backend \
  --network impact-network \
  -p 5001:5001 \
  -e MONGODB_URI=mongodb://impact-mongo:27017/impact_ecommerce \
  -e PORT=5001 \
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

# Get the IP address of the Podman machine
PODMAN_IP=$(podman machine inspect --format '{{.NetworkSettings.IPAddress}}' 2>/dev/null || echo "localhost")

echo
echo "======================================================"
echo "The application should now be accessible at:"
echo "Frontend: http://$PODMAN_IP:3000"
echo "Backend API: http://$PODMAN_IP:5001"
echo "MongoDB: $PODMAN_IP:27017"
echo "======================================================"
echo
echo "If you're on macOS, the ports should be forwarded to localhost, so you can also access:"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5001"
echo "MongoDB: localhost:27017"
echo "======================================================"
