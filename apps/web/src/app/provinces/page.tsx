import { permanentRedirect } from 'next/navigation'

/** The province picker lives on the homepage. */
export default function Page() {
  permanentRedirect('/#provinces')
}
