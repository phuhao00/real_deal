#!/bin/bash
# Generate coverage reports

echo "Generating coverage reports..."

# Backend coverage
echo "Backend coverage..."
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage-backend.html

# Frontend coverage
echo "Frontend coverage..."
cd web
npm test -- --watchAll=false --coverage
cd ..

echo ""
echo "Coverage reports generated:"
echo "  Backend: coverage-backend.html"
echo "  Frontend: web/coverage/"
