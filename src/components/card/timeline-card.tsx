import React from 'react'
import tw, { TwStyle } from 'twin.macro'
import { BaseCardProperties } from './'

type TimelineCardProperties = BaseCardProperties & {
  children?: React.ReactNode,
  direction?: TwStyle,
  justifyContent?: TwStyle,
  alignItems?: TwStyle
}

export const TimelineCard: React.FC<TimelineCardProperties> = ({
  children,
  padding = tw`p-4`,
  backgroundColor = tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`,
  rounded = tw`rounded-xl`,
  shadow = tw`shadow shadow-neutral-200`,
  direction = tw`flex-row`,
  justifyContent = tw`justify-center`,
  alignItems = tw`items-center`
}) => (
  <article
    css={{
      ...padding,
      ...backgroundColor,
      ...rounded,
      ...shadow,
      ...direction,
      ...justifyContent,
      ...alignItems,
      ...tw`flex w-full gap-4 cursor-pointer duration-300`
    }}
  >
    {children}
  </article>
)
