# Resolving Port Conflict for Impact.com Test Environment

This document provides instructions for resolving the port conflict issue with the backend server.

## The Issue

The error you're seeing:

```
Error: (HTTP code 500) server error - something went wrong with the request: "listen tcp :5000: bind: address already in use"
```

This occurs because port 5000 is already in use by another application on your system. This is a common issue because port 5000 is used by various services, including:

- AirPlay on macOS
- Various development servers and tools
- Some system services

## The Solution

We've created a script that will change the backend port from 5000 to 5001 across all configuration files. This ensures the application will work without conflicting with other services.

## Steps to Resolve

1. Make the fix script executable:
   ```bash
   chmod +x make-fix-script-executable.sh
   ./make-fix-script-executable.sh
   ```

2. Run the fix script:
   ```bash
   ./fix-port-conflict.sh
   ```

3. Start the application with the updated configuration:
   ```bash
   ./start-with-machine.sh
   ```

4. The application should now be accessible at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001
   - MongoDB: localhost:27017

## What Changes Were Made

The script updates the following files:

1. `backend/.env`: Changes PORT from 5000 to 5001
2. `podman-compose.yml`: Updates port mapping and environment variables
3. `start-with-machine.sh`: Updates port mapping and environment variables

## Manual Testing

To verify the backend is now working correctly, you can:

1. Use Postman to access: http://localhost:5001/health
2. Check the frontend is correctly communicating with the backend by accessing http://localhost:3000

## Troubleshooting

If you still encounter issues:

1. Check if any containers are running:
   ```bash
   podman ps
   ```

2. Stop all containers and try again:
   ```bash
   podman stop impact-frontend impact-backend impact-mongo
   podman rm impact-frontend impact-backend impact-mongo
   ./start-with-machine.sh
   ```

3. Check the logs for any errors:
   ```bash
   podman logs impact-backend
   ```
