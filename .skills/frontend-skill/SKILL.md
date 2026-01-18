---
name: frontend-skill
description: Frontend development for real_deal platform using Next.js 14.2, React 18.2, TypeScript, and Tailwind CSS. Use when working on web UI development, creating React components, building pages, integrating with backend APIs, or styling with Tailwind.
---

# Frontend Development (Next.js)

## Tech Stack

- **Framework**: Next.js 14.2.4 (App Router)
- **UI Library**: React 18.2.0
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.3

## Project Structure

```
web/
  app/                     # Next.js App Router pages
  components/              # React components
  package.json
  tsconfig.json
  tailwind.config.js
  next.config.js
```

## Key Patterns

### Component Structure

```typescript
// components/Example.tsx
export default function Example({ data }: Props) {
  return (
    <div className="p-4 bg-white rounded-lg">
      {/* Component content */}
    </div>
  )
}
```

### API Integration

```typescript
// Fetch from backend at localhost:8080
async function fetchFromAPI(endpoint: string) {
  const res = await fetch(`http://localhost:8080/api${endpoint}`)
  if (!res.ok) throw new Error('API error')
  return res.json()
}
```

### Styling with Tailwind

```tsx
<div className="max-w-4xl mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-gray-900">
    {/* Title */}
  </h1>
</div>
```

## Available Backend APIs

- `/api/explore` - Explore content
- `/api/projects` - List projects
- `/api/jobs` - List jobs
- `/api/companies/:id` - Get company
- `/api/products` - List products
- `/api/posts` - List posts
- `/api/investors` - List investors
- `/api/pitch/:id` - Get pitch page
- `/api/deal-room/:id` - Get deal room
- `/api/media/:id` - Get media
- `/api/login` - Authentication
- `/api/me` - Current user

## Development Commands

```bash
cd web
npm run dev      # Start dev server on :3000
npm run build    # Build for production
npm start        # Start production server
```

## Common Tasks

- Create new page → Add file in `web/app/`
- Create component → Add file in `web/components/`
- Fetch data → Use Next.js `fetch()` or React hooks
- Style → Use Tailwind utility classes
