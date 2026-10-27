'use client'
import { type ReactNode, useEffect, useReducer, useRef } from 'react'

import { VContext } from './context'
import { SiteLogic } from './logic'
import AccessibilityPanel from './AccessibilityPanel'
import After from './parts/After'
import Chrome from './parts/Chrome'
import MainTail from './parts/MainTail'
import type { SiteProps } from './types'

/**
 * The page shell from the prototype: top bar + header + mega menu + drawer, the page itself (children),
 * then the footer, pop-ups and modals. One SiteLogic instance per page drives all of it.
 * Rendered on the server first (full HTML for readers and Google), then made interactive in the browser.
 */
export function Site({ route, D, children }: SiteProps & { children: ReactNode }) {
  const [, rerender] = useReducer((x: number) => x + 1, 0)
  const ref = useRef<SiteLogic | null>(null)
  if (!ref.current) {
    const logic = new SiteLogic({ route, D })
    const pending: (() => void)[] = []
    logic.__host = {
      __setLogicState(update: unknown, cb?: () => void) {
        const patch = typeof update === 'function' ? (update as (s: unknown) => object)(logic.state) : update
        logic.state = { ...logic.state, ...(patch as object) }
        if (cb) pending.push(cb)
        rerender()
        if (pending.length) queueMicrotask(() => pending.splice(0).forEach((f) => f()))
      },
    }
    ref.current = logic
  }
  const logic = ref.current
  // New page data (e.g. client-side navigation to another article) -> reload the logic's data.
  if (logic.props.D !== D || logic.props.route !== route) logic.setProps({ route, D })

  useEffect(() => {
    logic.componentDidMount()
    return () => logic.componentWillUnmount()
  }, [logic])

  const v = logic.renderVals()
  return (
    <VContext.Provider value={v}>
      <div style={{ backgroundColor: '#FFFFFF', maxWidth: '100%', overflowX: 'clip' }}>
        <Chrome />
        <main id="main">
          {children}
          <MainTail />
        </main>
        <After />
        <AccessibilityPanel />
      </div>
    </VContext.Provider>
  )
}
