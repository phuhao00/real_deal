# Frontend Components Reference

## Core Components

### Card
Simple card component for displaying content
```typescript
<Card title="Title" subtitle="Optional subtitle" />
```

### Composer
Post composer for creating new content
```typescript
<Composer />
```

### FacetFilter
Search and filter component with facets
```typescript
type Facet = { key: string; label: string; options: string[] }
<FacetFilter facets={[
  { key: 'type', label: '类型', options: ['项目', '产品', '职位'] },
  { key: 'location', label: '地点', options: ['上海', '北京', '深圳'] }
]} />
```

### FeedRow
Feed row item with title, subtitle, tags, and actions
```typescript
<FeedRow
  title="Project Title"
  subtitle="Summary info"
  tags={['React', 'TypeScript']}
  dense={false}
/>
```

### FeedLayout
Main feed layout with header and sidebars
```typescript
<FeedLayout
  trending={products}
  news={companies}
  title="动态"
>
  {/* Feed content */}
</FeedLayout>
```

## Layout Components

### Navbar
Navigation bar component
```typescript
<Navbar />
```

### SidebarNav
Left sidebar navigation
```typescript
<SidebarNav />
```

### CenterHeader
Center header section
```typescript
<CenterHeader />
```

### RightSidebar
Right sidebar with trending/news
```typescript
<RightSidebar />
```

## Page Patterns

### Explore Page (app/page.tsx)
Server component displaying mixed feed
```typescript
export default async function Page({ searchParams }: { searchParams?: { q?: string, type?: string } }) {
  const data = await api('/api/explore')
  // Filter and render feed
  return <FeedLayout>...</FeedLayout>
}
```

### Detail Page Pattern
Dynamic route with ID parameter
```typescript
export default async function CompanyPage({ params }: { params: { id: string } }) {
  const company = await api(`/api/companies/${params.id}`)
  return <div>{company.name}</div>
}
```

### Search/Filter Page
Client component with URL params
```typescript
"use client"
export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  // ... implementation
}
```

## Styling Patterns

### Panel Component
Container with border and padding
```css
.panel {
  @apply bg-white border rounded-2xl px-4 py-3 mb-4;
}
```

### Chip Component
Tag/badge style
```css
.chip {
  @apply px-3 py-1 rounded-full text-sm border;
}
.chip-active {
  @apply bg-blue-100 text-blue-700 border-blue-300;
}
```

### Primary Button
```css
.btn-primary {
  @apply px-3 py-1 rounded-full text-sm bg-blue-600 text-white hover:bg-blue-700;
}
```

### Interactive Actions
Feed row action buttons
```css
.interactive-actions {
  @apply text-neutral-500;
}
.interactive-action {
  @apply hover:text-blue-600 transition;
}
```

## CSS Variables (globals.css)

### Colors
```css
:root {
  --bg: 255 255 255;        /* Background */
  --fg: 0 0 0;             /* Foreground */
  --border: 240 240 240;   /* Border */
  --accent: 0 100 220;      /* Accent color */
}
```

### Usage
```typescript
<div className="bg-[rgb(var(--bg))] border-[color:var(--border)]">
  {/* Content */}
</div>
```

## Common Patterns

### Map and Render List
```typescript
{items.map(item => (
  <FeedRow
    key={item.id}
    title={item.title}
    subtitle={item.subtitle}
    tags={item.tags}
  />
))}
```

### Conditional Rendering
```typescript
{subtitle ? <div className="subtitle">{subtitle}</div> : null}
```

### Tag Display
```typescript
{tags?.length ? <div className="tag">{tags.join(', ')}</div> : null}
```

### Server Action Pattern
```typescript
export default async function ServerPage() {
  const data = await fetchData()
  return <ClientComponent data={data} />
}
```
