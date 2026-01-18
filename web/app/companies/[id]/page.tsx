import { api } from '../../lib/api'
import FeedLayout from '../../../components/FeedLayout'
type Params = { params: { id: string } }
export default async function CompanyPage({ params }: Params){
  const [co, data] = await Promise.all([
    api<any>(`/api/companies/${params.id}`),
    api<{products:any[];companies:any[]}>('/api/explore')
  ])
  return (
    <FeedLayout trending={data.products} news={data.companies}>
      <div className="max-w-3xl">
        <div className="text-2xl font-semibold mb-2">{co.name}</div>
        <div className="text-neutral-700">{co.description}</div>
        <div className="mt-2 text-xs">{co.verified? '已认证':'未认证'}</div>
      </div>
    </FeedLayout>
  )
}