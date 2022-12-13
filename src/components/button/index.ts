import { TwStyle } from 'twin.macro'

export type BaseButtonProperties = {
  padding?: TwStyle,
  color?: TwStyle,
  backgroundColor?: TwStyle,
  shadow?: TwStyle,
  onClick?: () => void
}

export * from './text-button'
export * from './icon-button'
