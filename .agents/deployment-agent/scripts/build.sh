#!/bin/bash
# Build Docker images

echo "=== Deployment Agent - Build ==="
echo ""

# Build backend image
echo "Building backend image..."
docker build -t realdeal-backend .

# Build frontend image
echo "Building frontend image..."
cd web
docker build -t realdeal-frontend .
cd ..

echo ""
echo "Images built successfully!"
echo "  realdeal-backend"
echo "  realdeal-frontend"
