import { authorMeta, authorPage } from '@/lib/lists'

export const revalidate = 60
type Props = { params: Promise<{ slug: string }> }
export const generateMetadata = async ({ params }: Props) => authorMeta(decodeURIComponent((await params).slug))
export default async function Page({ params }: Props) {
  return authorPage(decodeURIComponent((await params).slug))
}
