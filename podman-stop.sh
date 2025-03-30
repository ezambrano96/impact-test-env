#!/bin/bash

# Script to stop the Impact.com test environment running on Podman

echo "Stopping Impact.com test environment..."

# Check if podman-compose is installed
if ! command -v podman-compose &> /dev/null; then
    echo "Using podman commands to stop containers..."
    
    # Stop and remove containers
    podman stop impact-frontend impact-backend impact-mongo || true
    podman rm impact-frontend impact-backend impact-mongo || true
    
    # Remove pod
    podman pod rm impact-pod || true
else
    # Use podman-compose
    echo "Using podman-compose to stop services..."
    podman-compose -f podman-compose.yml down
fi

echo "Environment stopped successfully!"