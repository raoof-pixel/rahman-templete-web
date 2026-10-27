import { listMeta, listPage } from '@/lib/lists'

type Props = { params: Promise<{ slug: string; n: string }>; searchParams: Promise<{ sort?: string }> }
export const generateMetadata = async ({ params, searchParams }: Props) => {
  const { slug, n } = await params
  return listMeta('category', decodeURIComponent(slug), n, (await searchParams).sort)
}
export default async function Page({ params, searchParams }: Props) {
  const { slug, n } = await params
  return listPage('category', decodeURIComponent(slug), n, (await searchParams).sort)
}
