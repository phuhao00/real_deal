import { api } from '../lib/api'
import FeedLayout from '../../components/FeedLayout'
import Composer from '../../components/Composer'
import ItemCard from '../../components/ItemCard'

export default async function ProfilePage({ searchParams }: { searchParams?: { q?: string } }){
  const [me, projects, data] = await Promise.all([
    api<any>('/api/me').catch(()=>null),
    api<any[]>('/api/projects'),
    api<{products:any[];companies:any[]}>('/api/explore')
  ])
  const header = me ? (
    <div className="panel border rounded p-4 mb-4">
      <div className="text-lg font-semibold">{me.name || me.email}</div>
      <div className="text-sm text-neutral-600 mt-1">{me.role}</div>
    </div>
  ) : null
  const feed = [
    ...projects.map(p=>({ id:p.id, title:p.title, subtitle:p.summary, tags:p.tags })),
    ...data.products.map(p=>({ id:p.id, title:p.name, subtitle:p.summary, tags:p.tags })),
  ]
  const q = (searchParams?.q||'').toLowerCase()
  const filtered = q ? feed.filter(f=> (f.title||'').toLowerCase().includes(q) || (f.subtitle||'').toLowerCase().includes(q) || (Array.isArray(f.tags)?f.tags.join(',').toLowerCase().includes(q):false)) : feed
  const filters = [
    { label: '推荐', value: 'timeline' },
    { label: '作品', value: 'projects' },
    { label: '产品', value: 'products' },
    { label: '职位', value: 'jobs' },
    { label: '公司', value: 'companies' },
    { label: '媒体', value: 'media' },
  ]
  return (
    <FeedLayout trending={data.products} news={data.companies} title="个人资料" filters={filters}>
      {header}
      <Composer />
      <div className="grid gap-4">
        {filtered.map((f:any)=> (
          <ItemCard key={f.id} title={f.title} subtitle={f.subtitle} tags={f.tags} />
        ))}
      </div>
    </FeedLayout>
  )
}