"use client"
import { useState } from 'react'

type ProductCardProps = {
  id: string
  name: string
  summary: string
  tags: string[]
  price?: string
  author: {
    name: string
    handle: string
    avatar?: string
  }
  createdAt?: string
  likes?: number
  reviews?: number
  coverImage?: string
  isLiked?: boolean
  rating?: number
}

export default function ProductCard({
  id,
  name,
  summary,
  tags,
  price,
  author,
  createdAt,
  likes = 0,
  reviews = 0,
  coverImage,
  isLiked = false,
  rating = 0
}: ProductCardProps) {
  const [liked, setLiked] = useState(isLiked)
  const [expanded, setExpanded] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        )
      } else if (i - 0.5 <= rating) {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor="currentColor"/>
                <stop offset="50%" stopColor="#E5E7EB"/>
              </linearGradient>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#halfStar)"/>
          </svg>
        )
      } else {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        )
      }
    }
    return stars
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
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300">
      <div className="relative">
        {coverImage ? (
          <div className="h-52 bg-gradient-to-br from-blue-400 to-purple-500">
            <img
              src={coverImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-52 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-6xl">📦</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1">
          <span className="px-2 py-1 bg-white/90 backdrop-blur text-[11px] font-medium rounded-full">
            产品
          </span>
          {rating > 0 && (
            <span className="px-2 py-1 bg-yellow-500 text-white text-[11px] font-bold rounded-full flex items-center gap-1">
              ⭐ {rating.toFixed(1)}
            </span>
          )}
        </div>
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur transition ${
            liked
              ? 'text-pink-500 bg-white/90'
              : 'text-white bg-black/30 hover:bg-black/50'
          }`}
          aria-label="喜欢"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-[16px] leading-tight flex-1 group-hover:text-blue-600 transition line-clamp-2">
            {name}
          </h3>
          {price && (
            <span className="text-[16px] font-bold text-green-600 flex-shrink-0">
              {price}
            </span>
          )}
        </div>

        <p className={`text-[14px] text-gray-600 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
          {summary}
        </p>
        {summary.length > 80 && (
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
                className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[11px] rounded-full hover:bg-purple-100 transition cursor-pointer"
              >
                {tag}
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

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            {rating > 0 && (
              <div className="flex items-center gap-1">
                {renderStars(rating)}
                <span className="text-[12px] text-gray-500 ml-1">({reviews})</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-gray-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="text-[12px]">{likeCount}</span>
            </div>
          </div>

          <button className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[13px] font-medium hover:bg-blue-700 hover:scale-105 transition-all">
            查看详情
          </button>
        </div>
      </div>
    </article>
  )
}
