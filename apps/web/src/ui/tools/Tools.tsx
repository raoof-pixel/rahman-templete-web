'use client'
import { useEffect, useReducer, useRef } from 'react'

import { VContext } from '../context'
import { ToolsLogic } from './logic'
import ToolsView from './ToolsView'

export type ToolKey = 'index' | 'gst' | 'payroll' | 'cashflow' | 'loan'

/** The Tools page (calculators run entirely in the browser; nothing is stored or sent). */
export function Tools({ view }: { view: ToolKey }) {
  const [, rerender] = useReducer((x: number) => x + 1, 0)
  const ref = useRef<ToolsLogic | null>(null)
  if (!ref.current) {
    const logic = new ToolsLogic({ view })
    logic.__host = {
      __setLogicState(update: unknown, cb?: () => void) {
        const patch = typeof update === 'function' ? (update as (s: unknown) => object)(logic.state) : update
        logic.state = { ...logic.state, ...(patch as object) }
        rerender()
        if (cb) queueMicrotask(cb)
      },
    }
    ref.current = logic
  }
  const logic = ref.current
  if (logic.state.view !== view) logic.state = { ...logic.state, view }
  useEffect(() => {
    logic.componentDidMount()
    return () => logic.componentWillUnmount()
  }, [logic])
  return (
    <VContext.Provider value={logic.renderVals()}>
      <ToolsView />
    </VContext.Provider>
  )
}
