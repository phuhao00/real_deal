#!/bin/bash
# Review backend code quality

echo "Reviewing backend code..."

# Check Go code
echo "Running go vet..."
go vet ./...

# Check formatting
echo "Checking formatting..."
UNFORMATTED=$(gofmt -l .)
if [ ! -z "$UNFORMATTED" ]; then
    echo "Unformatted files:"
    echo "$UNFORMATTED"
    exit 1
fi

# Run golangci-lint if available
if command -v golangci-lint &> /dev/null; then
    echo "Running golangci-lint..."
    golangci-lint run
fi

# Run static check if available
if command -v staticcheck &> /dev/null; then
    echo "Running staticcheck..."
    staticcheck ./...
fi

# Check for hardcoded secrets
echo "Checking for hardcoded secrets..."
if grep -rE '(password|secret|api_key|token)\s*=\s*["\047][^"\047]{8,}' ./ --include="*.go" | grep -v "os.Getenv"; then
    echo "Warning: Possible hardcoded secrets found"
fi

echo "Backend review completed!"
