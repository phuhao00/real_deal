"use client"
import { useState, useRef, useEffect } from 'react'

export default function Composer() {
  const [text, setText] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [isPosting, setIsPosting] = useState(false)
  const maxLength = 280
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setCharCount(text.length)
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = Math.min(textAreaRef.current.scrollHeight, 200) + 'px'
    }
  }, [text])

  const handlePost = async () => {
    if (!text.trim() || isPosting) return

    setIsPosting(true)
    try {
      await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: text.trim() })
      })
      setText('')
      setIsExpanded(false)
      window.location.reload()
    } catch (error) {
      console.error('Post failed:', error)
    } finally {
      setIsPosting(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      console.log('Selected files:', Array.from(files))
    }
  }

  const charColor = charCount > maxLength * 0.9 ? 'text-orange-500' : charCount > maxLength ? 'text-red-500' : 'text-neutral-500'

  return (
    <div className="bg-white border border-[color:var(--border)] rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
          U
        </div>

        <div className="flex-1 min-w-0">
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="有什么新鲜事？"
            className="w-full bg-transparent outline-none resize-none text-[15px] leading-relaxed placeholder:text-neutral-400 min-h-[60px]"
            rows={isExpanded ? 3 : 1}
            maxLength={maxLength + 20}
          />

          {isExpanded && (
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition"
                  aria-label="上传图片/视频"
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                  </svg>
                </button>

                <button
                  className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition"
                  aria-label="添加表情"
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </button>

                <button
                  className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition"
                  aria-label="添加位置"
                  type="button"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs ${charColor}`}>
                  {charCount}/{maxLength}
                </span>
                <button
                  onClick={handlePost}
                  disabled={!text.trim() || isPosting || charCount > maxLength}
                  className={`px-5 py-1.5 rounded-full font-semibold text-sm transition ${
                    !text.trim() || isPosting || charCount > maxLength
                      ? 'bg-blue-300 text-white cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                  }`}
                  type="button"
                >
                  {isPosting ? '发布中...' : '发布'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
