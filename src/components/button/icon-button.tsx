import { Icon } from '@iconify/react'
import React from 'react'
import tw, { TwStyle } from 'twin.macro'
import { BaseButtonProperties } from './'

type IconButtonProperties = BaseButtonProperties
  & {
    icon: string,
    iconSize?: string | number,
    loading?: boolean,
    customStyles?: TwStyle
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
  loading,
  color = tw`text-black`,
  padding = tw`p-4`,
  backgroundColor = tw`bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 disabled:bg-neutral-200`,
  shadow = tw`shadow shadow-neutral-300`,
  label,
  labelSize = tw`text-base`,
  labelPosition = 'right',
  alwaysVisibleLabel = false,
  width = tw`w-12`,
  height = tw`h-12`,
  customStyles,
  onClick,
  disabled
}) => (
  <button
    css={{
      ...(label && labelSize),
      ...(!label && width),
      ...height,
      ...((label && alwaysVisibleLabel) ? tw`aspect-auto` : tw`aspect-square sm:aspect-auto`),
      ...padding,
      ...backgroundColor,
      ...shadow,
      ...color,
      ...tw`flex justify-center items-center gap-2 rounded-xl duration-300 whitespace-nowrap`,
      ...customStyles
    }}
    onClick={onClick}
    disabled={disabled}
  >
    {
      (label && labelPosition === 'left') &&
      <span css={{ ...(!alwaysVisibleLabel && tw`hidden sm:inline-block`) }}>{label}</span>
    }
    <Icon
      icon={loading ? 'mdi:loading' : icon}
      fontSize={iconSize}
      style={{ flexGrow: 0, flexShrink: 0 }}
      css={{ ...(loading && tw`animate-spin`) }}
    />
    {
      (label && labelPosition === 'right') &&
      <span css={{ ...(!alwaysVisibleLabel && tw`hidden sm:inline-block`) }}>{label}</span>
    }
  </button>
)
