import React from 'react'
import tw, { TwStyle } from 'twin.macro'
import { BaseCardProperties } from './'

type SimpleCardProperties = BaseCardProperties & {
  children?: React.ReactNode,
  direction?: TwStyle,
  justifyContent?: TwStyle,
  alignItems?: TwStyle
}

export const SimpleCard: React.FC<SimpleCardProperties> = ({
  children,
  padding = tw`p-4`,
  backgroundColor = tw`bg-neutral-300`,
  rounded = tw`rounded-xl`,
  shadow = tw`shadow shadow-neutral-300`,
  direction = tw`flex-row`,
  justifyContent = tw`justify-center`,
  alignItems = tw`items-center`
}) => (
  <div
    css={{
      ...padding,
      ...backgroundColor,
      ...rounded,
      ...shadow,
      ...direction,
      ...justifyContent,
      ...alignItems,
      ...tw`flex gap-4`
    }}
  >
    {children}
  </div>
)
