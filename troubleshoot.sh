#!/bin/bash

echo "============================================"
echo "Impact.com Test Environment Troubleshooting"
echo "============================================"
echo

# Check Podman version
echo "Podman version:"
podman --version
echo

# Check system information
echo "System information:"
uname -a
echo

# Check if podman can run a basic container
echo "Testing basic container functionality:"
podman run --rm hello-world 2>&1 || echo "Failed to run hello-world container"
echo

# Check if there are any existing containers
echo "Existing containers:"
podman ps -a
echo

# Check volumes
echo "Existing volumes:"
podman volume ls
echo

# Check network configuration
echo "Network configuration:"
podman network ls
echo

# Check if ports are already in use
echo "Checking if ports are already in use:"
echo "Port 3000:"
lsof -i:3000 2>/dev/null || echo "Port 3000 appears to be available"
echo "Port 5000:"
lsof -i:5000 2>/dev/null || echo "Port 5000 appears to be available"
echo "Port 27017:"
lsof -i:27017 2>/dev/null || echo "Port 27017 appears to be available"
echo

# Try to build the frontend image
echo "Attempting to build frontend image:"
cd frontend && podman build -t impact-frontend . 2>&1
echo

echo "Troubleshooting complete. Check the output above for any errors."