import { listMeta, listPage } from '@/lib/lists'

type Props = { params: Promise<{ n: string }>; searchParams: Promise<{ sort?: string }> }
export const generateMetadata = async ({ params, searchParams }: Props) => listMeta('latest', '', (await params).n, (await searchParams).sort)
export default async function Page({ params, searchParams }: Props) {
  return listPage('latest', '', (await params).n, (await searchParams).sort)
}
