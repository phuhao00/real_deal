import { api } from '../lib/api'
import FeedLayout from '../../components/FeedLayout'
import FeedRow from '../../components/FeedRow'
import FacetFilter from '../../components/FacetFilter'

export default async function ProductsPage({ searchParams }: { searchParams?: { q?: string, type?: string } }){
  const [items, data] = await Promise.all([
    api<any[]>('/api/products'),
    api<{products:any[];companies:any[]}>('/api/explore')
  ])
  const q = (searchParams?.q||'').toLowerCase()
  const type = searchParams?.type || ''
  const tagSet = Array.from(new Set(items.flatMap(p=> Array.isArray(p.tags)? p.tags : [])))
  const filters = tagSet.map(t=> ({ label: t, value: `tag:${t}` }))
  const byTag = (p:any)=> type.startsWith('tag:') ? (Array.isArray(p.tags) && p.tags.includes(type.slice(4))) : true
  const filtered = items.filter(p=> byTag(p) && (
    q ? ((p.name||'').toLowerCase().includes(q) || (p.summary||'').toLowerCase().includes(q) || (Array.isArray(p.tags)?p.tags.join(',').toLowerCase().includes(q):false)) : true
  ))
  return (
    <FeedLayout trending={items} news={data.companies} title="产品">
      <FacetFilter facets={[{ key:'tags', label:'标签', options: tagSet }]} />
      <div className="divide-y divide-[color:var(--border)]">
        {filtered.map(p=> (
          <FeedRow key={p.id} title={p.name} subtitle={p.summary} tags={p.tags} />
        ))}
      </div>
    </FeedLayout>
  )
}