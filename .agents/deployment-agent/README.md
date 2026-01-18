# Deployment Agent

## Purpose
Automated deployment agent for the real_deal platform that handles containerization, CI/CD pipelines, environment management, and production deployments for both Go backend and Next.js frontend.

## Responsibilities

### Containerization
- Create and optimize Docker images
- Manage Docker Compose configurations
- Optimize image sizes
- Configure multi-stage builds
- Implement health checks

### CI/CD Pipeline
- Build and test code automatically
- Deploy to staging on PR merge
- Deploy to production on tag/release
- Rollback failed deployments
- Monitor deployment status

### Environment Management
- Configure development, staging, production environments
- Manage environment variables
- Handle secrets securely
- Configure load balancing
- Set up auto-scaling

### Infrastructure
- Configure container orchestration
- Set up monitoring and logging
- Implement backup strategies
- Configure SSL/TLS
- Manage DNS and routing

## Deployment Architecture

### Services
```
┌─────────────────┐
│   Load Balancer │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼────┐  ┌─▼──────────┐
│ Frontend│  │   Backend  │
│Next.js │  │ Go + Gin   │
└────────┘  └─┬──────────┘
               │
         ┌─────┴─────┐
         │           │
    ┌────▼──┐  ┌────▼────┐
    │MongoDB│  │  Redis  │
    └───────┘  └─────────┘
         │
    ┌────▼────┐
    │  MinIO  │
    └─────────┘
```

## Deployment Files

### Docker Compose (Development)
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports: ["8080:8080"]
    environment:
      - MONGO_URI=mongodb://mongo:27017
      - REDIS_ADDR=redis:6379
    depends_on:
      - mongo
      - redis

  frontend:
    build: ./web
    ports: ["3000:3000"]
    depends_on:
      - backend

  mongo:
    image: mongo:7
    volumes: ["mongo_data:/data/db"]

  redis:
    image: redis:7-alpine
    volumes: ["redis_data:/data"]

  minio:
    image: minio/minio
    ports: ["9000:9000"]
    command: server /data
    volumes: ["minio_data:/data"]

volumes:
  mongo_data:
  redis_data:
  minio_data:
```

### CI/CD Pipeline (GitHub Actions)
```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Test backend
        run: go test ./...
      - name: Test frontend
        run: cd web && npm test

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          docker-compose pull
          docker-compose up -d
          docker system prune -f
```

## Deployment Workflow

### Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Staging
1. Merge PR to main
2. Automated tests run
3. Build Docker images
4. Deploy to staging environment
5. Run smoke tests
6. Manual approval required

### Production
1. Create release tag (e.g., v1.0.0)
2. Automated tests run
3. Build production Docker images
4. Deploy to production with zero-downtime
5. Monitor for issues
6. Prepare rollback plan

## Health Checks

### Backend Health Check
```go
// GET /health
{
  "status": "healthy",
  "database": "connected",
  "redis": "connected",
  "minio": "connected",
  "version": "1.0.0"
}
```

### Frontend Health Check
```typescript
// GET /api/health
{
  "status": "healthy",
  "backend": "connected",
  "version": "1.0.0"
}
```

## Rollback Strategy

### Automated Rollback
- Health check fails → auto-rollback
- Error rate spikes → auto-rollback
- Critical alerts → auto-rollback

### Manual Rollback
```bash
# Rollback to previous version
docker-compose down
docker-compose up -d --scale backend=2:backend:v1.0.0
```

## Monitoring

### Metrics to Track
- Response times (p50, p95, p99)
- Error rates
- CPU/memory usage
- Request throughput
- Database query performance

### Logging
- Application logs (logrus)
- Access logs (nginx/load balancer)
- Error logs (Sentry)
- Audit logs (all admin actions)

## Backup Strategy

### Database Backups
```bash
# MongoDB daily backup
mongodump --uri="$MONGO_URI" --out=/backup/$(date +%Y%m%d)

# Redis daily backup
redis-cli SAVE
cp /var/lib/redis/dump.rdb /backup/$(date +%Y%m%d)/
```

### MinIO Backups
```bash
# Sync to backup storage
mc mirror minio/media backup/$(date +%Y%m%d)/media
```

## Security

### Secrets Management
- Use environment variables
- Never commit secrets to git
- Rotate secrets regularly
- Use secrets manager (e.g., AWS Secrets Manager)

### SSL/TLS
- Use Let's Encrypt for auto-renewal
- Configure HTTPS for all services
- Enforce secure headers
- Regular security audits

## Integration Points
- GitHub Actions for CI/CD
- Docker Hub / ECR for registry
- AWS/GCP/Azure for cloud hosting
- Sentry for error tracking
- Prometheus/Grafana for monitoring
