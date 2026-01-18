import { api } from '../lib/api'
import FeedLayout from '../../components/FeedLayout'
import FeedRow from '../../components/FeedRow'
import FacetFilter from '../../components/FacetFilter'

export default async function MediaPage({ searchParams }: { searchParams?: { q?: string, type?: string } }){
  const [items, data] = await Promise.all([
    api<any[]>('/api/media-assets'),
    api<{products:any[];companies:any[]}>('/api/explore')
  ])
  const q = (searchParams?.q||'').toLowerCase()
  const typeParam = searchParams?.type || ''
  const types = Array.from(new Set(items.map(m=> m.type).filter(Boolean)))
  const filters = types.map(t=> ({ label:t, value:`type:${t}` }))
  const byType = (m:any)=> typeParam.startsWith('type:') ? (m.type===typeParam.slice(5)) : true
  const filtered = items.filter(m=> byType(m) && (
    q ? ((m.title||'').toLowerCase().includes(q) || (m.type||'').toLowerCase().includes(q)) : true
  ))
  return (
    <FeedLayout trending={items} news={data.companies} title="媒体">
      <FacetFilter facets={[{ key:'type', label:'类型', options: types }]} />
      <div className="divide-y divide-[color:var(--border)]">
        {filtered.map(m=> (
          <FeedRow key={m.id} title={m.title} subtitle={m.type} />
        ))}
      </div>
    </FeedLayout>
  )
}