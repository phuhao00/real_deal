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

## Trigger Conditions
- On every pull request
- On code changes
- On-demand manual review
- Before deployment

## Review Workflow

### Backend (Go)
1. Check handler patterns match project structure
2. Verify MongoDB queries are optimized
3. Review Redis caching strategy
4. Ensure MinIO file handling is secure
5. Validate CORS and security headers
6. Check for proper error responses

### Frontend (Next.js/React)
1. Review component structure and reusability
2. Check for proper TypeScript types
3. Verify API integration patterns
4. Ensure responsive design with Tailwind
5. Check accessibility (a11y) compliance
6. Review performance (bundle size, lazy loading)

## Output Format

### Review Comments
```markdown
## Code Quality
- [✓/✗] Follows project conventions
- [✓/✗] Proper error handling
- [✓/✗] No code smells

## Security
- [✓/✗] No vulnerabilities detected
- [✓/✗] Proper authentication
- [✓/✗] Input validation

## Performance
- [✓/✗] Database queries optimized
- [✓/✗] Caching strategy appropriate
- [✓/✗] Bundle size reasonable

## Recommendations
1. Consider using X for better performance
2. Security issue: Y needs attention
```

## Integration Points
- GitHub PR comments
- CI/CD pipeline
- Manual trigger via CLI
- Webhook for automated reviews
