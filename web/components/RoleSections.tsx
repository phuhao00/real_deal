"use client"
import { API_BASE } from "../app/lib/api"
import { useEffect, useState } from "react"

export default function RoleSections(){
  const [me,setMe] = useState<any>(null)
  useEffect(()=>{
    fetch(`${API_BASE}/api/me`, { credentials:'include' }).then(r=>r.ok?r.json():null).then(setMe).catch(()=>{})
  },[])
  if(!me) return null
  const role = me.role
  return (
    <div className="grid gap-6 mt-6">
      {role==='candidate' && (
        <div className="border border-neutral-800 p-4 rounded">
          <div className="font-medium">候选人专区</div>
          <div className="text-sm text-neutral-400">快速上传作品与完善资料</div>
        </div>
      )}
      {role==='recruiter' && (
        <div className="border border-neutral-800 p-4 rounded">
          <div className="font-medium">招聘方专区</div>
          <div className="text-sm text-neutral-400">发布职位、查看公司认证与合规状态</div>
        </div>
      )}
      {role==='investor' && (
        <div className="border border-neutral-800 p-4 rounded">
          <div className="font-medium">投资人专区</div>
          <div className="text-sm text-neutral-400">浏览 Pitch 与预约 Office Hours</div>
        </div>
      )}
    </div>
  )
}