import { ReactChild } from 'react'

type MapToFnType<RetType> = {
  [key: string]: () => RetType
}

export default function switchReturn<
  RetType,
  ObjType extends MapToFnType<RetType>
>(value: string, cases: ObjType, defaultCase?: () => RetType): RetType {
  let renderChild
  renderChild = cases[value]
  renderChild = renderChild || cases._DEFAULT_
  if (typeof renderChild !== 'function') {
    throw new Error(`unknown case: ${value}`)
  }
  return renderChild()
}

export const DEFAULT = '_DEFAULT_'
