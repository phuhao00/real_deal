#!/bin/bash
# Review frontend code quality

cd web

echo "Reviewing frontend code..."

# TypeScript type check
echo "Running TypeScript type check..."
npx tsc --noEmit

# Run ESLint if configured
if grep -q '"lint"' package.json; then
    echo "Running ESLint..."
    npm run lint
fi

# Check formatting with Prettier if configured
if grep -q 'prettier' package.json; then
    echo "Running Prettier check..."
    npx prettier --check "**/*.{ts,tsx,js,jsx,css}"
fi

# Check for console.log in production code
echo "Checking for console.log..."
if grep -r "console.log" app/ components/ --include="*.tsx" --include="*.ts" | grep -v "//"; then
    echo "Warning: console.log found in production code"
fi

echo "Frontend review completed!"
