import React from 'react'
import { Helmet } from 'react-helmet'
import tw, { TwStyle } from 'twin.macro'

type LayoutProperties = {
  children: React.ReactNode,
  title?: string,
  direction?: TwStyle,
  justifyContent?: TwStyle,
  alignItems?: TwStyle,
  gap?: TwStyle
}

export const Layout: React.FC<LayoutProperties> = ({
  children,
  title,
  direction = tw`flex-row`,
  justifyContent = tw`justify-center`,
  alignItems = tw`items-center`,
  gap = tw`gap-4`
}) => (
  <div
    css={{
      ...direction,
      ...justifyContent,
      ...alignItems,
      ...gap,
      ...tw`w-full h-full flex prose-sm prose-headings:m-0`
    }}
  >
    {title && <Helmet title={title} />}
    {children}
  </div>
)
