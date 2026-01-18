#!/bin/bash
# Build and test frontend

set -e

echo "Building frontend..."

cd web

# Install dependencies
npm install

# Type check
echo "Running TypeScript type check..."
npx tsc --noEmit

# Run tests (if configured)
if [ -f "package.json" ] && grep -q "test" package.json; then
    echo "Running tests..."
    npm test
fi

# Build for production
echo "Building for production..."
npm run build

echo "Frontend build completed successfully!"
