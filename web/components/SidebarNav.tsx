"use client"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { API_BASE } from '../app/lib/api'
export default function SidebarNav(){
  const pathname = usePathname()
  const is = (p:string)=> pathname===p
  const [me,setMe] = useState<any>(null)
  useEffect(()=>{ fetch(`${API_BASE}/api/me`, { credentials:'include' }).then(r=>r.ok?r.json():null).then(setMe).catch(()=>{}) },[])
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[240px] gap-1 sticky top-0 h-screen py-1">
      <a href="/" className="flex items-center gap-2 px-3 py-2 text-[18px] font-semibold">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[color:var(--accent)] text-[#0b0f12]">R</span>
        RealDeal
      </a>
      <nav className="flex flex-col gap-1 mt-2">
        <a href="/" className={`nav-link flex items-center gap-3 text-[18px] ${is('/')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">🏠</span>
          首页
        </a>
        <a href="/projects" className={`nav-link flex items-center gap-3 text-[18px] ${is('/projects')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">🧩</span>
          作品
        </a>
        <a href="/products" className={`nav-link flex items-center gap-3 text-[18px] ${is('/products')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">📦</span>
          产品
        </a>
        <a href="/jobs" className={`nav-link flex items-center gap-3 text-[18px] ${is('/jobs')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">💼</span>
          职位
        </a>
        <a href="/investors" className={`nav-link flex items-center gap-3 text-[18px] ${is('/investors')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">💹</span>
          投资
        </a>
        <a href="/explore" className={`nav-link flex items-center gap-3 text-[18px] ${is('/explore')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">🔍</span>
          发现
        </a>
        <a href="/notifications" className={`nav-link flex items-center gap-3 text-[18px] ${is('/notifications')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">🔔</span>
          通知
        </a>
        <a href="/chat" className={`nav-link flex items-center gap-3 text-[18px] ${is('/chat')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">💬</span>
          私信
        </a>
        <a href="/bookmarks" className={`nav-link flex items-center gap-3 text-[18px] ${is('/bookmarks')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">⭐</span>
          收藏
        </a>
        <a href="/profile" className={`nav-link flex items-center gap-3 text-[18px] ${is('/profile')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">👤</span>
          个人资料
        </a>
        <a href="/login" className={`nav-link flex items-center gap-3 text-[18px] ${is('/login')?'link-active':''}`}>
          <span className="inline-block w-6 h-6">🔑</span>
          登录
        </a>
      </nav>
      <div className="mt-4">
        <a href="/post" className="btn-primary px-4 py-2 rounded-full inline-block text-sm">发布</a>
      </div>
      {me ? (
        <div className="mt-auto panel border rounded-2xl px-3 py-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[color:var(--accent)] text-[#0b0f12] flex items-center justify-center">{String(me.email||me.name||'U').charAt(0).toUpperCase()}</div>
          <div className="flex-1">
            <div className="text-[15px] font-medium">{me.name||me.email}</div>
            <div className="text-[12px] text-neutral-500">{me.role||''}</div>
          </div>
        </div>
      ) : null}
    </aside>
  )
}