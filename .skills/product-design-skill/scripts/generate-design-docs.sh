#!/bin/bash

# Generate Design Documentation
# 生成设计文档和组件说明

set -e

echo "📚 Generating Design Documentation..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

OUTPUT_DIR=".skills/product-design-skill/generated-docs"
mkdir -p "$OUTPUT_DIR"

# 1. Analyze components
echo ""
echo -e "${BLUE}1. Analyzing Components...${NC}"

COMPONENTS_FILE="$OUTPUT_DIR/components-overview.md"
cat > "$COMPONENTS_FILE" << 'EOF'
# Components Overview (组件概览)

Generated: $(date)

## Available Components (可用组件)

EOF

# Find all component files
find web/components -name "*.tsx" -type f | while read file; do
  basename=$(basename "$file" .tsx)
  
  # Extract component description from comments
  description=$(grep -A 5 "^//" "$file" | head -6 || echo "No description")
  
  cat >> "$COMPONENTS_FILE" << EOF

### $basename

**File:** \`$file\`

$description

EOF
done

echo -e "${GREEN}✓${NC} Components overview: $COMPONENTS_FILE"

# 2. Analyze design tokens usage
echo ""
echo -e "${BLUE}2. Analyzing Design Tokens Usage...${NC}"

TOKENS_FILE="$OUTPUT_DIR/tokens-usage.md"
cat > "$TOKENS_FILE" << 'EOF'
# Design Tokens Usage (设计令牌使用情况)

Generated: $(date)

## Color Usage (色彩使用)

EOF

# Analyze color usage in components
find web/components -name "*.tsx" -type f | while read file; do
  basename=$(basename "$file" .tsx)
  
  # Count CSS variable usage
  primary_count=$(grep -o "var(--primary" "$file" | wc -l)
  fg_count=$(grep -o "var(--fg" "$file" | wc -l)
  bg_count=$(grep -o "var(--bg" "$file" | wc -l)
  border_count=$(grep -o "var(--border" "$file" | wc -l)
  
  total=$((primary_count + fg_count + bg_count + border_count))
  
  if [ $total -gt 0 ]; then
    cat >> "$TOKENS_FILE" << EOF

#### $basename
- Primary: $primary_count
- Foreground: $fg_count
- Background: $bg_count
- Border: $border_count
- Total: $total

EOF
  fi
done

echo -e "${GREEN}✓${NC} Tokens usage: $TOKENS_FILE"

# 3. Analyze spacing patterns
echo ""
echo -e "${BLUE}3. Analyzing Spacing Patterns...${NC}"

SPACING_FILE="$OUTPUT_DIR/spacing-analysis.md"
cat > "$SPACING_FILE" << 'EOF'
# Spacing Patterns Analysis (间距模式分析)

Generated: $(date)

## Common Spacing Values (常用间距值)

EOF

# Extract spacing values from Tailwind classes
find web/components -name "*.tsx" -type f | while read file; do
  basename=$(basename "$file" .tsx)
  
  # Extract Tailwind spacing classes
  p_classes=$(grep -oE 'p-[0-9]|px-[0-9]|py-[0-9]|pt-[0-9]|pb-[0-9]|pl-[0-9]|pr-[0-9]' "$file" | sort | uniq -c | sort -rn)
  m_classes=$(grep -oE 'm-[0-9]|mx-[0-9]|my-[0-9]|mt-[0-9]|mb-[0-9]|ml-[0-9]|mr-[0-9]' "$file" | sort | uniq -c | sort -rn)
  gap_classes=$(grep -oE 'gap-[0-9]' "$file" | sort | uniq -c | sort -rn)
  
  if [ -n "$p_classes" ] || [ -n "$m_classes" ] || [ -n "$gap_classes" ]; then
    cat >> "$SPACING_FILE" << EOF

#### $basename

**Padding:**
$p_classes

**Margin:**
$m_classes

**Gap:**
$gap_classes

EOF
  fi
done

echo -e "${GREEN}✓${NC} Spacing analysis: $SPACING_FILE"

# 4. Analyze accessibility
echo ""
echo -e "${BLUE}4. Analyzing Accessibility...${NC}"

A11Y_FILE="$OUTPUT_DIR/accessibility-report.md"
cat > "$A11Y_FILE" << 'EOF'
# Accessibility Report (可访问性报告)

Generated: $(date)

## Components with ARIA Attributes (带有 ARIA 属性的组件)

EOF

# Check for ARIA attributes
find web/components -name "*.tsx" -type f | while read file; do
  basename=$(basename "$file" .tsx)
  
  # Check for aria attributes
  aria_count=$(grep -o 'aria-[a-z]*' "$file" | wc -l)
  
  # Check for alt text on images
  alt_count=$(grep -o 'alt=' "$file" | wc -l)
  img_count=$(grep -o '<img' "$file" | wc -l)
  
  # Check for role attributes
  role_count=$(grep -o 'role=' "$file" | wc -l)
  
  if [ $aria_count -gt 0 ] || [ $alt_count -gt 0 ] || [ $role_count -gt 0 ]; then
    cat >> "$A11Y_FILE" << EOF

#### $basename

- ARIA attributes: $aria_count
- Images with alt: $alt_count / $img_count
- Role attributes: $role_count

EOF
  fi
done

echo -e "${GREEN}✓${NC} Accessibility report: $A11Y_FILE"

# 5. Generate design system summary
echo ""
echo -e "${BLUE}5. Generating Design System Summary...${NC}"

SUMMARY_FILE="$OUTPUT_DIR/design-system-summary.md"
cat > "$SUMMARY_FILE" << 'EOF'
# Design System Summary (设计系统摘要)

Generated: $(date)

## Overview (概览)

This document provides a summary of the design system used in Real Deal.

## Metrics (指标)

EOF

# Count components
component_count=$(find web/components -name "*.tsx" -type f | wc -l)
echo "**Total Components:** $component_count" >> "$SUMMARY_FILE"

# Count design token usage
token_usage=$(find web -name "*.tsx" -o -name "*.css" | xargs grep -o "var(--" | wc -l)
echo "**Design Token Usage:** $token_usage occurrences" >> "$SUMMARY_FILE"

# Count responsive breakpoints
responsive_count=$(find web -name "*.tsx" | xargs grep -oE "(md:|lg:|xl:|sm:)" | wc -l)
echo "**Responsive Classes:** $responsive_count occurrences" >> "$SUMMARY_FILE"

echo "" >> "$SUMMARY_FILE"
echo "## Design Principles (设计原则)" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "1. **Clarity First** - Clear information hierarchy" >> "$SUMMARY_FILE"
echo "2. **Efficiency** - Fast and efficient interactions" >> "$SUMMARY_FILE"
echo "3. **Consistency** - Unified design language" >> "$SUMMARY_FILE"
echo "4. **Accessibility** - Inclusive design" >> "$SUMMARY_FILE"
echo "5. **Feedback** - Clear user feedback" >> "$SUMMARY_FILE"

echo "" >> "$SUMMARY_FILE"
echo "## Resources (资源)" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "- [Design Tokens](.skills/product-design-skill/references/design-tokens.md)" >> "$SUMMARY_FILE"
echo "- [Component Patterns](.skills/product-design-skill/references/component-patterns.md)" >> "$SUMMARY_FILE"
echo "- [Main SKILL.md](.skills/product-design-skill/SKILL.md)" >> "$SUMMARY_FILE"

echo -e "${GREEN}✓${NC} Design system summary: $SUMMARY_FILE"

# Final summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Design Documentation Generated!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Generated files:"
echo "  📄 $COMPONENTS_FILE"
echo "  🎨 $TOKENS_FILE"
echo "  📏 $SPACING_FILE"
echo "  ♿ $A11Y_FILE"
echo "  📋 $SUMMARY_FILE"
echo ""
echo "View documentation: $OUTPUT_DIR"
echo ""
