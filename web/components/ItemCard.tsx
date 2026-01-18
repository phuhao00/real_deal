export default function ItemCard({ title, subtitle, tags }: { title: string, subtitle?: string, tags?: string[] }){
  return (
    <div className="interactive-item p-5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] transition-colors">
      <div className="text-[15px] font-medium">{title}</div>
      {subtitle ? <div className="text-[14px] text-neutral-600 mt-1">{subtitle}</div> : null}
      {tags && tags.length ? <div className="text-[12px] mt-2 tag">{tags.join(', ')}</div> : null}
      <div className="mt-3 flex items-center gap-8 interactive-actions">
        <button className="flex items-center gap-1 interactive-action" aria-label="评论" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"/></svg>
        </button>
        <button className="flex items-center gap-1 interactive-action" aria-label="转发" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
        </button>
        <button className="flex items-center gap-1 interactive-action" aria-label="喜欢" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button className="flex items-center gap-1 interactive-action" aria-label="分享" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98"/><path d="M15.41 6.51L8.59 10.49"/></svg>
        </button>
      </div>
    </div>
  )
}