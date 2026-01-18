#!/bin/bash
# Run full system debug

echo "=== System Debug ==="
echo ""

echo "Checking Docker services..."
docker-compose ps

echo ""
echo "Checking service health..."

# MongoDB
echo -n "MongoDB: "
docker-compose exec -T mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1 && echo "✓" || echo "✗"

# Redis
echo -n "Redis: "
docker-compose exec -T redis redis-cli ping > /dev/null 2>&1 && echo "✓" || echo "✗"

# MinIO
echo -n "MinIO: "
curl -s http://localhost:9000/minio/health/live > /dev/null 2>&1 && echo "✓" || echo "✗"

# Backend
echo -n "Backend: "
curl -s http://localhost:8080/api/explore > /dev/null 2>&1 && echo "✓" || echo "✗"

# Frontend
echo -n "Frontend: "
curl -s http://localhost:3000 > /dev/null 2>&1 && echo "✓" || echo "✗"

echo ""
echo "For detailed logs:"
echo "  docker-compose logs -f [service_name]"
