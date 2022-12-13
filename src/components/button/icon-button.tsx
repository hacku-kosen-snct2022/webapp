import { Icon } from '@iconify/react'
import React from 'react'
import tw, { TwStyle } from 'twin.macro'
import { BaseButtonProperties } from './'

type IconButtonProperties = BaseButtonProperties
  & {
    icon: string,
    iconSize?: string | number
  } & ({
    label?: never,
    labelSize?: never,
    labelPosition?: never,
    alwaysVisibleLabel?: never,
    width?: TwStyle,
    height?: TwStyle
  } |
  {
    label: string,
    labelSize?: TwStyle,
    labelPosition?: 'left' | 'right',
    alwaysVisibleLabel?: boolean,
    width?: never,
    height?: never
  })

export const IconButton: React.FC<IconButtonProperties> = ({
  icon,
  iconSize = '1.5rem',
  color = tw`text-black`,
  padding = tw`p-4`,
  backgroundColor = tw`bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500`,
  shadow = tw`shadow shadow-neutral-300`,
  label,
  labelSize = tw`text-base`,
  labelPosition = 'right',
  alwaysVisibleLabel = false,
  width = tw`w-12`,
  height = tw`h-12`,
  onClick
}) => (
  <button
    css={{
      ...(label ? labelSize : {}),
      ...(label ? {} : width),
      ...height,
      ...(label ? {} : tw`aspect-square`),
      ...padding,
      ...backgroundColor,
      ...shadow,
      ...color,
      ...tw`flex justify-center items-center gap-2 rounded-xl aspect-square sm:aspect-auto whitespace-nowrap`
    }}
    onClick={onClick}
  >
    {
      (label && labelPosition === 'left') &&
      <span css={{ ...(!alwaysVisibleLabel && tw`hidden sm:inline-block`) }}>{label}</span>
    }
    <Icon icon={icon} fontSize={iconSize} style={{ flexGrow: 0, flexShrink: 0 }} />
    {
      (label && labelPosition === 'right') &&
      <span css={{ ...(!alwaysVisibleLabel && tw`hidden sm:inline-block`) }}>{label}</span>
    }
  </button>
)
