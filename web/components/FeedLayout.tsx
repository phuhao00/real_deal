import SidebarNav from './SidebarNav'
import RightSidebar from './RightSidebar'
import type { ReactNode } from 'react'
import FloatActions from './FloatActions'
import CenterHeader from './CenterHeader'

export default function FeedLayout({
  children,
  trending,
  news,
  title,
  tabs,
  filters
}: {
  children: ReactNode
  trending: any[]
  news: any[]
  title?: string
  tabs?: { href: string, label: string }[]
  filters?: { label: string, value: string }[]
}) {
  return (
    <div className="relative mx-auto min-h-screen">
      <div className="flex">
        <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[275px] border-r border-gray-200 bg-white z-20">
          <SidebarNav />
        </aside>

        <main className="flex-1 lg:ml-[275px] lg:mr-[350px] min-w-0">
          <div className="border-x border-gray-200 bg-white min-h-screen">
            {title ? <CenterHeader title={title} tabs={tabs} filters={filters} /> : null}
            <div>{children}</div>
          </div>
        </main>

        <aside className="hidden lg:flex flex-col fixed right-0 top-0 h-screen w-[350px] border-l border-gray-200 bg-white z-20">
          <div className="sticky top-0">
            <RightSidebar trending={trending} news={news} />
          </div>
        </aside>
      </div>

      <FloatActions />
    </div>
  )
}
