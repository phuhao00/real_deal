#!/bin/bash

# Design System Check Script
# 检查设计系统一致性和最佳实践

set -e

echo "🎨 Checking Design System..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check functions
check_pass() {
  echo -e "${GREEN}✓${NC} $1"
}

check_warn() {
  echo -e "${YELLOW}⚠${NC} $1"
}

check_fail() {
  echo -e "${RED}✗${NC} $1"
}

# 1. Check design tokens consistency
echo ""
echo "Checking Design Tokens..."

if [ -f "web/app/globals.css" ]; then
  if grep -q "var(--color-primary)" web/app/globals.css; then
    check_pass "Design tokens are defined"
  else
    check_warn "Design tokens might not be properly defined"
  fi
else
  check_fail "globals.css not found"
fi

# 2. Check component consistency
echo ""
echo "Checking Component Patterns..."

component_files=(
  "web/components/Card.tsx"
  "web/components/Composer.tsx"
  "web/components/FeedRow.tsx"
)

for file in "${component_files[@]}"; do
  if [ -f "$file" ]; then
    check_pass "Component exists: $file"
  else
    check_warn "Component not found: $file"
  fi
done

# 3. Check Tailwind configuration
echo ""
echo "Checking Tailwind Configuration..."

if [ -f "web/tailwind.config.js" ]; then
  check_pass "Tailwind config found"
  
  # Check for theme extension
  if grep -q "theme" web/tailwind.config.js; then
    check_pass "Theme is configured"
  fi
else
  check_fail "Tailwind config not found"
fi

# 4. Check CSS variable usage
echo ""
echo "Checking CSS Variable Usage..."

css_files=$(find web -name "*.css" -o -name "*.tsx" | head -5)
for file in $css_files; do
  if [ -f "$file" ]; then
    css_var_count=$(grep -c "var(--" "$file" || true)
    if [ "$css_var_count" -gt 0 ]; then
      check_pass "Using CSS variables: $file ($css_var_count occurrences)"
    fi
  fi
done

# 5. Check accessibility
echo ""
echo "Checking Accessibility Patterns..."

# Check for aria-labels
tsx_files=$(find web -name "*.tsx" | head -10)
has_aria=0
for file in $tsx_files; do
  if [ -f "$file" ]; then
    if grep -q "aria-" "$file"; then
      has_aria=1
      break
    fi
  fi
done

if [ "$has_aria" -eq 1 ]; then
  check_pass "ARIA attributes are used"
else
  check_warn "Consider adding ARIA attributes for accessibility"
fi

# 6. Check responsive design
echo ""
echo "Checking Responsive Design..."

# Check for responsive classes
responsive_patterns=("md:" "lg:" "xl:" "sm:")
has_responsive=0
for file in $tsx_files; do
  if [ -f "$file" ]; then
    for pattern in "${responsive_patterns[@]}"; do
      if grep -q "$pattern" "$file"; then
        has_responsive=1
        break
      fi
    done
    if [ "$has_responsive" -eq 1 ]; then
      break
    fi
  fi
done

if [ "$has_responsive" -eq 1 ]; then
  check_pass "Responsive design patterns found"
else
  check_warn "Consider adding responsive design patterns"
fi

# 7. Check for color contrast (basic check)
echo ""
echo "Checking Color Contrast..."

if [ -f "web/app/globals.css" ]; then
  if grep -q "color.*contrast\|contrast.*color" web/app/globals.css; then
    check_pass "Color contrast is considered"
  else
    check_warn "Consider documenting color contrast requirements"
  fi
fi

# 8. Check for semantic HTML
echo ""
echo "Checking Semantic HTML..."

semantic_tags=("article" "section" "nav" "header" "footer" "main")
has_semantic=0
for file in $tsx_files; do
  if [ -f "$file" ]; then
    for tag in "${semantic_tags[@]}"; do
      if grep -q "<$tag\|</$tag>" "$file"; then
        has_semantic=1
        break
      fi
    done
    if [ "$has_semantic" -eq 1 ]; then
      break
    fi
  fi
done

if [ "$has_semantic" -eq 1 ]; then
  check_pass "Semantic HTML tags are used"
else
  check_warn "Consider using semantic HTML tags"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Design System Check Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "For detailed design guidelines, see:"
echo "  📖 .skills/product-design-skill/"
echo ""
echo "Design tokens reference:"
echo "  🎨 .skills/product-design-skill/references/design-tokens.md"
echo ""
echo "Component patterns:"
echo "  🧩 .skills/product-design-skill/references/component-patterns.md"
echo ""
