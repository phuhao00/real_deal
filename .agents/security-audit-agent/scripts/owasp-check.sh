#!/bin/bash
# Run OWASP Top 10 security checks

echo "=== OWASP Top 10 Security Checks ==="
echo ""

# A01: Injection
echo "A01: Injection (SQL/NoSQL/XSS)..."
# Check for unsafe queries
if grep -r "bson.M{.*\$where" internal/handlers/; then
    echo "⚠️  Warning: Unsafe MongoDB query found (using \$where)"
fi

# A02: Broken Authentication
echo "A02: Broken Authentication..."
# Check for authentication on sensitive endpoints
if grep -r "c.JSON.*statusUnauthorized" internal/handlers/; then
    echo "✓ Authentication checks found"
fi

# A03: Sensitive Data Exposure
echo "A03: Sensitive Data Exposure..."
# Check for logging of sensitive data
if grep -rE 'log.*password|log.*secret|log.*token' internal/; then
    echo "⚠️  Warning: Possible sensitive data logging found"
fi

# A04: XML External Entities
echo "A04: XML External Entities..."
# Check for XML parsing (not commonly used)
if grep -r "xml" internal/ web/; then
    echo "⚠️  Warning: XML parsing detected - ensure secure parser is used"
fi

# A05: Broken Access Control
echo "A05: Broken Access Control..."
# Check for proper access control
echo "✓ Manual review of access control required"

# A06: Security Misconfiguration
echo "A06: Security Misconfiguration..."
# Check for debug flags in production
if grep -r "debug.*true" internal/; then
    echo "⚠️  Warning: Debug mode may be enabled"
fi

# A07: XSS
echo "A07: Cross-Site Scripting (XSS)..."
# Check for dangerouslySetInnerHTML
if grep -r "dangerouslySetInnerHTML" web/; then
    echo "⚠️  Warning: dangerouslySetInnerHTML found - ensure proper sanitization"
fi

# A08: Insecure Deserialization
echo "A08: Insecure Deserialization..."
# Check for deserialization
echo "✓ Manual review of deserialization required"

# A09: Known Vulnerabilities
echo "A09: Known Vulnerabilities..."
# Run dependency audits
if command -v govulncheck &> /dev/null; then
    govulncheck ./... || true
fi

# A10: Logging & Monitoring
echo "A10: Insufficient Logging & Monitoring..."
# Check for logging
if grep -r "logrus\|fmt.Print" internal/; then
    echo "✓ Logging found"
fi

echo ""
echo "OWASP Top 10 checks completed!"
echo "Review warnings and address security concerns."
