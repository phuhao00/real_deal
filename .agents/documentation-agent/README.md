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
## GET /api/jobs

Lists all jobs with optional filtering.

### Authentication
Required: Bearer token

### Query Parameters
- `company_id` (optional): Filter by company
- `status` (optional): Filter by status (active/closed)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

### Response
```json
{
  "jobs": [...],
  "total": 100,
  "page": 1
}
```
```

### Code Documentation
```go
// ListJobs retrieves all jobs from the database.
// It supports filtering by company and status.
// Returns a JSON array of jobs or an error if the query fails.
func (h *JobHandler) List(c *gin.Context) {
    // Implementation
}
```

```typescript
/**
 * JobList component displays a list of jobs with filtering options.
 *
 * @props {Job[]} jobs - Array of jobs to display
 * @props {string} filter - Current filter applied
 * @props {(filter: string) => void} onFilterChange - Callback when filter changes
 *
 * @example
 * <JobList jobs={jobs} filter="active" onFilterChange={setFilter} />
 */
export default function JobList({ jobs, filter, onFilterChange }: Props) {
    // Implementation
}
```

### Architecture Documentation
```markdown
## System Architecture

### Components
- **Backend**: Go/Gin API server with MongoDB + Redis
- **Frontend**: Next.js with React and Tailwind CSS
- **Storage**: MinIO for file storage
- **Auth**: OAuth/OIDC with multiple providers

### Data Flow
1. User authenticates via OAuth
2. Frontend stores JWT in httpOnly cookie
3. API requests include auth token
4. Backend validates token
5. Business logic processes request
6. Response returned to frontend
```

## Documentation Tools

### Go Documentation
- `godoc` for package documentation
- `swag` for OpenAPI specs
- Inline comments for code explanations

### Frontend Documentation
- JSDoc for React components
- Storybook for component documentation
- TypeDoc for TypeScript type documentation

### General
- Markdown for general docs
- Mermaid for diagrams
- PlantUML for architecture diagrams

## Documentation Structure

```
docs/
  api/                      # API documentation
    openapi.json            # OpenAPI spec
    endpoints.md            # Endpoint reference
    authentication.md       # Auth flow docs
  architecture/             # System architecture
    overview.md             # High-level architecture
    data-models.md          # Database schemas
    workflows.md            # Key workflows
  guides/                   # User guides
    getting-started.md      # Quick start
    features.md             # Feature walkthroughs
    configuration.md        # Setup and config
  development/              # Developer docs
    setup.md                # Local development setup
    contributing.md         # Contribution guidelines
    testing.md              # Testing procedures
```

## Auto-Generation Triggers

### When to Generate
- New API endpoint added → Generate API docs
- New component created → Generate JSDoc
- Code refactored → Update docs
- Schema changed → Update data models
- New feature released → Update guides

### Update Workflow
1. Detect code changes
2. Parse code for documentation
3. Generate/update docs
4. Validate links and references
5. Commit docs with changes

## Integration Points
- API docs: Integrate with Swagger UI
- Component docs: Integrate with Storybook
- CI/CD: Auto-generate docs on build
- Version control: Track docs alongside code
