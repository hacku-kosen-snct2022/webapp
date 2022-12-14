import React from 'react'
import tw, { TwStyle } from 'twin.macro'
import { BaseCardProperties } from './'

type SimpleCardProperties = BaseCardProperties & {
  children?: React.ReactNode,
  direction?: TwStyle,
  justifyContent?: TwStyle,
  alignItems?: TwStyle,
  aspectRatio?: TwStyle,
  customStyles?: TwStyle,
  onClick?: () => void | Promise<void>
}

export const SimpleCard: React.FC<SimpleCardProperties> = ({
  children,
  ref,
  margin,
  padding = tw`p-4`,
  backgroundColor = tw`bg-neutral-200`,
  rounded = tw`rounded-xl`,
  shadow = tw`shadow shadow-neutral-300`,
  direction = tw`flex-row`,
  justifyContent = tw`justify-center`,
  alignItems = tw`items-center`,
  aspectRatio = tw`aspect-auto`,
  customStyles,
  onClick
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div
    ref={ref}
    css={{
      ...margin,
      ...padding,
      ...backgroundColor,
      ...rounded,
      ...shadow,
      ...direction,
      ...justifyContent,
      ...alignItems,
      ...aspectRatio,
      ...tw`flex gap-4 duration-300 cursor-pointer`,
      ...customStyles
    }}
    onClick={onClick}
  >
    {children}
  </div>
)
