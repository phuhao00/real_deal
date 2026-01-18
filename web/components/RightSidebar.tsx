"use client"
import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CompanyCard from './CompanyCard'
import JobCard from './JobCard'

type RightSidebarProps = {
  trending?: any[]
  news?: any[]
  companies?: any[]
  jobs?: any[]
}

type TabType = 'all' | 'companies' | 'jobs' | 'projects' | 'trending'

export default function RightSidebar({
  trending = [],
  news = [],
  companies = [],
  jobs = []
}: RightSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabType>('companies')
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  const is = (p: string) => pathname.startsWith(p)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'companies', label: '公司', count: companies.length },
    { id: 'jobs', label: '职位', count: jobs.length },
    { id: 'projects', label: '项目', count: trending.filter((t: any) => t.type === 'project').length },
    { id: 'trending', label: '热门' }
  ]

  const filteredCompanies = companies.filter((c: any) =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredJobs = jobs.filter((j: any) =>
    j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'companies':
        return (
          <div className="space-y-3">
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-[13px]">
                暂无相关公司
              </div>
            ) : (
              filteredCompanies.slice(0, 5).map((company: any) => (
                <CompanyCard
                  key={company.id}
                  id={company.id}
                  name={company.name}
                  description={company.description}
                  logo={company.logo}
                  verified={company.verified}
                  location={company.location}
                  industry={company.industry}
                  employees={company.employees}
                  followers={company.followers}
                  projects={company.projects_count}
                  jobs={company.jobs_count}
                  tags={company.tags}
                  coverImage={company.cover_image}
                  website={company.website}
                />
              ))
            )}
          </div>
        )

      case 'jobs':
        return (
          <div className="space-y-3">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-[13px]">
                暂无相关职位
              </div>
            ) : (
              filteredJobs.slice(0, 5).map((job: any) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  level={job.level}
                  salary={job.salary}
                  skills={job.skills}
                  description={job.description}
                  postedAt={job.created_at}
                  applicants={job.applicants}
                />
              ))
            )}
          </div>
        )

      default:
        return (
          <div className="space-y-2">
            {trending.slice(0, 8).map((item: any, idx: number) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer group"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[11px] font-bold text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate group-hover:text-blue-600 transition">
                    {item.title || item.name}
                  </div>
                  <div className="text-[11px] text-gray-500 truncate mt-0.5">
                    {item.summary || item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <aside className={`hidden lg:flex lg:flex-col lg:w-[380px] gap-3 sticky top-0 h-screen py-2 transition-all duration-200 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
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
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索公司、职位、项目..."
            className="w-full bg-gray-50 text-[13px] border border-gray-200 rounded-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-2.5 text-[13px] font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-full">
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="max-h-[calc(100vh-250px)] overflow-y-auto p-3 scrollbar-thin">
          {renderContent()}
        </div>
      </div>

      {pathname === '/' && (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="text-[15px] font-bold mb-2">🚀 发现更多机会</div>
          <div className="text-[13px] opacity-90 mb-3">
            浏览优质公司、项目、职位，找到属于你的机会
          </div>
          <div className="flex gap-2">
            <a
              href="/companies"
              className="flex-1 bg-white text-blue-600 text-center py-2 rounded-lg text-[13px] font-medium hover:bg-blue-50 transition"
            >
              公司
            </a>
            <a
              href="/jobs"
              className="flex-1 bg-white text-purple-600 text-center py-2 rounded-lg text-[13px] font-medium hover:bg-purple-50 transition"
            >
              职位
            </a>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-[14px] font-semibold mb-3 flex items-center justify-between">
          <span>订阅会员</span>
          <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold rounded-full">
            HOT
          </span>
        </div>
        <div className="text-[13px] text-gray-600 mb-3 space-y-1">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>无限发布动态</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>高级搜索功能</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>优先推荐展示</span>
          </div>
        </div>
        <a
          href="/subscribe"
          className="block text-center bg-blue-600 text-white py-2.5 rounded-lg text-[13px] font-medium hover:bg-blue-700 transition"
        >
          立即订阅 →
        </a>
      </div>
    </aside>
  )
}
