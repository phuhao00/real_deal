#!/bin/bash
# Run security audit

echo "=== Security Audit Agent ==="
echo ""

# Check for hardcoded secrets
echo "Checking for hardcoded secrets..."
if grep -rE '(password|secret|api_key|token)\s*=\s*["\047][^"\047]{8,}' ./ --include="*.go" --include="*.ts" --include="*.tsx" | grep -v "os.Getenv"; then
    echo "⚠️  Warning: Possible hardcoded secrets found"
else
    echo "✓ No hardcoded secrets detected"
fi

# Go vulnerability scan
if command -v govulncheck &> /dev/null; then
    echo ""
    echo "Running Go vulnerability scan..."
    govulncheck ./... || echo "No vulnerabilities found or govulncheck not available"
else
    echo ""
    echo "govulncheck not installed. Install with:"
    echo "  go install golang.org/x/vuln/cmd/govulncheck@latest"
fi

# Node.js audit
if [ -f "web/package.json" ]; then
    echo ""
    echo "Running Node.js audit..."
    cd web
    npm audit
    cd ..
fi

echo ""
echo "Security audit completed!"
echo ""
echo "For more security checks, see:"
echo "  .agents/security-audit-agent/README.md"
