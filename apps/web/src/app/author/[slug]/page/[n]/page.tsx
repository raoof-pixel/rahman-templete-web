import { authorMeta, authorPage } from '@/lib/lists'

export const revalidate = 60
type Props = { params: Promise<{ slug: string; n: string }> }
export const generateMetadata = async ({ params }: Props) => {
  const { slug, n } = await params
  return authorMeta(decodeURIComponent(slug), n)
}
export default async function Page({ params }: Props) {
  const { slug, n } = await params
  return authorPage(decodeURIComponent(slug), n)
}
