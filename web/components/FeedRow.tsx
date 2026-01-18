"use client"
import { useState } from 'react'

type FeedRowProps = {
  id: string
  title: string
  subtitle?: string
  tags?: string[]
  dense?: boolean
  author?: {
    name: string
    handle: string
    avatar?: string
  }
  timestamp?: string
  likes?: number
  comments?: number
  reposts?: number
  type?: 'post' | 'project' | 'product' | 'job'
}

export default function FeedRow({
  id,
  title,
  subtitle,
  tags,
  dense = false,
  author,
  timestamp,
  likes = 0,
  comments = 0,
  reposts = 0,
  type = 'post'
}: FeedRowProps) {
  const [liked, setLiked] = useState(false)
  const [reposted, setReposted] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const [repostCount, setRepostCount] = useState(reposts)
  const [commentCount, setCommentCount] = useState(comments)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const handleRepost = () => {
    setReposted(!reposted)
    setRepostCount(prev => reposted ? prev - 1 : prev + 1)
  }

  const getTypeIcon = () => {
    switch (type) {
      case 'project':
        return '🚀'
      case 'product':
        return '📦'
      case 'job':
        return '💼'
      default:
        return null
    }
  }

  return (
    <article className={`group px-4 ${dense ? 'py-2' : 'py-4'} hover:bg-[color:color-mix(in oklab, var(--accent) 6%, transparent)] transition cursor-pointer border-b border-[color:var(--border)] last:border-b-0`}>
      {author && !dense ? (
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              author.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[15px] truncate">{author.name}</span>
              {getTypeIcon() && <span className="text-xs">{getTypeIcon()}</span>}
            </div>
            <div className="text-[13px] text-neutral-500 flex items-center gap-1">
              <span>@{author.handle}</span>
              {timestamp && <span>·</span>}
              {timestamp && <span className="hover:underline">{timestamp}</span>}
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-[color:color-mix(in oklab, var(--accent) 8%, transparent)] transition" aria-label="更多选项">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-500">
              <circle cx="12" cy="5" r="1.5"/>
              <circle cx="12" cy="12" r="1.5"/>
              <circle cx="12" cy="19" r="1.5"/>
            </svg>
          </button>
        </div>
      ) : null}

      <div className={`pl-0 ${author && !dense ? 'pl-13' : ''}`}>
        <h3 className={`font-medium ${dense ? 'text-[15px]' : 'text-[16px]'} leading-snug mb-1`}>{title}</h3>
        {subtitle ? (
          <div className={`${dense ? 'text-[14px]' : 'text-[15px]'} text-neutral-600 mt-0.5 leading-relaxed`}>{subtitle}</div>
        ) : null}
        {tags && tags.length ? (
          <div className="text-[12px] mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span key={idx} className="text-blue-600 hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-3 flex items-center justify-between max-w-md">
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); handleLike(); }}
              className={`interactive-action flex items-center gap-1.5 px-2 py-1.5 rounded-full transition group/btn ${liked ? 'text-pink-600' : 'text-neutral-500 hover:text-pink-600'}`}
              aria-label="喜欢"
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {likeCount > 0 && <span className="text-[13px] group-hover/btn:inline-block">{likeCount}</span>}
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); setCommentCount(prev => prev + 1); }}
              className="interactive-action flex items-center gap-1.5 px-2 py-1.5 rounded-full transition text-neutral-500 hover:text-blue-600"
              aria-label="评论"
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"/>
              </svg>
              {commentCount > 0 && <span className="text-[13px]">{commentCount}</span>}
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); handleRepost(); }}
              className={`interactive-action flex items-center gap-1.5 px-2 py-1.5 rounded-full transition ${reposted ? 'text-green-600' : 'text-neutral-500 hover:text-green-600'}`}
              aria-label="转发"
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 1l4 4-4 4"/>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                <path d="M7 23l-4-4 4-4"/>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
              {repostCount > 0 && <span className="text-[13px]">{repostCount}</span>}
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="interactive-action flex items-center gap-1.5 px-2 py-1.5 rounded-full transition text-neutral-500 hover:text-blue-600"
              aria-label="分享"
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <path d="M8.59 13.51l6.83 3.98"/>
                <path d="M15.41 6.51L8.59 10.49"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
