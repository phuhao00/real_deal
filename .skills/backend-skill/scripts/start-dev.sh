#!/bin/bash
# Start all development services

echo "Starting development services..."

# Start Docker services
docker-compose up -d mongodb redis minio nats

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 5

# Run backend server
echo "Starting backend server..."
go run cmd/server/main.go &
BACKEND_PID=$!

echo "Services started!"
echo "Backend PID: $BACKEND_PID"
echo "Backend: http://localhost:8080"
echo "MongoDB: localhost:27017"
echo "Redis: localhost:6379"
echo "MinIO: http://localhost:9000"

# Wait for backend
wait $BACKEND_PID
