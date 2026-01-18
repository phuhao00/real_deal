import { api } from '../lib/api'
import FeedLayout from '../../components/FeedLayout'
import Composer from '../../components/Composer'
import ItemCard from '../../components/ItemCard'

export default async function ChatPage({ searchParams }: { searchParams?: { q?: string } }){
  const data = await api<{projects:any[];products:any[];jobs:any[];posts:any[];companies:any[]}>('/api/explore')
  const feed = (data.posts && Array.isArray(data.posts) && data.posts.length ? data.posts : [
    ...data.projects.map(p=>({ id:p.id, title:p.title, subtitle:p.summary, tags:p.tags })),
    ...data.products.map(p=>({ id:p.id, title:p.name, subtitle:p.summary, tags:p.tags })),
    ...data.jobs.map(j=>({ id:j.id, title:j.title, subtitle:`${j.location} · ${j.level} · ${j.salary}`, tags:j.skills }))
  ])
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
    <FeedLayout trending={data.products} news={data.companies} title="私信" filters={filters}>
      <Composer />
      <div className="grid gap-4">
        {filtered.map((f:any)=> (
          <ItemCard key={f.id} title={f.title} subtitle={f.subtitle} tags={f.tags} />
        ))}
      </div>
    </FeedLayout>
  )
}