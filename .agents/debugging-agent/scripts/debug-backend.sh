#!/bin/bash
# Debug backend application

echo "=== Debugging Agent - Backend ==="
echo ""

# Check if backend is running
BACKEND_PID=$(pgrep -f "cmd/server/main.go" || echo "")

if [ -z "$BACKEND_PID" ]; then
    echo "Backend is not running. Starting..."
    go run cmd/server/main.go &
    BACKEND_PID=$!
    sleep 3
fi

echo "Backend PID: $BACKEND_PID"
echo ""

# Check backend health
echo "Checking backend health..."
curl -s http://localhost:8080/api/explore | jq . > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Backend is healthy"
else
    echo "✗ Backend is not responding"
fi

echo ""
echo "Recent logs:"
docker-compose logs --tail=20 app 2>/dev/null || echo "No docker logs found"

echo ""
echo "To attach logs:"
echo "  docker-compose logs -f app"
echo ""
echo "To stop backend:"
echo "  kill $BACKEND_PID"
