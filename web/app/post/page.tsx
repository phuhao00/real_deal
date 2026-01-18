import { api } from '../lib/api'
import FeedLayout from '../../components/FeedLayout'
import Composer from '../../components/Composer'

export default async function PostPage(){
  const data = await api<{products:any[];companies:any[]}>('/api/explore')
  return (
    <FeedLayout trending={data.products} news={data.companies}>
      <Composer />
    </FeedLayout>
  )
}