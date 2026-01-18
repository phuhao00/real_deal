import SidebarNav from './SidebarNav'
import RightSidebar from './RightSidebar'
import type { ReactNode } from 'react'
import FloatActions from './FloatActions'
import CenterHeader from './CenterHeader'

export default function FeedLayout({
  children,
  trending = [],
  news = [],
  companies = [],
  jobs = [],
  title,
  tabs,
  filters
}: {
  children: ReactNode
  trending?: any[]
  news?: any[]
  companies?: any[]
  jobs?: any[]
  title?: string
  tabs?: { href: string, label: string }[]
  filters?: { label: string, value: string }[]
}) {
  return (
    <div className="relative mx-auto min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[280px] border-r border-gray-200 bg-white z-20">
          <SidebarNav />
        </aside>

        <main className="flex-1 lg:ml-[280px] lg:mr-[380px] min-w-0">
          <div className="max-w-[680px] mx-auto">
            <div className="bg-white min-h-screen border-x border-gray-200 shadow-sm">
              {title ? <CenterHeader title={title} tabs={tabs} filters={filters} /> : null}
              <div>{children}</div>
            </div>
          </div>
        </main>

        <aside className="hidden lg:flex flex-col fixed right-0 top-0 h-screen w-[380px] border-l border-gray-200 bg-white z-20">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <RightSidebar
              trending={trending}
              news={news}
              companies={companies}
              jobs={jobs}
            />
          </div>
        </aside>
      </div>

      <FloatActions />
    </div>
  )
}
