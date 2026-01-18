# Real Deal - Skills & Agents

This directory contains specialized skills and agents for the real_deal platform, extending Claude's capabilities for efficient development and maintenance.

## Overview

Real Deal is a professional networking and fundraising platform for startups, investors, and talent. The platform features multi-provider OAuth authentication, company verification, job management, VC/YC fundraising, AI-powered recommendations, and tiered billing.

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
- **Styling**: Tailwind CSS 3.4.3

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Logging and metrics support

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Go 1.23+
- Node.js 18+
- MongoDB (via Docker)
- Redis (via Docker)

### Setup

```bash
# Clone repository
git clone <repo-url>
cd real_deal

# Start infrastructure services
docker-compose up -d mongodb redis minio nats

# Seed database with initial data
docker-compose --profile seed up seed

# Start backend server
go run cmd/server/main.go

# Start frontend development server (new terminal)
cd web
npm install
npm run dev
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **MinIO Console**: http://localhost:9001
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

## Project Structure

```
real_deal/
├── .skills/              # Skills (development guides)
├── .agents/              # Agents (automation tools)
├── cmd/                  # Application entry points
│   ├── server/           # Backend server
│   └── seed/            # Database seeding
├── internal/            # Internal packages
│   ├── config/          # Configuration
│   ├── db/              # Database connections
│   ├── handlers/        # API route handlers
│   └── storage/         # MinIO storage
├── web/                 # Next.js frontend
│   ├── app/            # App Router pages
│   ├── components/      # React components
│   └── lib/            # Utilities
├── seeds/               # Seed data JSON files
├── scripts/             # Utility scripts
├── docker-compose.yml    # Docker services
├── go.mod              # Go module definition
└── README.md           # This file
```

## Skills

Skills provide domain-specific knowledge and workflows for development tasks.

### Available Skills

#### [backend-skill](.skills/backend-skill/)
Backend development using Go, Gin framework, MongoDB, Redis, MinIO, and NATS.

**Capabilities:**
- API handler development
- MongoDB query patterns
- Redis caching strategies
- MinIO file storage
- Configuration management

**Key Features:**
- Handler structure patterns
- Authentication patterns
- Data model definitions
- Database seeding scripts
- Test execution scripts

**Reference Documentation:**
- [MongoDB Collections](.skills/backend-skill/references/mongodb-collections.md)
- [API Endpoints](.skills/backend-skill/references/api-endpoints.md)

**Use When:**
- Creating new API endpoints
- Implementing database operations
- Working with file uploads
- Configuring backend services

---

#### [frontend-skill](.skills/frontend-skill/)
Frontend development using Next.js 14.2, React 18.2, TypeScript 5.3.3, and Tailwind CSS 3.4.3.

**Capabilities:**
- Server and client components
- API integration patterns
- Component composition
- Tailwind CSS styling
- Custom CSS variables

**Key Features:**
- Server component patterns
- Client component patterns
- API client utilities
- Component library reference
- Tailwind configuration guide

**Reference Documentation:**
- [Components Reference](.skills/frontend-skill/references/components-reference.md)
- [Tailwind Reference](.skills/frontend-skill/references/tailwind-reference.md)

**Use When:**
- Creating new pages
- Building React components
- Styling with Tailwind
- Integrating with backend APIs

---

#### [auth-skill](.skills/auth-skill/)
Authentication and authorization including multi-provider OAuth/OIDC.

**Supported Providers:**
- **Domestic**: WeChat, DingTalk, Alipay, Weibo
- **International**: Apple, Google, GitHub, LinkedIn, Microsoft
- **Extended**: Passkeys (WebAuthn), TOTP 2FA

**Key Features:**
- OAuth/OIDC flow (Code Flow + PKCE)
- Account merging and binding
- Session management
- Security best practices
- Data minimization and compliance

**Use When:**
- Implementing login systems
- Handling OAuth callbacks
- Managing user sessions
- Adding new identity providers

---

#### [billing-skill](.skills/billing-skill/)
Billing and quota management system with tiered limits and usage tracking.

**Features:**
- Storage tier management
- Capacity packs
- Job slot quotas
- Usage metering
- Charge tracking

**Data Models:**
- `UsageMeter` - Track storage, bandwidth, transcoding
- `Quota` - Current limits per user/company
- `CapacityPack` - Purchased capacity bundles
- `JobSlot` - Active job slot allocation
- `ChargeRecord` - Payment history

**Use When:**
- Implementing billing features
- Managing quotas
- Tracking usage
- Creating capacity packs

---

#### [compliance-skill](.skills/compliance-skill/)
Company verification and content compliance with AI and manual review.

**Features:**
- KYB verification
- Job posting compliance
- Content moderation
- Regional compliance
- Appeal processes

**Workflow:**
1. Submit verification documents
2. AI + rule-based validation
3. Manual review queue
4. Grant/deny with feedback
5. Appeal process

**Use When:**
- Verifying companies
- Reviewing job postings
- Moderating content
- Ensuring regulatory compliance

---

#### [vc-yc-skill](.skills/vc-yc-skill/)
VC/YC fundraising module with investor profiles, pitch pages, and deal rooms.

**Features:**
- Investor profiles with availability
- Pitch pages for founders
- Deal rooms with access controls
- AI-powered matching
- Dual-consent introductions

**Key Components:**
- `InvestorProfile` - Investment focus and criteria
- `PitchPage` - Founder presentation
- `DealRoom` - Private data room
- `IntroductionRequest` - Dual-consent requests

**Use When:**
- Building investor features
- Creating pitch pages
- Managing deal rooms
- Implementing fundraising workflows

---

#### [ai-customer-service-skill](.skills/ai-customer-service-skill/)
AI customer service and recommendation system with NLP capabilities.

**Capabilities:**
- Natural language query understanding
- Context-aware conversations
- Intelligent recommendations
- Multi-language support

**Use Cases:**
- Answer platform FAQs
- Guide new users through onboarding
- Help with billing/quotas
- Explain verification processes
- Troubleshoot common issues

**Recommendation Types:**
- Job/company recommendations
- Investor-founder matching
- Content discovery

**Use When:**
- Building AI chat interfaces
- Implementing recommendation engines
- Processing user queries with NLP

---

#### [theme-marketplace-skill](.skills/theme-marketplace-skill/)
Theme and skin marketplace with validation, performance requirements, and revenue sharing.

**Features:**
- Style token system
- Theme development
- Validation requirements (performance, accessibility)
- Creator revenue sharing
- Theme submission and review

**Validation Standards:**
- WCAG 2.1 AA compliance
- Performance benchmarks
- Accessibility requirements
- Code quality checks

**Use When:**
- Developing themes
- Managing theme store
- Validating theme submissions
- Enforcing standards

---

## Agents

Agents provide automated workflows for common development tasks.

### Available Agents

#### [code-review-agent](.agents/code-review-agent/)
Automated code review for quality, security, and performance.

**Capabilities:**
- Code quality checks
- Security vulnerability scanning
- Performance analysis
- Best practices validation

**Review Areas:**
- Go handler patterns
- MongoDB query optimization
- TypeScript type safety
- React component design
- Input validation and sanitization
- Security best practices

**Scripts:**
- `review-backend.sh` - Review Go code
- `review-frontend.sh` - Review React code
- `review-all.sh` - Full code review

**Trigger:**
```bash
bash .agents/code-review-agent/scripts/review-all.sh
```

---

#### [testing-agent](.agents/testing-agent/)
Automated test generation, execution, and maintenance.

**Test Types:**
- Unit tests (Go & React)
- Integration tests (API endpoints)
- E2E tests (Playwright)
- Coverage reporting

**Frameworks:**
- Go: `go test`, testify
- React: Jest, React Testing Library
- E2E: Playwright

**Coverage Targets:**
- Backend: 80% line coverage
- Frontend: 75% line coverage
- Critical paths: 95% coverage

**Scripts:**
- `run-all-tests.sh` - Run all tests
- `generate-coverage.sh` - Generate coverage reports

**Trigger:**
```bash
bash .agents/testing-agent/scripts/run-all-tests.sh
```

---

#### [documentation-agent](.agents/documentation-agent/)
Automated documentation generation and maintenance.

**Documentation Types:**
- API documentation (Swagger)
- Code documentation (JSDoc, Go doc)
- Architecture documentation
- User guides

**Tools:**
- Swagger (Go)
- JSDoc (React)
- Markdown for general docs
- Mermaid for diagrams

**Scripts:**
- `generate-all.sh` - Generate all documentation
- `generate-api-docs.sh` - Generate API docs
- `generate-component-docs.sh` - Generate component docs

**Trigger:**
```bash
bash .agents/documentation-agent/scripts/generate-all.sh
```

---

#### [debugging-agent](.agents/debugging-agent/)
Automated debugging and issue resolution.

**Capabilities:**
- Error detection and analysis
- Root cause analysis
- Bug fixing
- Issue tracking

**Common Issues:**
- Database connection errors
- Redis cache misses
- MinIO upload failures
- Frontend build errors
- Runtime errors

**Workflow:**
1. Detect and categorize issue
2. Analyze stack traces
3. Review code changes
4. Identify root cause
5. Apply fix and test

**Use When:**
- Diagnosing errors
- Investigating performance issues
- Tracking and fixing bugs

---

#### [deployment-agent](.agents/deployment-agent/)
Automated deployment and infrastructure management.

**Capabilities:**
- Containerization
- CI/CD pipeline setup
- Environment management
- Production deployments

**Infrastructure:**
- Docker Compose for local development
- Kubernetes or cloud hosting for production
- Health checks
- Rollback strategies

**Services:**
- Backend (Go + Gin)
- Frontend (Next.js)
- MongoDB
- Redis
- MinIO
- NATS

**Workflow:**
1. Build Docker images
2. Run tests
3. Deploy to staging
4. Manual approval
5. Deploy to production

**Use When:**
- Setting up deployment
- Managing infrastructure
- Rolling out updates

---

#### [security-audit-agent](.agents/security-audit-agent/)
Automated security auditing and compliance checking.

**Security Checks:**
- Dependency vulnerability scanning
- Code security review
- OWASP Top 10 checks
- Compliance validation

**Security Areas:**
- Authentication/authorization
- Input validation
- SQL/NoSQL injection prevention
- XSS prevention
- CSRF protection
- Security headers

**Compliance Standards:**
- GDPR
- CCPA
- PIPL (China)

**Tools:**
- `govulncheck` (Go)
- `npm audit` (Node.js)
- Custom security checks

**Use When:**
- Running security audits
- Checking compliance
- Scanning for vulnerabilities

---

## Available APIs

### Authentication
- `POST /api/login` - Login with email
- `GET /api/me` - Get current user

### Content & Explore
- `GET /api/explore` - Get all content
- `GET /api/projects` - List projects
- `GET /api/products` - List products
- `GET /api/posts` - List posts
- `GET /api/jobs` - List jobs
- `GET /api/companies/:id` - Get company details

### VC/YC Features
- `GET /api/investors` - List investors
- `GET /api/pitch/:id` - Get pitch page
- `GET /api/deal-room/:id` - Get deal room

### Media & Assets
- `GET /api/media/:id` - Get media
- `GET /api/media-assets` - List media assets

### Compliance & Verification
- `GET /api/company-verifications/:companyId` - Get verification status
- `GET /api/job-compliance/:jobId` - Get compliance status
- `GET /api/content-moderation/:id` - Get moderation status

### Billing & Quota
- `GET /api/usage` - Get usage statistics
- `GET /api/quota` - Get quota limits
- `GET /api/capacity-packs` - List capacity packs
- `GET /api/job-slots` - Get job slots
- `GET /api/charges` - List charges

### Notifications
- `GET /api/inbox` - Get inbox messages
- `GET /api/notification-preferences` - Get preferences

## Development Workflow

### Using Skills

Skills are automatically triggered based on task context. For example:

- Working on Go backend → `backend-skill` activates
- Creating React components → `frontend-skill` activates
- Implementing login → `auth-skill` activates
- Setting up billing → `billing-skill` activates

### Using Agents

Agents can be invoked for specific tasks:

```bash
# Code review
bash .agents/code-review-agent/scripts/review-all.sh

# Run tests
bash .agents/testing-agent/scripts/run-all-tests.sh

# Generate documentation
bash .agents/documentation-agent/scripts/generate-all.sh

# Deploy application
# (See deployment-agent documentation)

# Security audit
# (See security-audit-agent documentation)
```

### Common Development Tasks

#### Add New API Endpoint
1. Use `backend-skill` for handler pattern
2. Define types in `internal/handlers/types.go`
3. Create handler in `internal/handlers/`
4. Register route in `cmd/server/main.go`
5. Use `documentation-agent` to update API docs
6. Use `testing-agent` to add tests
7. Use `code-review-agent` to review code

#### Create New Component
1. Use `frontend-skill` for component pattern
2. Create component in `web/components/`
3. Add TypeScript types
4. Style with Tailwind CSS
5. Use `documentation-agent` to add JSDoc
6. Use `testing-agent` to add tests

#### Implement New Feature
1. Review relevant skill documentation
2. Implement backend changes
3. Implement frontend changes
4. Update documentation
5. Add tests
6. Run code review
7. Deploy using agent

## Contributing

When adding new features or making changes:
1. Use relevant skills for guidance
2. Run `testing-agent` for coverage
3. Run `code-review-agent` for quality
4. Run `security-audit-agent` for security
5. Use `documentation-agent` to update docs
6. Follow project conventions

## Documentation

For detailed documentation, see each skill or agent's directory:

- **Skills**: `.skills/<skill-name>/SKILL.md`
- **Agent guides**: `.agents/<agent-name>/README.md`
- **Reference docs**: `.skills/<skill-name>/references/`
- **Scripts**: `.skills/<skill-name>/scripts/` or `.agents/<agent-name>/scripts/`

## Support

For issues or questions:
1. Consult relevant skill/agent documentation
2. Check project README
3. Review GitHub issues
4. Create new issue with details

## License

[Add license information here]

---

**Last Updated**: January 18, 2026
**Version**: 1.0.0
