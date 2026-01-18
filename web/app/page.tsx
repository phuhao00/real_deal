import { api } from './lib/api'
import FeedLayout from '../components/FeedLayout'
import Composer from '../components/Composer'
import FeedRow from '../components/FeedRow'

export default async function Page({ searchParams }: { searchParams?: { q?: string, type?: string, density?: string } }) {
  const data = await api<{projects:any[];products:any[];posts:any[];jobs:any[];companies:any[]}>('/api/explore')
  const feed = [
    ...data.projects.map(p=>({ id:p.id, title:p.title, subtitle:p.summary, tags:p.tags })),
    ...data.products.map(p=>({ id:p.id, title:p.name, subtitle:p.summary, tags:p.tags })),
    ...data.jobs.map(j=>({ id:j.id, title:j.title, subtitle:`${j.location} · ${j.level} · ${j.salary}`, tags:j.skills }))
  ]
  const q = (searchParams?.q||'').toLowerCase()
  const type = (searchParams?.type||'').toLowerCase()
  const density = (searchParams?.density||'comfy')
  const byType = (f:any)=> type==='projects'? Array.isArray(f.tags) && !f.subtitle?.includes('·') : type==='products'? Array.isArray(f.tags) && !f.subtitle?.includes('·') : type==='jobs'? f.subtitle?.includes('·') : true
  const filtered = feed.filter(f=> byType(f) && (q ? ((f.title||'').toLowerCase().includes(q) || (f.subtitle||'').toLowerCase().includes(q) || (Array.isArray(f.tags)?f.tags.join(',').toLowerCase().includes(q):false)) : true))
  return (
    <FeedLayout trending={data.products} news={data.companies} title="动态">
      <Composer />
      <div className="divide-y divide-[color:var(--border)]">
        {filtered.map((f:any)=> (
          <FeedRow key={f.id} title={f.title} subtitle={f.subtitle} tags={f.tags} dense={density==='compact'} />
        ))}
      </div>
    </FeedLayout>
  )
}