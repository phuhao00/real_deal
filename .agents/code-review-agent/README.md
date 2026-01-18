# Code Review Agent

## Purpose
Automated code review agent for the real_deal platform that analyzes code quality, security, performance, and best practices across both Go backend and Next.js frontend codebases.

## Responsibilities

### Code Quality
- Check for common anti-patterns
- Verify code follows project conventions
- Identify code smells and refactoring opportunities
- Ensure proper error handling
- Validate naming conventions

### Security Review
- Scan for security vulnerabilities (SQL injection, XSS, CSRF)
- Check for hardcoded secrets/credentials
- Verify proper authentication/authorization patterns
- Review data validation and sanitization
- Ensure secure file handling

### Performance Analysis
- Identify performance bottlenecks
- Check for inefficient database queries
- Review caching strategies
- Analyze frontend render performance
- Check for memory leaks or resource issues

### Best Practices
- Go-specific: idiomatic code, proper error handling, context usage
- React/Next.js-specific: hooks usage, component design, state management
- Database: proper indexing, transaction handling
- API: REST conventions, versioning

## Review Checklist

### Backend (Go)

#### Handler Pattern Review
```go
// ✓ Good - Follows project pattern
type JobHandler struct{ DB *mongo.Database }
func NewJob(db *mongo.Database) *JobHandler { return &JobHandler{DB: db} }
func (h *JobHandler) List(c *gin.Context) {
    ctx := context.Background()
    cur, err := h.DB.Collection("jobs").Find(ctx, bson.D{}, nil)
    if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()}); return }
    var items []Job
    for cur.Next(ctx) { var j Job; _ = cur.Decode(&j); items = append(items, j) }
    c.JSON(http.StatusOK, items)
}

// ✗ Bad - Missing error context, improper response
func (h *JobHandler) ListBad(c *gin.Context) {
    cur, _ := h.DB.Collection("jobs").Find(nil, nil)  // No context
    var items []Job
    for cur.Next(nil) { cur.Decode(&items[0]) }  // Decode into array element
    c.JSON(200, items)  // Magic number
}
```

#### MongoDB Query Review
```go
// ✓ Good - Proper context, error handling
ctx := context.Background()
cur, err := h.DB.Collection("jobs").Find(ctx, bson.M{"location": "上海"})
if err != nil { c.JSON(500, gin.H{"error": err.Error()}); return }

// ✗ Bad - No context, no error handling
cur, _ := h.DB.Collection("jobs").Find(nil, bson.M{"$where": "this.title == '" + input + "'"})
```

#### Authentication Review
```go
// ✓ Good - Proper cookie validation
func (h *AuthHandler) Me(c *gin.Context) {
    uid, err := c.Cookie("uid")
    if err != nil { c.JSON(401, gin.H{"error": "unauth"}); return }
    ctx := context.Background()
    var u map[string]any
    err = h.DB.Collection("users").FindOne(ctx, bson.M{"id": uid}).Decode(&u)
    if err != nil { c.JSON(401, gin.H{"error": "unauth"}); return }
    c.JSON(200, u)
}

// ✗ Bad - No authentication check
func (h *AuthHandler) MeBad(c *gin.Context) {
    var u map[string]any
    h.DB.Collection("users").FindOne(nil, bson.M{"id": c.Param("id")}).Decode(&u)
    c.JSON(200, u)
}
```

### Frontend (Next.js/React)

#### Component Pattern Review
```typescript
// ✓ Good - Server component, proper typing
export default async function Page({ searchParams }: { searchParams?: { q?: string } }) {
  const data = await api<DataType>('/api/explore')
  return <FeedLayout>...</FeedLayout>
}

// ✗ Bad - Server component using client-only features
export default async function PageBad() {
  const [count, setCount] = useState(0)  // Error!
  return <div>{count}</div>
}

// ✓ Good - Client component with "use client"
"use client"
export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

#### TypeScript Type Review
```typescript
// ✓ Good - Proper typing
interface Props {
  title: string
  subtitle?: string
  tags?: string[]
}
export default function Card({ title, subtitle, tags }: Props) {
  return <div>{title}</div>
}

// ✗ Bad - Using `any`
export default function CardBad({ title, subtitle, tags }: any) {
  return <div>{title}</div>
}
```

#### API Integration Review
```typescript
// ✓ Good - Proper error handling
const data = await api<DataType>('/api/jobs')

// ✗ Bad - No error handling
const res = await fetch('http://localhost:8080/api/jobs')
const data = await res.json()  // May throw if !res.ok
```

## Security Checks

### Common Vulnerabilities to Check

#### SQL/NoSQL Injection
```go
// ✗ Vulnerable
query := bson.M{"$where": "this.title == '" + userInput + '""}

// ✓ Safe
query := bson.M{"title": userInput}
```

#### XSS Prevention
```typescript
// ✗ Vulnerable
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✓ Safe - React auto-escapes
<div>{userInput}</div>
```

#### Hardcoded Secrets
```go
// ✗ Bad
apiKey := "hardcoded-secret-key"

// ✓ Good
apiKey := os.Getenv("API_KEY")
```

## Performance Checks

### Backend Performance
- Database query efficiency (proper indexes, limit usage)
- Context timeout usage
- Connection pooling
- Caching strategy (Redis)

### Frontend Performance
- Bundle size analysis
- Lazy loading implementation
- Component re-render optimization
- Image optimization

## Output Format

### Review Report
```markdown
## Code Review Report

### File: internal/handlers/jobs.go

#### Code Quality
- [✓] Follows project handler pattern
- [✓] Proper error handling
- [✓] Good naming conventions

#### Security
- [✗] Issue: MongoDB query uses user input directly in filter without sanitization
  - Location: Line 18
  - Severity: Medium
  - Recommendation: Use bson.M with validated input

#### Performance
- [✓] Uses context with timeout
- [✗] Issue: No pagination, may return large result sets
  - Recommendation: Implement pagination with limit/offset

#### Recommendations
1. Add input validation for query parameters
2. Implement pagination for list endpoints
3. Add unit tests for this handler
```

## Tools Integration

### Static Analysis Tools

#### Go
```bash
# Go vet
go vet ./...

# Go fmt
gofmt -l .

# Golangci-lint
golangci-lint run

# Static check
staticcheck ./...
```

#### TypeScript/React
```bash
# TypeScript check
npx tsc --noEmit

# ESLint (if configured)
npm run lint

# Prettier (if configured)
npx prettier --check "**/*.{ts,tsx,js,jsx}"
```

## Trigger Conditions
- On every pull request
- On code changes
- On-demand manual review
- Before deployment

## Integration Points
- GitHub PR comments
- CI/CD pipeline
- Manual trigger via CLI
- Webhook for automated reviews

## Scripts

### Run Code Review
```bash
# Backend review
bash .agents/code-review-agent/scripts/review-backend.sh

# Frontend review
bash .agents/code-review-agent/scripts/review-frontend.sh

# Full review
bash .agents/code-review-agent/scripts/review-all.sh
```

