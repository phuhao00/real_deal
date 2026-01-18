#!/bin/bash
# Run backend tests with coverage

set -e

echo "Running backend tests..."

# Run tests with coverage
go test -v -coverprofile=coverage.out ./...

# Generate coverage report
go tool cover -html=coverage.out -o coverage.html

echo "Coverage report generated: coverage.html"
echo "Total coverage:"
go tool cover -func=coverage.out | tail -1
