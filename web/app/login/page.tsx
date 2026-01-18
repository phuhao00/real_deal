"use client"
import { API_BASE } from '../lib/api'
import { useState } from 'react'

export default function LoginPage(){
  const [email,setEmail] = useState('alice@example.com')
  const [loading,setLoading] = useState(false)
  const [err,setErr] = useState('')
  const submit = async (e:any)=>{
    e.preventDefault()
    setLoading(true); setErr('')
    try{
      const res = await fetch(`${API_BASE}/api/login`, { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({email}) })
      if(!res.ok) throw new Error('login failed')
      window.location.href = '/'
    }catch(e:any){ setErr(e.message)} finally{ setLoading(false)}
  }
  return (
    <div className="max-w-sm mx-auto">
      <div className="text-2xl font-semibold mb-4">登录</div>
      <form onSubmit={submit} className="grid gap-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="邮箱" className="px-3 py-2 rounded bg-neutral-900 border border-neutral-700" />
        <button disabled={loading} className="px-3 py-2 rounded bg-neutral-200 text-black">{loading?'处理中...':'登录'}</button>
        {err && <div className="text-red-400 text-sm">{err}</div>}
      </form>
      <div className="mt-4 text-sm text-neutral-400">示例账号：alice@example.com（candidate）、bob@example.com（recruiter）</div>
    </div>
  )
}