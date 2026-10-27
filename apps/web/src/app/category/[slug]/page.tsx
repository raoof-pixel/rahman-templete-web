import { listMeta, listPage } from '@/lib/lists'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ sort?: string }> }
export const generateMetadata = async ({ params, searchParams }: Props) => listMeta('category', decodeURIComponent((await params).slug), undefined, (await searchParams).sort)
export default async function Page({ params, searchParams }: Props) {
  return listPage('category', decodeURIComponent((await params).slug), undefined, (await searchParams).sort)
}
