import { api } from '../lib/api'
import FeedLayout from '../../components/FeedLayout'
import FeedRow from '../../components/FeedRow'
import FacetFilter from '../../components/FacetFilter'

export default async function InvestorsPage({ searchParams }: { searchParams?: { q?: string, type?: string } }){
  const [items, data] = await Promise.all([
    api<any[]>('/api/investors'),
    api<{products:any[];companies:any[]}>('/api/explore')
  ])
  const q = (searchParams?.q||'').toLowerCase()
  const type = searchParams?.type || ''
  const stages = Array.from(new Set(items.flatMap(i=> Array.isArray(i.stages)? i.stages : [])))
  const regions = Array.from(new Set(items.flatMap(i=> Array.isArray(i.regions)? i.regions : [])))
  const filters = [
    ...stages.map(s=> ({ label:s, value:`stage:${s}` })),
    ...regions.map(r=> ({ label:r, value:`region:${r}` })),
  ]
  const byType = (i:any)=> type.startsWith('stage:') ? (Array.isArray(i.stages) && i.stages.includes(type.slice(6))) : (type.startsWith('region:') ? (Array.isArray(i.regions) && i.regions.includes(type.slice(7))) : true)
  const filtered = items.filter(i=> byType(i) && (
    q ? ((i.name||'').toLowerCase().includes(q) || (i.thesis||'').toLowerCase().includes(q) || (Array.isArray(i.stages)?i.stages.join(',').toLowerCase().includes(q):false)) : true
  ))
  return (
    <FeedLayout trending={items} news={data.companies} title="投资人">
      <FacetFilter facets={[
        { key:'stage', label:'轮次', options: stages },
        { key:'region', label:'区域', options: regions }
      ]} />
      <div className="divide-y divide-[color:var(--border)]">
        {filtered.map(i=> (
          <FeedRow key={i.id} title={i.name} subtitle={i.thesis} tags={Array.isArray(i.stages)?i.stages:undefined} />
        ))}
      </div>
    </FeedLayout>
  )
}