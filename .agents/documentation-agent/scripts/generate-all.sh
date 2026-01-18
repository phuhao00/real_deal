#!/bin/bash
# Generate all documentation

echo "=== Documentation Agent ==="
echo ""

# API documentation
echo "Generating API documentation..."
swag init -g cmd/server/main.go -o docs/api

# Component documentation
echo "Generating component documentation..."
cd web
npx jsdoc components/*.tsx --configure jsdoc.json --destination ../docs/components
cd ..

# README
echo "Generating README..."
cat > README.md << 'EOF'
# Real Deal

Professional networking and fundraising platform for startups, investors, and talent.

## Quick Start

```bash
# Start all services
docker-compose up -d

# Seed database
docker-compose --profile seed up seed

# Start backend
go run cmd/server/main.go

# Start frontend
cd web && npm run dev
```

## Documentation

- [API Documentation](docs/api/)
- [Architecture](docs/architecture/)
- [Development Guide](docs/development/)

## Skills & Agents

This project includes specialized skills and agents for efficient development:

- [Skills](.skills/) - Domain-specific development guides
- [Agents](.agents/) - Automated workflows and tools

## Tech Stack

**Backend:** Go 1.23, Gin, MongoDB, Redis, MinIO, NATS
**Frontend:** Next.js 14.2, React 18.2, TypeScript 5.3, Tailwind CSS 3.4

## Features

- Multi-provider OAuth authentication
- Company verification and compliance
- Job posting and management
- VC/YC fundraising platform
- AI-powered recommendations
- Theme marketplace
- Tiered billing and quotas
EOF

echo "Documentation generated successfully!"
