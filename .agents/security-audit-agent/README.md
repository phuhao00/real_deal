# Security Audit Agent

## Purpose
Automated security audit agent for the real_deal platform that performs security scans, vulnerability assessments, compliance checks, and security best practices validation for both Go backend and Next.js frontend.

## Responsibilities

### Vulnerability Scanning
- Scan dependencies for known vulnerabilities
- Detect security flaws in code
- Check for hardcoded secrets
- Identify misconfigurations
- Scan containers for vulnerabilities

### Code Security Review
- Review authentication/authorization logic
- Check input validation and sanitization
- Verify secure data handling
- Audit file upload security
- Review API security

### Compliance Checking
- GDPR/CCPA/PIPL compliance
- OWASP Top 10 vulnerability checks
- Security headers validation
- Encryption standards verification
- Data protection policies

### Security Monitoring
- Monitor for security events
- Detect suspicious activities
- Track access logs
- Analyze authentication attempts
- Monitor for data breaches

## Security Checks

### Backend Security (Go)

#### Authentication & Authorization
```go
// Check: JWT validation on protected routes
// Required: Auth middleware on all non-public endpoints
// Verify: Proper token expiration and refresh

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatus(401)
            return
        }
        // Validate token
        claims := ValidateToken(token)
        c.Set("user_id", claims.UserID)
        c.Next()
    }
}
```

#### Input Validation
```go
// Check: All inputs validated and sanitized
// Required: Use validator v10 for struct validation
// Verify: No SQL injection or NoSQL injection risks

type CreateJobRequest struct {
    Title       string `json:"title" binding:"required,min=3,max=100"`
    Description string `json:"description" binding:"required,max=5000"`
    Salary      int    `json:"salary" binding:"min=0,max=1000000"`
}
```

#### MongoDB Injection Prevention
```go
// Check: Use parameterized queries
// Required: No raw user input in MongoDB queries
// Verify: Proper sanitization of filter objects

// BAD
filter := bson.M{"$where": fmt.Sprintf("this.title == '%s'", userInput)}

// GOOD
filter := bson.M{"title": userInput}
```

#### File Upload Security
```go
// Check: Validate file type, size, and content
// Required: Scan files for malware
// Verify: Store in secure location (MinIO with access controls)

func ValidateUpload(file *multipart.FileHeader) error {
    if file.Size > maxFileSize {
        return ErrFileTooLarge
    }
    if !allowedTypes[file.Header.Get("Content-Type")] {
        return ErrInvalidFileType
    }
    return nil
}
```

### Frontend Security (Next.js/React)

#### XSS Prevention
```typescript
// Check: No unsafe HTML rendering
// Required: Use React's automatic escaping
// Verify: Avoid dangerouslySetInnerHTML

// BAD
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// GOOD
<div>{userInput}</div>
```

#### CSRF Protection
```typescript
// Check: CSRF tokens on state-changing requests
// Required: httpOnly cookies for JWT
// Verify: SameSite cookie attributes

// In cookie: httpOnly; Secure; SameSite=Lax
```

#### Content Security Policy
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.trust.com"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  }
}
```

## Dependency Scanning

### Go Dependencies
```bash
# Scan for vulnerabilities
govulncheck ./...

# Update dependencies
go get -u ./...
go mod tidy
```

### Node.js Dependencies
```bash
# Scan for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

## Security Headers

### Required Headers
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
```

## OWASP Top 10 Checks

1. **Injection** (SQL, NoSQL, Command injection)
   - Validate all inputs
   - Use parameterized queries
   - Sanitize user data

2. **Broken Authentication**
   - Proper JWT handling
   - Secure password storage (bcrypt)
   - Session management

3. **Sensitive Data Exposure**
   - Encrypt at rest (MongoDB encryption)
   - TLS in transit
   - Never log sensitive data

4. **XML External Entities (XXE)**
   - Disable XML parsing if possible
   - Use secure XML parsers

5. **Broken Access Control**
   - Proper authorization checks
   - Principle of least privilege
   - Role-based access control

6. **Security Misconfiguration**
   - Secure defaults
   - Remove debug flags in production
   - Proper error handling

7. **Cross-Site Scripting (XSS)**
   - React auto-escaping
   - CSP headers
   - Input validation

8. **Insecure Deserialization**
   - Validate deserialized objects
   - Use safe serialization formats

9. **Using Components with Known Vulnerabilities**
   - Regular dependency updates
   - Automated scanning

10. **Insufficient Logging & Monitoring**
    - Log security events
    - Monitor for anomalies
    - Alert on suspicious activity

## Compliance Checks

### GDPR Compliance
- [ ] Data protection impact assessments
- [ ] Right to data portability
- [ ] Right to be forgotten
- [ ] Consent management
- [ ] Data breach notification

### CCPA Compliance
- [ ] Do not sell my personal info
- [ ] Right to know
- [ ] Right to delete
- [ ] Right to opt-out

### PIPL (China) Compliance
- [ ] Data localization
- [ ] Consent requirements
- [ ] Data protection measures

## Security Audit Workflow

### Automated Scans
1. Run dependency vulnerability scans
2. Check for hardcoded secrets
3. Verify security headers
4. Audit authentication/authorization
5. Generate security report

### Manual Review
1. Review critical code paths
2. Check sensitive data handling
3. Verify encryption standards
4. Review access controls
5. Test security features

### Reporting
```markdown
## Security Audit Report

### Critical Issues
- [ ] Description
  - Location: file:line
  - Severity: Critical
  - Recommendation: Fix immediately

### High Issues
- [ ] Description
  - Location: file:line
  - Severity: High
  - Recommendation: Fix within 24 hours

### Medium Issues
- [ ] Description
  - Location: file:line
  - Severity: Medium
  - Recommendation: Fix within 1 week

### Low Issues
- [ ] Description
  - Location: file:line
  - Severity: Low
  - Recommendation: Fix next release
```

## Integration Points
- Automated scanning in CI/CD
- Security alerts via Slack/email
- Vulnerability database feeds (NVD, CVE)
- Security monitoring dashboards
- Compliance tracking tools
