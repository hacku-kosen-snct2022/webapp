import React from 'react'
import tw, { TwStyle } from 'twin.macro'

type NavbarProperties = {
  children?: React.ReactNode,
  gap?: TwStyle,
  justifyContent?: TwStyle,
  alignItems?: TwStyle
}

export const Navbar: React.FC<NavbarProperties> = ({
  children,
  gap = tw`gap-4`,
  justifyContent = tw`justify-center`,
  alignItems = tw`items-center`
}) => (
  <nav css={{ ...gap, ...justifyContent, ...alignItems, ...tw`flex w-full h-16 pt-4 px-4` }}>
    {children}
  </nav>
)
