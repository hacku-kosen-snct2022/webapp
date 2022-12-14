import { TwStyle } from 'twin.macro'

export type BaseButtonProperties = {
  padding?: TwStyle,
  color?: TwStyle,
  backgroundColor?: TwStyle,
  shadow?: TwStyle,
  onClick?: () => void | Promise<void>,
  disabled?: boolean
}

export * from './text-button'
export * from './icon-button'
