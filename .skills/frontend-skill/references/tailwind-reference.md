# Tailwind Configuration Reference

## Config File (tailwind.config.js)

```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          400: '#9ca3af',
          600: '#4b5563',
          800: '#1f2937'
        },
        blue: {
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    }
  },
  plugins: []
}
```

## Common Utility Classes

### Layout
```css
.p-4           /* padding: 1rem */
.px-4          /* horizontal padding */
.py-3          /* vertical padding */
.mb-4          /* margin-bottom */
.mx-auto       /* horizontal center */
.flex          /* display: flex */
.flex-1        /* flex: 1 */
.items-center  /* align-items: center */
.gap-2         /* gap between items */
.grid          /* display: grid */
.grid-cols-2   /* 2 columns */
```

### Typography
```css
.font-medium   /* font-weight: 500 */
.font-semibold /* font-weight: 600 */
.text-sm       /* font-size: 0.875rem */
.text-[14px]   /* custom font size */
.text-neutral-400  /* text color */
```

### Borders & Spacing
```css
.border        /* border: 1px */
.rounded       /* border-radius: 0.25rem */
.rounded-2xl   /* border-radius: 1rem */
.divide-y      /* border-bottom on children */
.divide-[color:var(--border)]  /* custom color */
```

### Interactive
```css
.hover:bg-blue-600      /* background on hover */
.transition             /* transition properties */
.outline-none           /* remove outline */
```

### Custom Classes from globals.css

```css
.panel {
  @apply bg-white border rounded-2xl px-4 py-3 mb-4;
}

.chip {
  @apply px-3 py-1 rounded-full text-sm border;
}

.chip-active {
  @apply bg-blue-100 text-blue-700 border-blue-300 font-semibold;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded-full text-sm;
}

.tag {
  @apply text-[12px] text-neutral-500;
}

.interactive-action {
  @apply hover:text-blue-600 transition;
}
```

## Responsive Design

```css
.grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

## Custom Values

```css
.text-[15px]           /* custom font size */
.h-[60px]              /* custom height */
.min-w-[120px]         /* custom min-width */
```

## Dark Mode (if enabled)

```css
.dark:bg-gray-900
.dark:text-white
```
