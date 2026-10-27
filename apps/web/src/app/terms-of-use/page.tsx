import { legalMeta, legalPage } from '@/lib/legal'

export const revalidate = 60
export const generateMetadata = () => legalMeta('terms-of-use')
export default function Page() {
  return legalPage('terms-of-use')
}
