import { legalMeta, legalPage } from '@/lib/legal'

export const revalidate = 60
export const generateMetadata = () => legalMeta('privacy')
export default function Page() {
  return legalPage('privacy')
}
