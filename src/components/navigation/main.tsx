import React from 'react'
import tw, { TwStyle } from 'twin.macro'

type MainProperties = {
  children?: React.ReactNode,
  direction?: TwStyle,
  justifyContent?: TwStyle,
  alignItems?: TwStyle,
  gap?: TwStyle,
  customStyles?: TwStyle
}

export const Main: React.FC<MainProperties> = ({
  children,
  direction = tw`flex-row`,
  justifyContent = tw`justify-center`,
  alignItems = tw`items-center`,
  gap = tw`gap-8`,
  customStyles
}) => (
  <main
    css={{
      ...direction,
      ...justifyContent,
      ...alignItems,
      ...gap,
      ...customStyles,
      ...tw`flex w-full h-full pt-20 pb-4`
    }}
  >
    {children}
  </main>
)
