import { Icon } from '@iconify/react'
import React from 'react'
import tw, { TwStyle } from 'twin.macro'

type SpinnerProperties = {
  width?: TwStyle,
  height?: TwStyle
}

export const Spinner = ({
  width = tw`w-16`,
  height = tw`h-16`
}) => (
  <Icon css={{ ...width, ...height, ...tw`animate-spin` }} icon="mdi:loading" />
)
