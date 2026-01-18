"use client"
import { useState, useEffect } from 'react'

export default function FloatActions() {
  const [showFab, setShowFab] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowFab(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <a
        href="/post"
        aria-label="发布动态"
        className={`fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
      >
        <button
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isHovered ? 'rotate-90' : ''}`}
          >
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </a>

      {showFab && (
        <button
          onClick={handleScrollToTop}
          aria-label="回到顶部"
          className="fixed bottom-6 right-24 lg:bottom-8 lg:right-28 z-40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="w-12 h-12 bg-gray-900 hover:bg-black text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </div>
        </button>
      )}
    </>
  )
}
