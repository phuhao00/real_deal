#!/bin/bash
# Seed the database with initial data

set -e

echo "Starting database seeding..."

# Build seed binary
echo "Building seed binary..."
go build -o bin/seed ./cmd/seed

# Run seed
echo "Running seed..."
./bin/seed

echo "Database seeding completed successfully!"
