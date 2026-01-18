#!/bin/bash
# Generate API documentation with Swagger

echo "Generating API documentation..."

# Check if swag is installed
if ! command -v swag &> /dev/null; then
    echo "Installing swag..."
    go install github.com/swaggo/swag/cmd/swag@latest
fi

# Generate Swagger docs
swag init -g cmd/server/main.go -o docs/api

echo "API documentation generated in docs/api/"
echo "Open docs/api/index.html to view"
