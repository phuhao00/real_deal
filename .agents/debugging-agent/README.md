# Debugging Agent

## Purpose
Automated debugging agent for the real_deal platform that diagnoses and fixes bugs, resolves errors, tracks issues, and provides troubleshooting guidance for both Go backend and Next.js frontend issues.

## Responsibilities

### Error Detection
- Monitor application logs
- Detect runtime errors
- Identify performance issues
- Catch security vulnerabilities
- Track unhandled exceptions

### Diagnosis
- Analyze error stack traces
- Identify root causes
- Reproduce issues
- Check related code paths
- Review recent changes

### Bug Fixing
- Apply fixes for known issues
- Refactor problematic code
- Update dependencies
- Patch security vulnerabilities
- Optimize performance bottlenecks

### Issue Tracking
- Log all detected issues
- Categorize by severity/type
- Track fix progress
- Generate issue reports
- Notify stakeholders

## Common Issues & Solutions

### Backend Issues

#### Database Errors
```go
// Issue: Connection timeout
// Diagnosis: MongoDB connection pool exhausted
// Solution: Increase connection pool size or add connection reuse
```

#### Redis Errors
```go
// Issue: Cache misses
// Diagnosis: Cache keys not set or expired too quickly
// Solution: Implement cache warming and set appropriate TTL
```

#### MinIO Errors
```go
// Issue: Upload failed
// Diagnosis: Bucket not created or permission denied
// Solution: Ensure bucket exists and credentials are correct
```

### Frontend Issues

#### Build Errors
```typescript
// Issue: TypeScript compilation error
// Diagnosis: Type mismatch in component props
// Solution: Update interface or fix prop usage
```

#### Runtime Errors
```typescript
// Issue: "Cannot read property of undefined"
// Diagnosis: Optional chaining missing
// Solution: Add optional chaining or null checks
```

#### Performance Issues
```typescript
// Issue: Slow page load
// Diagnosis: Large bundle size or missing lazy loading
// Solution: Implement code splitting and lazy loading
```

## Debugging Workflow

### Step 1: Issue Detection
1. Monitor logs and metrics
2. Parse error messages
3. Categorize issue type
4. Assess severity level

### Step 2: Diagnosis
1. Analyze stack trace
2. Review code changes
3. Check configuration
4. Reproduce issue locally

### Step 3: Root Cause Analysis
```markdown
## Root Cause Analysis
### Issue: Job listing returns 500 error
### Location: `internal/handlers/jobs.go:45`
### Cause: MongoDB connection not properly initialized
### Impact: All job-related endpoints failing
```

### Step 4: Fix Implementation
1. Apply patch to code
2. Test fix locally
3. Update tests if needed
4. Document the fix

### Step 5: Verification
1. Run automated tests
2. Verify in staging
3. Monitor production
4. Confirm issue resolved

## Debugging Tools

### Backend (Go)
```bash
# Check logs
tail -f logs/server.log

# Run with verbose logging
go run cmd/server/main.go -v

# Debug with Delve
dlv debug cmd/server/main.go
```

### Frontend (Next.js)
```bash
# Check browser console
# Use React DevTools
# Run with debug mode
npm run dev -- --debug

# Build with source maps
npm run build -- --source-map
```

### Database Debugging
```bash
# MongoDB
mongosh --eval "db.getCollectionNames()"
db.jobs.find().pretty()

# Redis
redis-cli monitor
redis-cli --scan --pattern "*"
```

## Error Categories

### Severity Levels
- **Critical**: System down, data loss, security breach
- **High**: Major feature broken, significant performance impact
- **Medium**: Minor feature broken, performance degradation
- **Low**: Cosmetic issues, non-blocking bugs

### Type Categories
- **Runtime Errors**: Exceptions during execution
- **Logic Errors**: Incorrect behavior
- **Performance**: Slow response times
- **Security**: Vulnerabilities or unauthorized access
- **Integration**: Third-party service failures

## Integration Points

### Monitoring
- Application logs (logrus for Go)
- Error tracking (Sentry)
- Performance monitoring (APM)
- Health check endpoints

### Alerting
- Slack/webhook notifications
- Email alerts for critical issues
- Dashboard for issue tracking
- Weekly issue summary reports

### Collaboration
- Create GitHub issues automatically
- Assign issues to developers
- Track resolution time
- Generate post-mortem reports
