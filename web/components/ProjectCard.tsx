"use client"
import { useState } from 'react'

type ProjectCardProps = {
  id: string
  title: string
  summary: string
  author: {
    name: string
    handle: string
    avatar?: string
  }
  tags: string[]
  createdAt?: string
  likes?: number
  comments?: number
  saves?: number
  coverImage?: string
  isLiked?: boolean
  isSaved?: boolean
}

export default function ProjectCard({
  id,
  title,
  summary,
  author,
  tags,
  createdAt,
  likes = 0,
  comments = 0,
  saves = 0,
  coverImage,
  isLiked = false,
  isSaved = false
}: ProjectCardProps) {
  const [liked, setLiked] = useState(isLiked)
  const [saved, setSaved] = useState(isSaved)
  const [expanded, setExpanded] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const [saveCount, setSaveCount] = useState(saves)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved)
    setSaveCount(prev => saved ? prev - 1 : prev + 1)
  }

  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return '刚刚'
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}分钟前`
    if (diffHours < 24) return `${diffHours}小时前`
    if (diffDays < 7) return `${diffDays}天前`
    return date.toLocaleDateString('zh-CN')
  }

  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-200">
      {coverImage && (
        <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-white/90 backdrop-blur text-[11px] font-medium rounded-full">
              项目
            </span>
          </div>
          <div className="absolute top-3 right-3 flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
              className={`p-1.5 rounded-full backdrop-blur transition ${
                saved
                  ? 'text-yellow-500 bg-white/90'
                  : 'text-white bg-black/30 hover:bg-black/50'
              }`}
              aria-label="收藏"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="p-4">
        <h3 className="font-bold text-[16px] leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition">
          {title}
        </h3>

        <p className={`text-[14px] text-gray-600 leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
          {summary}
        </p>
        {summary.length > 100 && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="text-blue-600 text-[12px] font-medium mt-1 hover:underline"
          >
            {expanded ? '收起' : '展开全部'}
          </button>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] rounded-full hover:bg-blue-100 transition cursor-pointer"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 mt-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              author.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium truncate">{author.name}</span>
              <span className="text-[12px] text-gray-400">@{author.handle}</span>
            </div>
          </div>
          <span className="text-[11px] text-gray-400">{getTimeAgo(createdAt)}</span>
        </div>

        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition ${liked ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'}`}
            aria-label="喜欢"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span className="text-[12px]">{likeCount}</span>
          </button>

          <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition" aria-label="评论">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"/>
            </svg>
            <span className="text-[12px]">{comments}</span>
          </button>

          <div className="flex items-center gap-1.5 text-gray-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-[12px]">{saveCount}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
