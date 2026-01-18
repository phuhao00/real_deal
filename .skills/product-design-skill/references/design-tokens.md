# Design Tokens (设计令牌)

## Core Tokens (核心令牌)

### Colors (色彩)

#### Primary (主色)
```css
--color-primary: #0077FF;
--color-primary-hover: #0066DD;
--color-primary-active: #0055BB;
--color-primary-light: rgba(0, 119, 255, 0.1);
```

#### Semantic Colors (语义色)
```css
--color-success: #4ADE80;
--color-success-bg: rgba(74, 222, 128, 0.1);

--color-warning: #FBBF24;
--color-warning-bg: rgba(251, 191, 36, 0.1);

--color-error: #F87171;
--color-error-bg: rgba(248, 113, 113, 0.1);

--color-info: #60A5FA;
--color-info-bg: rgba(96, 165, 250, 0.1);
```

#### Neutral Colors (中性色)
```css
--color-bg: #FFFFFF;
--color-bg-subtle: #F8FAFC;
--color-bg-elevated: #FFFFFF;

--color-fg: #0F172A;
--color-fg-secondary: #475569;
--color-fg-tertiary: #94A3B8;
--color-fg-muted: #CBD5E1;

--color-border: #E2E8F0;
--color-border-subtle: #F1F5F9;
```

### Typography (排版)

#### Font Families (字体系列)
```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

#### Font Sizes (字号)
```css
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 15px;
--font-size-md: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 30px;
--font-size-4xl: 36px;
```

#### Font Weights (字重)
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### Line Heights (行高)
```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

#### Letter Spacing (字间距)
```css
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
```

### Spacing (间距)

```css
--space-0: 0;
--space-px: 1px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Border Radius (圆角)

```css
--radius-none: 0;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-3xl: 32px;
--radius-full: 9999px;
```

### Shadows (阴影)

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Transitions (过渡)

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Z-Index (层级)

```css
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

## Component Tokens (组件令牌)

### Avatar (头像)
```css
--avatar-xs: 24px;
--avatar-sm: 32px;
--avatar-md: 40px;
--avatar-lg: 48px;
--avatar-xl: 64px;
--avatar-2xl: 96px;
```

### Badge (徽章)
```css
--badge-font-size: 11px;
--badge-height: 18px;
--badge-padding-x: 6px;
--badge-radius: var(--radius-full);
```

### Button (按钮)
```css
--button-height-sm: 32px;
--button-height-md: 40px;
--button-height-lg: 48px;

--button-padding-x-sm: 12px;
--button-padding-x-md: 16px;
--button-padding-x-lg: 20px;
```

### Input (输入框)
```css
--input-height-sm: 32px;
--input-height-md: 40px;
--input-height-lg: 48px;

--input-padding-x-sm: 8px;
--input-padding-x-md: 12px;
--input-padding-x-lg: 16px;
```

### Card (卡片)
```css
--card-padding: var(--space-6);
--card-radius: var(--radius-lg);
--card-shadow: var(--shadow-sm);
```

## Usage (使用)

### CSS Custom Properties
```css
:root {
  /* Colors */
  --color-primary: #0077FF;
  
  /* Typography */
  --font-size-base: 15px;
  
  /* Spacing */
  --space-4: 16px;
  
  /* Etc... */
}
```

### JavaScript Access
```typescript
const styles = getComputedStyle(document.documentElement);
const primaryColor = styles.getPropertyValue('--color-primary').trim();
```

### Theme Variants (主题变体)

#### Light Theme (浅色主题)
```css
[data-theme="light"] {
  --color-bg: #FFFFFF;
  --color-fg: #0F172A;
}
```

#### Dark Theme (深色主题)
```css
[data-theme="dark"] {
  --color-bg: #0F172A;
  --color-fg: #FFFFFF;
}
```
