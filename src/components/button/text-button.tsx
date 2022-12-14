import React from 'react'
import tw from 'twin.macro'
import { BaseButtonProperties } from './'

type TextButtonProperties = BaseButtonProperties & {
  label: string
}

export const TextButton: React.FC<TextButtonProperties> = ({
  label,
  padding = tw`p-4`,
  color = tw`text-black`,
  backgroundColor = tw`bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500`,
  shadow = tw`shadow shadow-neutral-300`,
  onClick
}) => (
  <button
    css={{
      ...padding,
      ...color,
      ...backgroundColor,
      ...shadow,
      ...tw`rounded-xl`
    }}
    onClick={onClick}
  >
    {label}
  </button>
)
