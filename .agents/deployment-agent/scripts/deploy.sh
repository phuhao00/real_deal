#!/bin/bash
# Deploy to production

set -e

echo "=== Deployment Agent - Deploy ==="
echo ""

# Ask for confirmation
read -p "Deploy to production? (y/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled"
    exit 1
fi

# Run tests first
echo "Running tests..."
bash .agents/testing-agent/scripts/run-all-tests.sh

# Build images
echo "Building Docker images..."
bash .agents/deployment-agent/scripts/build.sh

# Stop existing services
echo "Stopping existing services..."
docker-compose down

# Start new services
echo "Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 15

# Run health checks
echo "Running health checks..."
bash .agents/debugging-agent/scripts/debug-system.sh

echo ""
echo "Deployment completed!"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8080"
