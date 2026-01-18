#!/bin/bash
# Start frontend development server

echo "Starting frontend development server..."

cd web

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start dev server
npm run dev
