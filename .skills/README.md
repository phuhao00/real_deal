# Real Deal - Skills & Agents

This directory contains specialized skills and agents for the real_deal platform, extending Claude's capabilities for efficient development and maintenance.

## Skills

Skills provide domain-specific knowledge and workflows for development tasks.

### Available Skills

#### [backend-skill](.skills/backend-skill/)
Backend development using Go 1.23, Gin framework, MongoDB, Redis, and MinIO.
- API development
- Database operations
- Object storage
- Configuration management

#### [frontend-skill](.skills/frontend-skill/)
Frontend development using Next.js 14.2, React 18.2, TypeScript, and Tailwind CSS.
- Component development
- Page building
- API integration
- Styling with Tailwind

#### [auth-skill](.skills/auth-skill/)
Authentication and authorization including third-party login and OAuth/OIDC.
- Multi-provider OAuth (WeChat, Apple, Google, GitHub, LinkedIn)
- Account merging and binding
- Session management
- Security best practices

#### [billing-skill](.skills/billing-skill/)
Billing and quota management system.
- Tiered storage limits
- Capacity packs
- Job slot quotas
- Usage metering

#### [compliance-skill](.skills/compliance-skill/)
Company verification and content compliance.
- KYB verification
- Job posting compliance
- Content moderation
- Regional compliance

#### [vc-yc-skill](.skills/vc-yc-skill/)
VC/YC fundraising module.
- Investor profiles
- Pitch pages
- Deal rooms
- Fundraising matching

#### [ai-customer-service-skill](.skills/ai-customer-service-skill/)
AI customer service and recommendations.
- AI chatbot
- Intelligent recommendations
- NLP processing
- User intent understanding

#### [theme-marketplace-skill](.skills/theme-marketplace-skill/)
Theme and skin marketplace.
- Theme development
- Style token architecture
- Theme validation
- Performance/accessibility standards

## Agents

Agents provide automated workflows for common development tasks.

### Available Agents

#### [code-review-agent](.agents/code-review-agent/)
Automated code review for quality, security, and performance.
- Code quality checks
- Security vulnerability scanning
- Performance analysis
- Best practices validation

#### [testing-agent](.agents/testing-agent/)
Automated test generation, execution, and maintenance.
- Unit tests
- Integration tests
- E2E tests
- Coverage reporting

#### [documentation-agent](.agents/documentation-agent/)
Automated documentation generation and maintenance.
- API documentation
- Code comments
- Architecture docs
- User guides

#### [debugging-agent](.agents/debugging-agent/)
Automated debugging and issue resolution.
- Error detection
- Root cause analysis
- Bug fixing
- Issue tracking

#### [deployment-agent](.agents/deployment-agent/)
Automated deployment and infrastructure management.
- Containerization
- CI/CD pipelines
- Environment management
- Production deployments

#### [security-audit-agent](.agents/security-audit-agent/)
Automated security auditing and compliance checking.
- Vulnerability scanning
- Code security review
- Compliance checking
- Security monitoring

## Usage

### Using Skills

Skills are automatically triggered based on task context. For example:

- Working on Go backend → backend-skill activates
- Creating React components → frontend-skill activates
- Implementing login → auth-skill activates
- Setting up billing → billing-skill activates

### Using Agents

Agents can be invoked for specific tasks:

```bash
# Trigger code review
claude: review this PR

# Run tests
claude: run all tests

# Generate documentation
claude: generate API docs for this endpoint

# Debug issue
claude: investigate this error

# Deploy to production
claude: deploy to production

# Security audit
claude: run security audit
```

## Project Overview

### Tech Stack

**Backend:**
- Go 1.23.0
- Gin Framework 1.10.1
- MongoDB (primary database)
- Redis (cache/sessions)
- MinIO (object storage)

**Frontend:**
- Next.js 14.2.4
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.3

### Key Features

- Multi-provider OAuth authentication
- Company verification and compliance
- Job posting and management
- VC/YC fundraising platform
- AI-powered customer service
- Theme/skin marketplace
- Tiered billing and quotas

## Quick Start

### Development Setup

```bash
# Start backend and services
docker-compose up -d

# Start frontend
cd web
npm install
npm run dev
```

### Common Commands

```bash
# Backend
go run cmd/server/main.go
go test ./...

# Frontend
cd web
npm run dev
npm run build
npm test
```

## Documentation

For detailed documentation, see each skill or agent's directory.

## Contributing

When adding new features or making changes:
1. Use relevant skills for guidance
2. Run testing agent for coverage
3. Run code-review agent for quality
4. Run security-audit agent for security
5. Use documentation agent to update docs

## Support

For issues or questions, refer to:
- Specific skill/agent documentation
- Project README
- GitHub issues
