#!/bin/bash

# Script to clean up Podman resources for Impact.com test environment

echo "Cleaning up Impact.com test environment resources..."

# Stop everything first
./podman-stop.sh

# Remove volumes
echo "Removing volumes..."
podman volume rm mongo-data frontend-node-modules backend-node-modules || true

# Remove images
echo "Removing images..."
podman rmi impact-frontend impact-backend || true

echo "Cleanup completed successfully!"