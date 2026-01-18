"use client"
import { useState } from 'react'

type JobCardProps = {
  id: string
  title: string
  company: {
    name: string
    logo?: string
    verified?: boolean
  }
  location: string
  level: string
  salary: string
  skills: string[]
  description?: string
  postedAt?: string
  applicants?: number
  isSaved?: boolean
  isApplied?: boolean
}

export default function JobCard({
  id,
  title,
  company,
  location,
  level,
  salary,
  skills,
  description,
  postedAt,
  applicants = 0,
  isSaved = false,
  isApplied = false
}: JobCardProps) {
  const [saved, setSaved] = useState(isSaved)
  const [applied, setApplied] = useState(isApplied)
  const [showDescription, setShowDescription] = useState(false)

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved)
  }

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation()
    setApplied(true)
  }

  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return '刚刚'
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} 分钟前`
    if (diffHours < 24) return `${diffHours} 小时前`
    if (diffDays < 7) return `${diffDays} 天前`
    return date.toLocaleDateString('zh-CN')
  }

  return (
    <article className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              {company.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[15px] truncate group-hover:text-blue-600 transition">{title}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[13px] text-gray-700 font-medium">{company.name}</span>
                {company.verified && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                )}
              </div>
            </div>

            <button
              onClick={handleSave}
              className={`p-1.5 rounded-full transition ${
                saved
                  ? 'text-yellow-500 bg-yellow-50'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="收藏"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[11px] font-medium rounded-full">
              {location}
            </span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-medium rounded-full">
              {level}
            </span>
            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[11px] font-medium rounded-full">
              {salary}
            </span>
          </div>

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] rounded hover:bg-gray-200 transition"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] rounded">
                  +{skills.length - 4}
                </span>
              )}
            </div>
          )}

          {description && (
            <div className="mt-3">
              <button
                onClick={(e) => { e.stopPropagation(); setShowDescription(!showDescription); }}
                className="text-blue-600 text-[12px] font-medium hover:underline flex items-center gap-1"
              >
                {showDescription ? '收起' : '查看详情'}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${showDescription ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {showDescription && (
                <p className="text-[13px] text-gray-600 mt-2 leading-relaxed line-clamp-3">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-[12px] text-gray-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span>{getTimeAgo(postedAt)}</span>
              {applicants > 0 && (
                <>
                  <span className="mx-1">·</span>
                  <span>{apppliers} 人申请</span>
                </>
              )}
            </div>

            <button
              onClick={handleApply}
              disabled={applied}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                applied
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
              }`}
            >
              {applied ? '已申请' : '立即申请'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
