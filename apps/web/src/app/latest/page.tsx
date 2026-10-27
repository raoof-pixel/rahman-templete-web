import { listMeta, listPage } from '@/lib/lists'

type Props = { searchParams: Promise<{ sort?: string }> }
export const generateMetadata = async ({ searchParams }: Props) => listMeta('latest', '', undefined, (await searchParams).sort)
export default async function Page({ searchParams }: Props) {
  return listPage('latest', '', undefined, (await searchParams).sort)
}
