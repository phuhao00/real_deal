#!/bin/bash
# Debug frontend application

echo "=== Debugging Agent - Frontend ==="
echo ""

cd web

# Check if frontend dev server is running
FRONTEND_PID=$(pgrep -f "next dev" || echo "")

if [ -z "$FRONTEND_PID" ]; then
    echo "Frontend is not running. Starting..."
    npm run dev > /dev/null 2>&1 &
    FRONTEND_PID=$!
    sleep 5
fi

echo "Frontend PID: $FRONTEND_PID"
echo ""

# Check frontend health
echo "Checking frontend health..."
curl -s http://localhost:3000 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Frontend is healthy"
else
    echo "✗ Frontend is not responding"
    echo "Check browser console for errors"
fi

echo ""
echo "To view frontend:"
echo "  Open http://localhost:3000 in browser"
echo ""
echo "To stop frontend:"
echo "  kill $FRONTEND_PID"

cd ..
