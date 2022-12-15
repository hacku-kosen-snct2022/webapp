import React from 'react'
import tw from 'twin.macro'
import { BaseButtonProperties } from './'

type TextButtonProperties = BaseButtonProperties & {
  label: string
}

export const TextButton: React.FC<TextButtonProperties> = ({
  label,
  padding = tw`px-4 py-2`,
  color = tw`text-black`,
  backgroundColor = tw`bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 disabled:bg-neutral-200`,
  shadow = tw`shadow shadow-neutral-300`,
  onClick,
  disabled
}) => (
  <button
    css={{
      ...padding,
      ...color,
      ...backgroundColor,
      ...shadow,
      ...tw`rounded-xl duration-300`
    }}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
)
