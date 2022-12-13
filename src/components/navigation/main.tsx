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
    css={{ ...direction, ...justifyContent, ...alignItems, ...gap, ...tw`flex w-full h-full py-4`, ...customStyles }}
  >
    {children}
  </main>
)
