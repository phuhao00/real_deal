export default function Card({ title, subtitle }: { title: string, subtitle?: string }){
  return (
    <div className="border border-neutral-800 p-4 rounded">
      <div className="font-medium">{title}</div>
      {subtitle ? <div className="text-sm text-neutral-400">{subtitle}</div> : null}
    </div>
  )
}