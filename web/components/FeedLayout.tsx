import SidebarNav from './SidebarNav'
import RightSidebar from './RightSidebar'
import type { ReactNode } from 'react'
import FloatActions from './FloatActions'
import CenterHeader from './CenterHeader'
 

export default function FeedLayout({ children, trending, news, title, tabs, filters }: { children: ReactNode, trending: any[], news: any[], title?: string, tabs?: { href: string, label: string }[], filters?: { label: string, value: string }[] }){
  return (
    <div className="relative mx-auto max-w-[1230px]">
      <div className="hidden lg:block">
        <div className="fixed top-0 h-screen w-[280px]" style={{ left: 'calc((100vw - 1230px)/2)' }}>
          <SidebarNav />
        </div>
        <div className="fixed top-0 h-screen w-[350px]" style={{ right: 'calc((100vw - 1230px)/2)' }}>
          <RightSidebar trending={trending} news={news} />
        </div>
      </div>
      <div className="lg:ml-[280px] lg:mr-[350px] lg:border-x lg:border-neutral-800 px-0 lg:px-5">
        {title ? <CenterHeader title={title} tabs={tabs} filters={filters} /> : null}
        <div className="px-4">
          {children}
        </div>
      </div>
      <FloatActions />
    </div>
  )
}