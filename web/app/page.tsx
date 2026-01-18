import { api } from './lib/api'
import FeedLayout from '../components/FeedLayout'
import Composer from '../components/Composer'
import FeedRow from '../components/FeedRow'
import ProjectCard from '../components/ProjectCard'
import ProductCard from '../components/ProductCard'
import { Suspense } from 'react'

type FeedItem = {
  id: string
  title: string
  subtitle?: string
  summary?: string
  tags?: string[]
  type: 'post' | 'project' | 'product' | 'job'
  author?: {
    name: string
    handle: string
    avatar?: string
  }
  timestamp?: string
  cover_image?: string
  likes?: number
  comments?: number
  saves?: number
  price?: string
  rating?: number
  reviews?: number
}

type FeedData = {
  projects: any[]
  products: any[]
  posts: any[]
  jobs: any[]
  companies: any[]
}

function transformFeed(data: FeedData): FeedItem[] {
  const projects = data.projects.map(p => ({
    id: p.id,
    title: p.title,
    summary: p.summary,
    tags: p.tags,
    type: 'project' as const,
    author: {
      name: p.author_name || 'Unknown',
      handle: p.author_handle || 'unknown',
      avatar: p.author_avatar
    },
    timestamp: p.created_at,
    cover_image: p.cover_image,
    likes: p.likes,
    comments: p.comments_count,
    saves: p.saves
  }))

  const products = data.products.map(p => ({
    id: p.id,
    title: p.name,
    summary: p.summary,
    tags: p.tags,
    type: 'product' as const,
    author: {
      name: p.author_name || 'Unknown',
      handle: p.author_handle || 'unknown',
      avatar: p.author_avatar
    },
    timestamp: p.created_at,
    cover_image: p.cover_image,
    likes: p.likes,
    price: p.price,
    rating: p.rating,
    reviews: p.reviews_count
  }))

  const posts = data.posts.map(p => ({
    id: p.id,
    title: p.content?.substring(0, 100) || '',
    subtitle: '',
    summary: '',
    tags: p.hashtags,
    type: 'post' as const,
    author: {
      name: p.author_name || 'Unknown',
      handle: p.author_handle || 'unknown',
      avatar: p.author_avatar
    },
    timestamp: p.created_at,
    likes: p.likes,
    comments: p.comments_count
  }))

  const jobs = data.jobs.map(j => ({
    id: j.id,
    title: j.title,
    subtitle: `${j.location} · ${j.level} · ${j.salary}`,
    tags: j.skills,
    type: 'job' as const,
    author: {
      name: j.company_name || 'Unknown',
      handle: j.company_handle || 'unknown',
      avatar: j.company_logo
    },
    timestamp: j.created_at
  }))

  return [...projects, ...products, ...posts, ...jobs]
    .sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0
      return timeB - timeA
    })
}

function filterFeed(feed: FeedItem[], query: string, type: string): FeedItem[] {
  return feed.filter(item => {
    const matchesType = !type || type === 'all' || item.type === type
    if (!matchesType) return false

    if (!query) return true

    const q = query.toLowerCase()
    const titleMatch = item.title?.toLowerCase().includes(q)
    const subtitleMatch = item.subtitle?.toLowerCase().includes(q)
    const summaryMatch = item.summary?.toLowerCase().includes(q)
    const tagsMatch = item.tags?.some(tag => tag.toLowerCase().includes(q))

    return titleMatch || subtitleMatch || summaryMatch || tagsMatch
  })
}

function LoadingState() {
  return (
    <div className="space-y-4 px-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  )
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">😕</div>
      <h3 className="text-xl font-bold mb-2">加载失败</h3>
      <p className="text-gray-500 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium"
      >
        重试
      </button>
    </div>
  )
}

function EmptyState({ query, type }: { query?: string, type?: string }) {
  let message = '暂无内容'
  if (query) message = `没有找到与 "${query}" 相关的内容`
  else if (type && type !== 'all') {
    const typeMap: Record<string, string> = {
      'project': '项目',
      'product': '产品',
      'job': '职位',
      'post': '帖子'
    }
    message = `暂无${typeMap[type] || ''}内容`
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-7xl mb-4">🔍</div>
      <h3 className="text-xl font-bold mb-2">{message}</h3>
      <p className="text-gray-500 mb-6">试试其他关键词或筛选条件</p>
      <div className="flex gap-2">
        <button
          onClick={() => window.location.href = '/projects'}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition"
        >
          浏览项目
        </button>
        <button
          onClick={() => window.location.href = '/jobs'}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition"
        >
          浏览职位
        </button>
      </div>
    </div>
  )
}

async function FeedContent({ searchParams }: { searchParams?: { q?: string, type?: string } }) {
  try {
    const data = await api<FeedData>('/api/explore')
    const feed = transformFeed(data)
    const query = (searchParams?.q || '').toLowerCase()
    const type = (searchParams?.type || '').toLowerCase()
    const filtered = filterFeed(feed, query, type)

    if (filtered.length === 0) {
      return <EmptyState query={searchParams?.q} type={searchParams?.type} />
    }

    return (
      <div className="divide-y divide-gray-200">
        {filtered.map(item => {
          if (item.type === 'project') {
            return (
              <div key={item.id} className="p-4">
                <ProjectCard
                  id={item.id}
                  title={item.title}
                  summary={item.summary || ''}
                  author={item.author!}
                  tags={item.tags || []}
                  createdAt={item.timestamp}
                  likes={item.likes}
                  comments={item.comments}
                  saves={item.saves}
                  coverImage={item.cover_image}
                />
              </div>
            )
          } else if (item.type === 'product') {
            return (
              <div key={item.id} className="p-4">
                <ProductCard
                  id={item.id}
                  name={item.title}
                  summary={item.summary || ''}
                  tags={item.tags || []}
                  author={item.author!}
                  createdAt={item.timestamp}
                  likes={item.likes}
                  coverImage={item.cover_image}
                  price={item.price}
                  rating={item.rating}
                  reviews={item.reviews}
                />
              </div>
            )
          } else {
            return (
              <FeedRow
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                tags={item.tags}
                type={item.type}
                author={item.author}
                timestamp={item.timestamp}
                likes={item.likes}
                comments={item.comments}
              />
            )
          }
        })}
      </div>
    )
  } catch (error) {
    return <ErrorState error={error instanceof Error ? error.message : '未知错误'} />
  }
}

export default function Page({ searchParams }: { searchParams?: { q?: string, type?: string, density?: string } }) {
  const density = searchParams?.density || 'comfy'
  const filters = [
    { label: '全部', value: 'all' },
    { label: '项目', value: 'project' },
    { label: '产品', value: 'product' },
    { label: '帖子', value: 'post' },
    { label: '职位', value: 'job' }
  ]

  return (
    <FeedLayout trending={[]} news={[]} title="动态" filters={filters}>
      <Composer />
      <Suspense fallback={<LoadingState />}>
        <FeedContent searchParams={searchParams} />
      </Suspense>
    </FeedLayout>
  )
}
