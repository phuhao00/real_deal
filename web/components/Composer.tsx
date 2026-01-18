export default function Composer(){
  return (
    <div className="panel border rounded-2xl px-4 py-3 mb-4">
      <div className="text-sm text-neutral-600">有什么新鲜事？</div>
      <div className="mt-2 flex items-center gap-2">
        <input className="flex-1 bg-transparent outline-none text-sm" placeholder="分享你的动态、作品或招聘信息" />
        <a href="/post" className="btn-primary px-3 py-1 rounded-full text-sm">发布</a>
      </div>
    </div>
  )
}