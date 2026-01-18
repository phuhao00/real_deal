"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Tab = { href: string; label: string }
type Filter = { label: string; value: string }

export default function CenterHeader({ title, tabs, filters }: { title: string, tabs?: Tab[], filters?: Filter[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()
  const [isScrolled, setIsScrolled] = useState(false)

  const q = params.get('q') || ''
  const type = params.get('type') || (filters && filters[0]?.value) || ''

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const setQuery = (nextQ: string) => {
    const usp = new URLSearchParams(params.toString())
    if (nextQ) usp.set('q', nextQ); else usp.delete('q')
    router.push(`${pathname}?${usp.toString()}`)
  }

  const setType = (v: string) => {
    const usp = new URLSearchParams(params.toString())
    if (v) usp.set('type', v); else usp.delete('type')
    router.push(`${pathname}?${usp.toString()}`)
  }

  return (
    <div className={`sticky top-0 z-30 transition-all duration-200 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200'
        : 'bg-white/85 backdrop-blur border-b border-gray-200'
    }`}>
      <div className="px-4 py-3">
        <div className="text-[22px] font-bold tracking-tight">{title}</div>

        {filters ? (
          <div className="mt-3 space-y-2">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                defaultValue={q}
                onKeyDown={(e) => { if (e.key === 'Enter') setQuery((e.target as HTMLInputElement).value) }}
                placeholder="搜索动态、项目、产品或职位"
                className="w-full bg-gray-50 text-[14px] border border-gray-200 rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setType(f.value)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                    type === f.value
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-6 overflow-x-auto pb-1 scrollbar-hide">
            {(tabs || []).map(t => (
              <a
                key={t.href}
                href={t.href}
                className={`text-[14px] font-medium whitespace-nowrap px-1 py-2 relative transition-colors ${
                  pathname === t.href
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
                {pathname === t.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
