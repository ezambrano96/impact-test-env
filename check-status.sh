#!/bin/bash

echo "Checking status of Impact.com test environment containers..."
echo

echo "Running containers:"
podman ps

echo
echo "All containers (including stopped ones):"
podman ps -a

echo
echo "Pod status:"
podman pod list

echo
echo "Network status:"
podman network ls

echo
echo "Checking port bindings:"
netstat -tuln | grep -E '3000|5000|27017' || echo "No ports found. You might need to install netstat (net-tools package)."

echo
echo "Checking container logs for frontend:"
podman logs impact-frontend 2>&1 | tail -20

echo
echo "Checking container logs for backend:"
podman logs impact-backend 2>&1 | tail -20