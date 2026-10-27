import React from 'react'

/** Login-page logo: the CanadianSME wordmark used on the website header. */
export const Logo = () => (
  <div className="csme-logo">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/brand/canadiansme-logo.png" alt="CanadianSME Small Business Magazine" width={360} height={63} />
    <div className="csme-logo__tag">Newsroom · Content dashboard</div>
  </div>
)

export default Logo
