#!/bin/bash

# Design Assets Export Script
# 导出设计资源

set -e

echo "🎨 Exporting Design Assets..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

OUTPUT_DIR=".skills/product-design-skill/assets/exports"
mkdir -p "$OUTPUT_DIR"

# 1. Export design tokens as JSON
echo ""
echo -e "${BLUE}1. Exporting Design Tokens (JSON)...${NC}"

TOKENS_JSON="$OUTPUT_DIR/design-tokens.json"

cat > "$TOKENS_JSON" << 'EOF'
{
  "colors": {
    "primary": "#0077FF",
    "primaryHover": "#0066DD",
    "primaryActive": "#0055BB",
    "primaryLight": "rgba(0, 119, 255, 0.1)",
    "success": "#4ADE80",
    "successBg": "rgba(74, 222, 128, 0.1)",
    "warning": "#FBBF24",
    "warningBg": "rgba(251, 191, 36, 0.1)",
    "error": "#F87171",
    "errorBg": "rgba(248, 113, 113, 0.1)",
    "bg": "#FFFFFF",
    "bgSubtle": "#F8FAFC",
    "fg": "#0F172A",
    "fgSecondary": "#475569",
    "fgTertiary": "#94A3B8",
    "fgMuted": "#CBD5E1",
    "border": "#E2E8F0"
  },
  "typography": {
    "fontFamily": {
      "sans": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
      "mono": "ui-monospace, SFMono-Regular, \"SF Mono\", Menlo, Consolas, monospace"
    },
    "fontSize": {
      "xs": "12px",
      "sm": "14px",
      "base": "15px",
      "md": "16px",
      "lg": "18px",
      "xl": "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px"
    },
    "fontWeight": {
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "lineHeight": {
      "tight": 1.25,
      "normal": 1.5,
      "relaxed": 1.75
    }
  },
  "spacing": {
    "0": "0",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px"
  },
  "borderRadius": {
    "none": "0",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "2xl": "24px",
    "full": "9999px"
  },
  "shadows": {
    "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
  },
  "breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px"
  },
  "components": {
    "button": {
      "height": {
        "sm": "32px",
        "md": "40px",
        "lg": "48px"
      },
      "paddingX": {
        "sm": "12px",
        "md": "16px",
        "lg": "20px"
      }
    },
    "input": {
      "height": {
        "sm": "32px",
        "md": "40px",
        "lg": "48px"
      },
      "paddingX": {
        "sm": "8px",
        "md": "12px",
        "lg": "16px"
      }
    },
    "avatar": {
      "xs": "24px",
      "sm": "32px",
      "md": "40px",
      "lg": "48px",
      "xl": "64px"
    }
  },
  "transitions": {
    "fast": "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    "base": "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    "slow": "300ms cubic-bezier(0.4, 0, 0.2, 1)"
  },
  "zIndex": {
    "dropdown": 1000,
    "sticky": 1020,
    "fixed": 1030,
    "modalBackdrop": 1040,
    "modal": 1050,
    "popover": 1060,
    "tooltip": 1070
  }
}
EOF

echo -e "${GREEN}✓${NC} Design tokens: $TOKENS_JSON"

# 2. Export Tailwind config reference
echo ""
echo -e "${BLUE}2. Exporting Tailwind Config Reference...${NC}"

TAILWIND_REF="$OUTPUT_DIR/tailwind-reference.md"

if [ -f "web/tailwind.config.js" ]; then
  cat > "$TAILWIND_REF" << 'EOF'
# Tailwind Configuration Reference (Tailwind 配置参考)

Generated: $(date)

## Current Configuration (当前配置)

EOF

  cat web/tailwind.config.js >> "$TAILWIND_REF"

  echo -e "${GREEN}✓${NC} Tailwind reference: $TAILWIND_REF"
else
  echo -e "${YELLOW}⚠${NC} Tailwind config not found at web/tailwind.config.js"
fi

# 3. Export CSS variables reference
echo ""
echo -e "${BLUE}3. Exporting CSS Variables Reference...${NC}"

CSS_VARS_REF="$OUTPUT_DIR/css-variables.md"

if [ -f "web/app/globals.css" ]; then
  cat > "$CSS_VARS_REF" << 'EOF'
# CSS Variables Reference (CSS 变量参考)

Generated: $(date)

## Root Variables (根变量)

EOF

  grep -A 200 ":root {" web/app/globals.css | grep -B 200 "}" | head -200 >> "$CSS_VARS_REF"

  echo -e "${GREEN}✓${NC} CSS variables reference: $CSS_VARS_REF"
else
  echo -e "${YELLOW}⚠${NC} globals.css not found at web/app/globals.css"
fi

# 4. Create component usage guide
echo ""
echo -e "${BLUE}4. Creating Component Usage Guide...${NC}"

USAGE_GUIDE="$OUTPUT_DIR/component-usage-guide.md"

cat > "$USAGE_GUIDE" << 'EOF'
# Component Usage Guide (组件使用指南)

Generated: $(date)

## Quick Reference (快速参考)

### Buttons (按钮)

#### Primary Button
```tsx
<button className="btn btn-primary">
  Primary Action
</button>
```

#### Secondary Button
```tsx
<button className="btn btn-secondary">
  Secondary Action
</button>
```

#### Ghost Button
```tsx
<button className="btn btn-ghost">
  Ghost Action
</button>
```

### Cards (卡片)

#### Basic Card
```tsx
<div className="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

#### Interactive Card
```tsx
<button className="card-interactive">
  <div className="card-icon">🚀</div>
  <h3>Feature Name</h3>
  <p>Description</p>
</button>
```

### Avatar (头像)

```tsx
<div className="avatar avatar-md">
  <img src="/avatar.jpg" alt="User" />
</div>
```

### Badge (徽章)

```tsx
<span className="badge badge-primary">
  Badge Text
</span>
```

### Input (输入框)

```tsx
<div className="form-group">
  <label>Email Address</label>
  <input type="email" className="form-input" />
</div>
```

## Utility Classes (工具类)

### Spacing (间距)
- `p-4` - Padding 16px
- `px-4` - Horizontal padding 16px
- `py-2` - Vertical padding 8px
- `m-4` - Margin 16px
- `gap-4` - Gap 16px

### Typography (排版)
- `text-sm` - Font size 14px
- `text-base` - Font size 15px
- `font-medium` - Font weight 500
- `font-semibold` - Font weight 600

### Colors (色彩)
- `bg-white` - White background
- `text-primary` - Primary color text
- `border-neutral-200` - Neutral border

### Borders (边框)
- `border` - 1px border
- `border-2` - 2px border
- `rounded-lg` - 12px border radius
- `rounded-full` - Full border radius

### Display & Layout (显示与布局)
- `flex` - Flexbox
- `flex-col` - Flex column
- `items-center` - Align items center
- `justify-between` - Justify content space between
- `grid` - Grid layout
- `grid-cols-2` - 2 columns

### Interactive States (交互状态)
- `hover:bg-blue-100` - Hover background
- `focus:outline-none` - Remove focus outline
- `active:scale-95` - Active scale
- `disabled:opacity-50` - Disabled opacity

## Responsive Design (响应式设计)

### Breakpoints (断点)
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

### Examples (示例)
```tsx
<div className="p-4 md:p-8 lg:p-12">
  Responsive padding
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

## Best Practices (最佳实践)

1. **Use Utility Classes**: Prefer Tailwind utility classes over custom CSS
2. **Semantic HTML**: Use proper HTML elements
3. **Accessibility**: Add ARIA attributes when needed
4. **Consistency**: Use design tokens (CSS variables)
5. **Performance**: Optimize images and animations

For detailed component patterns, see:
`component-patterns.md`
EOF

echo -e "${GREEN}✓${NC} Component usage guide: $USAGE_GUIDE"

# Final summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Design Assets Exported!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Exported files:"
echo "  🎨 $TOKENS_JSON"
echo "  📝 $TAILWIND_REF"
echo "  🎯 $CSS_VARS_REF"
echo "  📖 $USAGE_GUIDE"
echo ""
echo "View assets: $OUTPUT_DIR"
echo ""
