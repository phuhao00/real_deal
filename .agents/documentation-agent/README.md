# Documentation Agent

## Purpose
Automated documentation agent that generates, updates, and maintains technical documentation for the real_deal platform including API docs, code comments, architecture docs, and user guides.

## Responsibilities

### API Documentation
- Generate OpenAPI/Swagger specs from Go handlers
- Document all API endpoints
- Include request/response examples
- Document authentication requirements
- Generate interactive API explorer

### Code Documentation
- Add JSDoc comments to React components
- Document Go package functions
- Generate README files
- Create inline code comments
- Maintain type definitions

### Architecture Documentation
- Document system architecture
- Describe data models and relationships
- Explain key design decisions
- Create sequence diagrams for workflows
- Document integration patterns

### User Documentation
- Create getting started guides
- Write feature tutorials
- Document configuration options
- Create troubleshooting guides
- Maintain FAQ

## Documentation Types

### API Documentation

```markdown
# API Endpoints Reference

## Authentication

### POST /api/login
Login with email

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "id": "user_001",
  "name": "Alice",
  "role": "candidate",
  "email": "alice@example.com"
}
```

**Cookie:** `uid` (httpOnly, 7 days)

---

### GET /api/jobs
List all jobs

**Query Parameters:**
- None

**Response:**
```json
[
  {
    "id": "job_001",
    "title": "前端工程师（Next.js）",
    "location": "上海",
    "level": "中级",
    "salary": "25k-35k/月",
    "skills": ["React", "TypeScript", "SSR"]
  }
]
```
```

### Code Documentation

#### Go Documentation
```go
// ListJobs retrieves all jobs from the MongoDB database.
// It returns a JSON array of job objects.
// If the database query fails, it returns a 500 error.
//
// Usage:
//
//   handler := NewJob(db)
//   handler.List(c)
func (h *JobHandler) List(c *gin.Context) {
    ctx := context.Background()
    cur, err := h.DB.Collection("jobs").Find(ctx, bson.D{}, nil)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    var items []Job
    for cur.Next(ctx) { var j Job; _ = cur.Decode(&j); items = append(items, j) }
    c.JSON(http.StatusOK, items)
}
```

#### React/TypeScript Documentation
```typescript
/**
 * FeedRow component displays a single feed item with title, subtitle, and tags.
 *
 * @param {string} title - The main title of the feed item
 * @param {string} [subtitle] - Optional subtitle text
 * @param {string[]} [tags] - Optional array of tags
 * @param {boolean} [dense=false] - Whether to use compact layout
 *
 * @example
 * <FeedRow
 *   title="Project Title"
 *   subtitle="A brief summary"
 *   tags={['React', 'TypeScript']}
 *   dense={false}
 * />
 */
export default function FeedRow({ title, subtitle, tags, dense }: Props) {
  return (
    <div className={`px-4 ${dense ? 'py-2' : 'py-3'}`}>
      {/* Component implementation */}
    </div>
  )
}
```

### Architecture Documentation

```markdown
# System Architecture

## Components

### Backend
- **Language**: Go 1.23.0
- **Framework**: Gin v1.10.1
- **Database**: MongoDB (primary)
- **Cache**: Redis v7
- **Object Storage**: MinIO v7.0.60
- **Message Queue**: NATS 2.10

### Frontend
- **Framework**: Next.js 14.2.4 (App Router)
- **UI**: React 18.2.0
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.3

## Data Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ HTTP Request (with cookie)
       ↓
┌─────────────────────┐
│  Next.js Frontend   │
│  (Server Component) │
└──────┬──────────────┘
       │
       │ API Call
       ↓
┌─────────────────────┐
│   Go Backend        │
│   (Gin + Handler)   │
└──────┬──────────────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       ↓              ↓              ↓              ↓
   ┌─────┐      ┌─────┐      ┌─────┐      ┌─────┐
   │Mongo │      │Redis │      │MinIO │      │ NATS │
   └─────┘      └─────┘      └─────┘      └─────┘
```

## Database Collections

- `users` - User accounts and profiles
- `projects` - Project listings
- `products` - Product listings
- `posts` - Blog posts
- `jobs` - Job listings
- `companies` - Company profiles
- `pitch_pages` - Pitch pages
- `deal_rooms` - Deal rooms
- `investors` - Investor profiles
```

## Documentation Tools

### Go Documentation
```bash
# Generate documentation
godoc -http=:6060

# View documentation
# Open http://localhost:6060/pkg/real_deal/

# Install godoc
go install golang.org/x/tools/cmd/godoc@latest
```

### Frontend Documentation
```bash
# Generate JSDoc
npx jsdoc web/components/*.tsx

# Install JSDoc
npm install -D jsdoc
```

### API Documentation (Swagger)
```bash
# Install swag for Go
go install github.com/swaggo/swag/cmd/swag@latest

# Generate Swagger docs
swag init

# Run Swagger UI
swag serve
```

## Documentation Structure

```
docs/
  api/                      # API documentation
    endpoints.md            # All API endpoints
    authentication.md       # Auth flow docs
    examples.md             # Request/response examples
  architecture/             # System architecture
    overview.md             # High-level architecture
    data-models.md          # Database schemas
    workflows.md            # Key workflows
  guides/                   # User guides
    getting-started.md      # Quick start
    features.md             # Feature walkthroughs
    deployment.md           # Deployment guide
  development/              # Developer docs
    setup.md                # Local development setup
    contributing.md         # Contribution guidelines
    testing.md              # Testing procedures
```

## Auto-Generation Scripts

### Generate API Documentation
```bash
#!/bin/bash
# .agents/documentation-agent/scripts/generate-api-docs.sh

echo "Generating API documentation..."

# Generate Swagger docs from Go handlers
swag init -g cmd/server/main.go -o docs/api

echo "API documentation generated in docs/api/"
```

### Generate Component Documentation
```bash
#!/bin/bash
# .agents/documentation-agent/scripts/generate-component-docs.sh

echo "Generating component documentation..."

cd web

# Generate JSDoc from React components
npx jsdoc components/*.tsx --configure jsdoc.json --destination docs/components

echo "Component documentation generated in docs/components/"
```

### Generate README
```bash
#!/bin/bash
# .agents/documentation-agent/scripts/generate-readme.sh

cat > README.md << 'EOF'
# Real Deal

## Description
...

## Quick Start
...

## Documentation
- [API Documentation](docs/api/)
- [Architecture](docs/architecture/)
- [Development Guide](docs/development/)
EOF

echo "README.md generated!"
```

## Update Workflow

### When to Update Docs
- New API endpoint added → Update API docs
- New component created → Generate JSDoc
- Code refactored → Update relevant docs
- Schema changed → Update data models
- New feature released → Update user guides

### Documentation Update Process

1. Detect code changes
```bash
# Find modified files
git diff --name-only HEAD~1 HEAD
```

2. Parse code for documentation
```bash
# Extract JSDoc comments
grep -r "/\*\*" web/components/
```

3. Generate/update docs
```bash
bash .agents/documentation-agent/scripts/generate-api-docs.sh
bash .agents/documentation-agent/scripts/generate-component-docs.sh
```

4. Validate links and references
```bash
# Check for broken links
# (Use a link checker tool)
```

5. Commit docs with changes
```bash
git add docs/
git commit -m "Update documentation"
```

## Best Practices

### API Documentation
- Include request/response examples
- Document authentication requirements
- Specify status codes and error responses
- Include rate limiting information

### Code Documentation
- Keep it brief and focused
- Explain "why", not "what"
- Use examples for complex logic
- Document function signatures and parameters

### Architecture Documentation
- Include diagrams where helpful
- Explain design decisions
- Document data flow
- Include deployment considerations

## Integration Points
- API docs: Integrate with Swagger UI
- Component docs: Integrate with Storybook (if added)
- CI/CD: Auto-generate docs on build
- Version control: Track docs alongside code

