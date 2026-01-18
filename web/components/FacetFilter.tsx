"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

type Facet = { key: string; label: string; options: string[] }

export default function FacetFilter({ facets }: { facets: Facet[] }){
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const q = params.get('q') || ''

  const setParam = (key: string, values: string[]) => {
    const usp = new URLSearchParams(params.toString())
    if (values.length) usp.set(key, values.join(',')); else usp.delete(key)
    router.push(`${pathname}?${usp.toString()}`)
  }
  const toggle = (key: string, value: string) => {
    const cur = (params.get(key) || '').split(',').filter(Boolean)
    const next = cur.includes(value) ? cur.filter(v=>v!==value) : [...cur, value]
    setParam(key, next)
  }
  const clearAll = () => {
    const usp = new URLSearchParams(params.toString())
    usp.delete('q')
    facets.forEach(f=> usp.delete(f.key))
    router.push(`${pathname}?${usp.toString()}`)
  }
  const setQuery = (nextQ: string) => {
    const usp = new URLSearchParams(params.toString())
    if (nextQ) usp.set('q', nextQ); else usp.delete('q')
    router.push(`${pathname}?${usp.toString()}`)
  }

  const selected: { key: string; value: string }[] = []
  facets.forEach(f=>{
    const cur = (params.get(f.key) || '').split(',').filter(Boolean)
    cur.forEach(v=> selected.push({ key: f.key, value: v }))
  })

  return (
    <div className="panel border rounded-2xl p-4 mb-4">
      <div className="flex items-center gap-3">
        <input defaultValue={q} onKeyDown={(e:any)=>{ if(e.key==='Enter') setQuery(e.target.value) }} placeholder="搜索 / 筛选" className="flex-1 bg-transparent outline-none text-[14px] border border-[color:var(--border)] rounded-full px-3 py-2" />
        <button onClick={clearAll} className="chip">清空</button>
      </div>
      {selected.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {selected.map(s=> (
            <button key={`${s.key}:${s.value}`} onClick={()=> toggle(s.key, s.value)} className="chip chip-active">
              {s.value}
            </button>
          ))}
        </div>
      ) : null}
      <div className="mt-4 grid gap-3">
        {facets.map(f=>{
          const cur = (params.get(f.key) || '').split(',').filter(Boolean)
          const limited = f.options.slice(0, 10)
          const rest = f.options.slice(10)
          return (
            <div key={f.key} className="grid grid-cols-[120px_1fr] items-start gap-2">
              <div className="text-[14px] font-medium px-1 py-1">{f.label}</div>
              <div className="flex flex-wrap items-center gap-2">
                {limited.map(opt=> (
                  <button key={opt} onClick={()=>toggle(f.key, opt)} className={`chip ${cur.includes(opt)?'chip-active font-semibold':''}`}>{opt}</button>
                ))}
                {rest.length ? (
                  <details>
                    <summary className="chip">更多</summary>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {rest.map(opt=> (
                        <button key={opt} onClick={()=>toggle(f.key, opt)} className={`chip ${cur.includes(opt)?'chip-active font-semibold':''}`}>{opt}</button>
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}