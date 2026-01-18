"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function RightSidebar({ trending, news }: { trending: any[], news: any[] }){
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()
  const setParam = (key:string, val:string)=>{
    const usp = new URLSearchParams(params.toString())
    if(val) usp.set(key, val); else usp.delete(key)
    router.push(`${pathname}?${usp.toString()}`)
  }
  const is = (p:string)=> pathname.startsWith(p)

  const section1Title = is('/jobs') ? '岗位速报' : is('/projects') ? '合作公司' : is('/products') ? '推荐产品' : is('/investors') ? '你可能感兴趣' : is('/media') ? '媒体精选' : '今日资讯'

  const section2Title = is('/jobs') ? '热门技能' : is('/projects') || is('/products') ? '热门标签' : is('/investors') ? '热门轮次/区域' : is('/media') ? '类型统计' : '热门趋势'

  const topTags = (items:any[], field:string)=>{
    const map: Record<string, number> = {}
    const list = Array.isArray(items) ? items : []
    for(const it of list){
      const arr = Array.isArray(it[field])
        ? it[field]
        : (typeof it[field] === 'string' ? String(it[field]).split(',').map((s:string)=>s.trim()).filter(Boolean) : [])
      for(const v of arr){ map[v] = (map[v]||0)+1 }
    }
    return Object.entries(map).sort((a,b)=> b[1]-a[1]).slice(0,5).map(([k,c])=> ({ id:k, title:k, summary:`${c} 项` }))
  }
  const topSkills = (items:any[])=> topTags(items,'skills')
  const topProjectTags = (items:any[])=> topTags(items,'tags')
  const topProductTags = (items:any[])=> topTags(items,'tags')
  const typeStats = (items:any[])=>{
    const map: Record<string, number> = {}
    items.forEach(it=>{ const t = it.type || '未知'; map[t] = (map[t]||0)+1 })
    return Object.entries(map).sort((a,b)=> b[1]-a[1]).slice(0,5).map(([k,c])=> ({ id:k, title:k, summary:`${c} 项` }))
  }
  const stageRegionStats = (items:any[])=>{
    const st: Record<string, number> = {}; const rg: Record<string, number> = {}
    const list = Array.isArray(items) ? items : []
    for(const it of list){
      const stages = Array.isArray(it.stages)
        ? it.stages
        : (typeof it.stages === 'string' ? it.stages.split(',').map((s:string)=>s.trim()).filter(Boolean) : [])
      const regions = Array.isArray(it.regions)
        ? it.regions
        : (typeof it.regions === 'string' ? it.regions.split(',').map((s:string)=>s.trim()).filter(Boolean) : [])
      for(const s of stages){ st[s]=(st[s]||0)+1 }
      for(const r of regions){ rg[r]=(rg[r]||0)+1 }
    }
    const topStages = Object.entries(st).sort((a,b)=> b[1]-a[1]).slice(0,3).map(([k,c])=> ({ id:`stage:${k}`, title:k, summary:`${c} 位投资人` }))
    const topRegions = Object.entries(rg).sort((a,b)=> b[1]-a[1]).slice(0,2).map(([k,c])=> ({ id:`region:${k}`, title:k, summary:`${c} 位投资人` }))
    return [...topStages, ...topRegions]
  }

  const section2Data = is('/jobs') ? topSkills(trending) : is('/projects') ? topProjectTags(trending) : is('/products') ? topProductTags(trending) : is('/investors') ? stageRegionStats(trending) : is('/media') ? typeStats(trending) : trending.slice(0,5).map((t:any)=>({ id:t.id, title:t.title || t.name, summary:t.summary || t.description }))

  const section1Data = is('/projects') ? news.slice(0,5).map((n:any)=> ({ id:n.id, title:n.name, summary:n.description }))
                      : is('/products') ? trending.slice(0,5).map((p:any)=> ({ id:p.id, title:p.name, summary:p.summary }))
                      : is('/jobs') ? trending.slice(0,5).map((j:any)=> ({ id:j.id, title:j.title, summary:`${j.location} · ${j.level}` }))
                      : is('/investors') ? trending.slice(0,5).map((i:any)=> ({ id:i.id, title:i.name, summary:i.thesis }))
                      : is('/media') ? trending.slice(0,5).map((m:any)=> ({ id:m.id, title:m.title, summary:m.type }))
                      : news.slice(0,5).map((n:any)=> ({ id:n.id, title:n.title || n.name || n.post || n.company, summary:n.summary || n.description }))

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[350px] gap-4 sticky top-0 h-screen overflow-y-hidden pr-1">
      {pathname==='/' && (
        <div className="panel border rounded-2xl p-4">
          <div className="text-[16px] font-semibold">交互</div>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="text-[12px] text-neutral-500">密度</span>
            {['comfy','compact'].map(d=> (
              <button key={d} onClick={()=> setParam('density', d)} className={`chip text-[12px] ${params.get('density')===d?'chip-active':''}`}>{d==='comfy'?'舒适':'紧凑'}</button>
            ))}
            <span className="ml-3 text-[12px] text-neutral-500">类型</span>
            {['all','projects','products','jobs'].map(t=> (
              <button key={t} onClick={()=> setParam('type', t==='all'?'':t)} className={`chip text-[12px] ${params.get('type')===t?'chip-active':''}`}>{t==='all'?'全部': t==='projects'?'作品': t==='products'?'产品':'职位'}</button>
            ))}
          </div>
        </div>
      )}
      <div className="panel border rounded-2xl px-3 py-2">
        <input className="w-full bg-transparent outline-none text-sm" placeholder="搜索" />
      </div>
      <div className="panel border rounded-2xl p-4">
        <div className="font-medium">订阅</div>
        <div className="text-sm text-neutral-500 mt-1">解锁更多功能与权益</div>
        <a href="/subscribe" className="btn-primary mt-3 inline-block px-3 py-1 rounded-full text-sm">立即订阅</a>
      </div>
      <div className="panel border rounded-2xl p-4">
        <div className="text-[16px] font-semibold">{section1Title}</div>
        <div className="mt-2 flex flex-col gap-2">
          {section1Data.map((n:any)=> (
            <div key={n.id} className="text-sm">
              <div className="font-medium">{n.title}</div>
              <div className="text-xs text-neutral-500">{n.summary}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="panel border rounded-2xl p-4">
        <div className="text-[16px] font-semibold">{section2Title}</div>
        <div className="mt-2 flex flex-col gap-2">
          {section2Data.map((t:any)=> (
            <div key={t.id} className="text-sm">
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-neutral-500">{t.summary}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}