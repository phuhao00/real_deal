import type { ReactNode } from 'react'
export default function Section({ title, children }: { title: string, children: ReactNode }){
  return (
    <section>
      <h2 className="text-xl mb-3 font-semibold">{title}</h2>
      {children}
    </section>
  )
}