#!/bin/bash

echo "======================================================"
echo "Fixing port conflict for the Impact.com Test Environment"
echo "======================================================"
echo

# Change the port in backend/.env
echo "Updating backend/.env..."
sed -i.bak 's/PORT=5000/PORT=5001/g' backend/.env
echo "Updated backend/.env"

# Update podman-compose.yml
echo "Updating podman-compose.yml..."
sed -i.bak 's/"5000:5000"/"5001:5001"/g' podman-compose.yml
sed -i.bak 's/REACT_APP_API_URL=http:\/\/localhost:5000/REACT_APP_API_URL=http:\/\/localhost:5001/g' podman-compose.yml
echo "Updated podman-compose.yml"

# Update start-with-machine.sh
echo "Updating start-with-machine.sh..."
sed -i.bak 's/-p 5000:5000/-p 5001:5001/g' start-with-machine.sh
sed -i.bak 's/-e PORT=5000/-e PORT=5001/g' start-with-machine.sh
sed -i.bak 's/-e REACT_APP_API_URL=http:\/\/localhost:5000/-e REACT_APP_API_URL=http:\/\/localhost:5001/g' start-with-machine.sh
sed -i.bak 's/Backend API: http:\/\/$PODMAN_IP:5000/Backend API: http:\/\/$PODMAN_IP:5001/g' start-with-machine.sh
sed -i.bak 's/Backend API: http:\/\/localhost:5000/Backend API: http:\/\/localhost:5001/g' start-with-machine.sh
echo "Updated start-with-machine.sh"

# Make the script executable
chmod +x start-with-machine.sh

echo "======================================================"
echo "Port conflict resolution complete!"
echo "The backend will now use port 5001 instead of 5000."
echo "Run './start-with-machine.sh' to start the application."
echo "======================================================"
