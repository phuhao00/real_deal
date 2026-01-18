"use client"
import { useState } from 'react'

type CompanyCardProps = {
  id: string
  name: string
  description?: string
  logo?: string
  verified?: boolean
  location?: string
  industry?: string
  employees?: string
  followers?: number
  projects?: number
  jobs?: number
  tags?: string[]
  coverImage?: string
  website?: string
  isFollowing?: boolean
}

export default function CompanyCard({
  id,
  name,
  description,
  logo,
  verified = false,
  location,
  industry,
  employees,
  followers = 0,
  projects = 0,
  jobs = 0,
  tags = [],
  coverImage,
  website,
  isFollowing = false
}: CompanyCardProps) {
  const [following, setFollowing] = useState(isFollowing)
  const [showMore, setShowMore] = useState(false)

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFollowing(!following)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer">
      {coverImage && (
        <div className="relative h-32 bg-gradient-to-r from-blue-400 to-purple-500 overflow-hidden">
          <img
            src={coverImage}
            alt={`${name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className={`p-4 ${!coverImage ? 'pt-4' : 'pt-0'}`}>
        <div className="flex gap-3">
          <div className={`relative ${!coverImage ? '' : '-mt-8'} mb-2`}>
            <div className="w-16 h-16 rounded-xl bg-white border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
              {logo ? (
                <img src={logo} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-[15px] truncate">{name}</h3>
            </div>
            <div className="text-[13px] text-gray-600 truncate">{industry}</div>
          </div>
        </div>

        {description && (
          <p className={`text-[14px] text-gray-700 mt-3 leading-relaxed ${!showMore ? 'line-clamp-3' : ''}`}>
            {description}
          </p>
        )}
        {description && description.length > 150 && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowMore(!showMore); }}
            className="text-blue-600 text-[13px] font-medium mt-1 hover:underline"
          >
            {showMore ? '收起' : '展开更多'}
          </button>
        )}

        {(location || employees) && (
          <div className="flex items-center gap-4 mt-3 text-[13px] text-gray-600">
            {location && (
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{location}</span>
              </div>
            )}
            {employees && (
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>{employees}</span>
              </div>
            )}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] rounded-full hover:bg-gray-200 transition cursor-pointer"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] rounded-full">
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-[15px] font-bold">{formatNumber(followers)}</div>
            <div className="text-[11px] text-gray-500">关注者</div>
          </div>
          <div className="text-center">
            <div className="text-[15px] font-bold">{projects}</div>
            <div className="text-[11px] text-gray-500">项目</div>
          </div>
          <div className="text-center">
            <div className="text-[15px] font-bold">{jobs}</div>
            <div className="text-[11px] text-gray-500">职位</div>
          </div>
          <button
            onClick={handleFollow}
            className={`ml-auto px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
              following
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
            }`}
          >
            {following ? '已关注' : '关注'}
          </button>
        </div>

        {website && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-[13px] flex items-center gap-1 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              访问官网
            </a>
          </div>
        )}
      </div>
    </article>
  )
}
