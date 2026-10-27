'use client'
import { createContext, useContext } from 'react'

/** The view-model ("v") every generated part renders against — see logic.ts. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type V = Record<string, any>

export const VContext = createContext<V>({})
export const useV = () => useContext(VContext)
