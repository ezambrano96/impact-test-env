#!/bin/bash

echo "Setting up local development environment without containers..."

# Create a directory for the database
mkdir -p ./data/db

# Install MongoDB (this is a simplified example, you might need to adjust for your OS)
echo "Please install MongoDB on your system manually."
echo "For macOS: brew install mongodb-community"
echo "For Ubuntu: sudo apt install mongodb"
echo "For Windows: Download from https://www.mongodb.com/try/download/community"

# Install dependencies for backend
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install dependencies for frontend
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create .env file for backend
cat > backend/.env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/impact_ecommerce
SEED_DB=true
EOL

# Create .env file for frontend
cat > frontend/.env << EOL
REACT_APP_API_URL=http://localhost:5000
EOL

echo "Setup complete!"
echo
echo "To start the backend, run: cd backend && npm start"
echo "To start the frontend, run: cd frontend && npm start"
echo
echo "The application will be accessible at: http://localhost:3000"
echo "The API will be accessible at: http://localhost:5000"