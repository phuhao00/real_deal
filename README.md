# Real Deal

Professional networking and fundraising platform for startups, investors, and talent.

## Overview

Real Deal is a comprehensive platform that connects startups with investors, companies with talent, and facilitates professional networking. It features multi-provider OAuth authentication, company verification, job management, VC/YC fundraising workflows, AI-powered recommendations, and tiered billing.

## Key Features

### Authentication & User Management
- Multi-provider OAuth/OIDC (WeChat, Apple, Google, GitHub, LinkedIn)
- Account merging and binding
- Secure session management
- Role-based access control

### Job & Recruitment
- Job posting and management
- Company profiles and verification
- Job compliance and moderation
- AI-powered job matching

### Fundraising Platform (VC/YC)
- Investor profiles with availability
- Pitch pages for founders
- Deal rooms with access controls
- AI-powered investor-founder matching
- Dual-consent introductions

### Content & Media
- Project and product showcases
- Blog posts and updates
- Media asset management (MinIO)
- Content moderation

### Billing & Quota Management
- Tiered storage limits
- Capacity packs
- Job slot quotas
- Usage metering and tracking
- Charge history

### AI Features
- Intelligent recommendations
- AI customer service
- Natural language query understanding
- Content personalization

### Theme Marketplace
- Custom themes and skins
- Style token system
- Theme validation and review
- Creator revenue sharing

## Tech Stack

### Backend
- **Language**: Go 1.23.0
- **Framework**: Gin v1.10.1
- **Database**: MongoDB (primary), Redis (cache/sessions)
- **Object Storage**: MinIO v7.0.60
- **Message Queue**: NATS 2.10
- **Config**: godotenv

### Frontend
- **Framework**: Next.js 14.2.4 (App Router)
- **UI Library**: React 18.2.0
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.3 + CSS Variables

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Ready for cloud hosting

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Go 1.23+
- Node.js 18+
- Git

### Installation

```bash
# Clone repository
git clone <repo-url>
cd real_deal

# Start infrastructure services
docker-compose up -d mongodb redis minio nats

# Wait for services to be ready (10-20 seconds)
sleep 15

# Seed database with initial data
docker-compose --profile seed up seed

# Start backend server (terminal 1)
go run cmd/server/main.go

# Start frontend development server (terminal 2)
cd web
npm install
npm run dev
```

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **MinIO Console**: http://localhost:9001 (miniouser/miniopass123)
- **MongoDB**: mongodb://localhost:27017
- **Redis**: localhost:6379

## Project Structure

```
real_deal/
├── .skills/              # Development skills (guides)
├── .agents/              # Automation agents (tools)
├── cmd/                  # Application entry points
│   ├── server/           # Backend server (Gin)
│   └── seed/            # Database seeding
├── internal/            # Internal packages
│   ├── config/          # Configuration management
│   ├── db/              # Database connections
│   ├── handlers/        # API route handlers
│   └── storage/         # MinIO storage interface
├── web/                 # Next.js frontend
│   ├── app/            # App Router pages
│   ├── components/      # React components
│   └── lib/            # Utilities (API client)
├── seeds/               # Seed data JSON files
├── scripts/             # Utility scripts
├── docker-compose.yml    # Docker services
├── go.mod              # Go module definition
├── go.sum              # Go dependencies
└── README.md           # This file
```

## Development

### Skills & Agents

This project includes specialized skills and agents for efficient development:

- [Skills](.skills/) - Domain-specific development guides
- [Agents](.agents/) - Automated workflows and tools

### Backend Development

```bash
# Run backend server
go run cmd/server/main.go

# Run tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Format code
gofmt -w .

# Lint code
golangci-lint run
```

### Frontend Development

```bash
cd web

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type checking
npx tsc --noEmit
```

### Using Skills

Skills provide context-specific guidance:

- Working on Go backend → `backend-skill` activates
- Creating React components → `frontend-skill` activates
- Implementing login → `auth-skill` activates
- Setting up billing → `billing-skill` activates
- Designing UI/UX → `product-design-skill` activates

### Using Agents

Agents automate common tasks:

```bash
# Code review
bash .agents/code-review-agent/scripts/review-all.sh

# Run all tests
bash .agents/testing-agent/scripts/run-all-tests.sh

# Generate documentation
bash .agents/documentation-agent/scripts/generate-all.sh
```

## API Documentation

See [API Endpoints Reference](.skills/backend-skill/references/api-endpoints.md) for complete API documentation.

### Quick API Examples

#### Authentication
```bash
# Login
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com"}' \
  -c cookies.txt

# Get current user
curl http://localhost:8080/api/me -b cookies.txt
```

#### Content
```bash
# Get explore feed
curl http://localhost:8080/api/explore

# Get jobs
curl http://localhost:8080/api/jobs

# Get company details
curl http://localhost:8080/api/companies/company_001
```

## Database Schema

See [MongoDB Collections Reference](.skills/backend-skill/references/mongodb-collections.md) for complete schema documentation.

### Key Collections

- `users` - User accounts and profiles
- `projects` - Project listings
- `products` - Product listings
- `posts` - Blog posts
- `jobs` - Job listings
- `companies` - Company profiles
- `pitch_pages` - Pitch pages
- `deal_rooms` - Deal rooms
- `investors` - Investor profiles
- `company_verifications` - Verification records
- `job_compliance` - Job compliance records
- `content_moderation` - Content moderation records

## Testing

### Backend Tests

```bash
# Run all tests
go test ./... -v

# Run with coverage
go test -cover ./...

# Run specific package
go test ./internal/handlers -v
```

### Frontend Tests

```bash
cd web

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run E2E tests (Playwright)
npx playwright test
```

### Using Testing Agent

```bash
# Run all tests (backend + frontend)
bash .agents/testing-agent/scripts/run-all-tests.sh

# Generate coverage reports
bash .agents/testing-agent/scripts/generate-coverage.sh
```

## Deployment

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Production Deployment

1. Configure environment variables
2. Build Docker images
3. Run security scans
4. Deploy to staging
5. Run integration tests
6. Deploy to production

See [deployment-agent](.agents/deployment-agent/) for detailed deployment guides.

## Security

### Best Practices

- Never commit secrets or credentials
- Use environment variables for configuration
- Implement proper authentication and authorization
- Validate and sanitize all inputs
- Use HTTPS in production
- Regular security audits

### Security Audits

Run security audits using the [security-audit-agent](.agents/security-audit-agent/):

```bash
# Go vulnerability scan
govulncheck ./...

# Node.js audit
cd web
npm audit

# Run security agent
# (See security-audit-agent documentation)
```

## Documentation

- [Skills Documentation](.skills/README.md) - Complete skills guide
- [Agent Documentation](.agents/) - Automation tools
- [Backend Skill](.skills/backend-skill/) - Go backend development
- [Frontend Skill](.skills/frontend-skill/) - React/Next.js development
- [API Reference](.skills/backend-skill/references/api-endpoints.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `bash .agents/testing-agent/scripts/run-all-tests.sh`
5. Run code review: `bash .agents/code-review-agent/scripts/review-all.sh`
6. Submit a pull request

### Contribution Guidelines

- Follow existing code conventions
- Add tests for new features
- Update documentation
- Run security audits
- Ensure all tests pass

## Troubleshooting

### Common Issues

#### Backend won't start
```bash
# Check if MongoDB is running
docker-compose ps

# Check backend logs
docker-compose logs app

# Restart backend
docker-compose restart app
```

#### Frontend build fails
```bash
cd web
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Database connection errors
```bash
# Restart MongoDB
docker-compose restart mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Verify connection
mongosh mongodb://localhost:27017
```

## License

[Add license information here]

## Contact

For support and questions:
- GitHub Issues: [Create an issue]
- Email: support@realdeal.com
- Documentation: [Link to docs]

---

**Version**: 1.0.0
**Last Updated**: January 18, 2026
