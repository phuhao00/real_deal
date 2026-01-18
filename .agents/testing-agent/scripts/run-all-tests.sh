#!/bin/bash
# Run all tests

echo "=== Testing Agent ==="
echo ""

# Backend tests
echo "=== Backend Tests ==="
go test ./... -v -cover
BACKEND_STATUS=$?

echo ""
echo "=== Frontend Tests ==="
cd web
npm test -- --watchAll=false --coverage
FRONTEND_STATUS=$?
cd ..

echo ""
echo "=== Test Summary ==="
if [ $BACKEND_STATUS -eq 0 ] && [ $FRONTEND_STATUS -eq 0 ]; then
    echo "✓ All tests passed!"
    exit 0
else
    echo "✗ Some tests failed"
    exit 1
fi
