"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Tab = { href: string; label: string }
type Filter = { label: string; value: string }

export default function CenterHeader({ title, tabs, filters }: { title: string, tabs?: Tab[], filters?: Filter[] }){
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()
  const q = params.get('q') || ''
  const type = params.get('type') || (filters && filters[0]?.value) || ''
  const setQuery = (nextQ: string)=>{
    const usp = new URLSearchParams(params.toString())
    if(nextQ) usp.set('q', nextQ); else usp.delete('q')
    router.push(`${pathname}?${usp.toString()}`)
  }
  const setType = (v: string)=>{
    const usp = new URLSearchParams(params.toString())
    if(v) usp.set('type', v); else usp.delete('type')
    router.push(`${pathname}?${usp.toString()}`)
  }
  return (
    <div className="sticky top-0 z-30 bg-[color:var(--panel)]/85 backdrop-blur border-b border-[color:var(--border)]">
      <div className="px-4 py-2">
        <div className="text-[22px] font-bold">{title}</div>
        {filters ? (
          <div className="mt-2 flex items-center gap-2">
            <input defaultValue={q} onKeyDown={(e:any)=>{ if(e.key==='Enter') setQuery(e.target.value) }} placeholder="搜索 / 筛选" className="flex-1 bg-transparent outline-none text-[14px] border border-[color:var(--border)] rounded-full px-3 py-2" />
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map(f=> (
                <button key={f.value} onClick={()=>setType(f.value)} className={`chip whitespace-nowrap text-[12px] ${type===f.value? 'chip-active font-semibold':''}`}>{f.label}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-2 flex items-center gap-6">
            {(tabs||[]).map(t=> (
              <a key={t.href} href={t.href} className={`text-[14px] whitespace-nowrap px-1 py-1 ${pathname===t.href? 'link-active font-semibold':'text-neutral-600 hover:text-neutral-800'}`}>{t.label}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}