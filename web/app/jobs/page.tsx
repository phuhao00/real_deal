import { api } from '../lib/api'
import FeedLayout from '../../components/FeedLayout'
import FeedRow from '../../components/FeedRow'
import FacetFilter from '../../components/FacetFilter'

export default async function JobsPage({ searchParams }: { searchParams?: { q?: string, type?: string } }){
  const [items, data] = await Promise.all([
    api<any[]>('/api/jobs'),
    api<{products:any[];companies:any[]}>('/api/explore')
  ])
  const q = (searchParams?.q||'').toLowerCase()
  const type = searchParams?.type || ''
  const locs = Array.from(new Set(items.map(j=> j.location).filter(Boolean)))
  const lvls = Array.from(new Set(items.map(j=> j.level).filter(Boolean)))
  const filters = [
    ...locs.map(l=> ({ label:l, value:`loc:${l}` })),
    ...lvls.map(l=> ({ label:l, value:`lvl:${l}` })),
  ]
  const byType = (j:any)=> type.startsWith('loc:') ? (j.location===type.slice(4)) : (type.startsWith('lvl:') ? (j.level===type.slice(4)) : true)
  const filtered = items.filter(j=> byType(j) && (
    q ? ((j.title||'').toLowerCase().includes(q) || `${j.location||''} ${j.level||''} ${j.salary||''}`.toLowerCase().includes(q) || (Array.isArray(j.skills)?j.skills.join(',').toLowerCase().includes(q):false)) : true
  ))
  return (
    <FeedLayout trending={items} news={data.companies} title="职位">
      <FacetFilter facets={[
        { key:'loc', label:'城市', options: locs },
        { key:'lvl', label:'级别', options: lvls },
        { key:'skills', label:'技能', options: Array.from(new Set(items.flatMap(j=> Array.isArray(j.skills)? j.skills : []))) }
      ]} />
      <div className="divide-y divide-[color:var(--border)]">
        {filtered.map(j=> (
          <FeedRow key={j.id} title={j.title} subtitle={`${j.location} · ${j.level} · ${j.salary}`} tags={j.skills} />
        ))}
      </div>
    </FeedLayout>
  )
}