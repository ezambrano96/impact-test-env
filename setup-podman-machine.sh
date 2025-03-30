#!/bin/bash

echo "======================================================"
echo "Setting up Podman Machine for Impact.com Test Environment"
echo "======================================================"
echo

# Check if podman is installed
if ! command -v podman &> /dev/null; then
    echo "Error: Podman is not installed. Please install Podman first."
    echo "You can install Podman through Homebrew on macOS: brew install podman"
    exit 1
fi

# Initialize or start podman machine
echo "Checking for existing Podman machine..."
if podman machine list | grep -q "podman-machine-default"; then
    echo "Podman machine exists. Starting it..."
    podman machine start
else
    echo "Creating new Podman machine..."
    podman machine init --cpus 2 --memory 4096
    podman machine start
fi

# Verify machine is running
echo "Verifying Podman machine is running..."
podman machine list

# Set environment variables
echo "Setting up environment variables..."
eval $(podman machine env)

# Test podman
echo "Testing Podman installation..."
podman info

echo "Podman machine setup complete!"
echo 
echo "To use this Podman machine in your current terminal, run:"
echo "eval \$(podman machine env)"
echo
echo "Now you can start the Impact.com test environment by running:"
echo "./start-with-machine.sh"
