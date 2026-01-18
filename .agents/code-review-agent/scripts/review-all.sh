#!/bin/bash
# Run full code review (backend + frontend)

echo "=== Code Review Agent ==="
echo ""

# Backend review
echo "=== Backend Review ==="
bash .agents/code-review-agent/scripts/review-backend.sh
BACKEND_STATUS=$?

echo ""
echo "=== Frontend Review ==="
cd web
bash ../.agents/code-review-agent/scripts/review-frontend.sh
FRONTEND_STATUS=$?
cd ..

echo ""
echo "=== Review Summary ==="
if [ $BACKEND_STATUS -eq 0 ] && [ $FRONTEND_STATUS -eq 0 ]; then
    echo "✓ All checks passed!"
    exit 0
else
    echo "✗ Some checks failed"
    exit 1
fi
