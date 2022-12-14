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
  <nav
    css={{
      ...gap,
      ...justifyContent,
      ...alignItems,
      ...tw`fixed top-0 left-0 flex w-full h-20 p-4 backdrop-blur-sm`
    }}
  >
    {children}
  </nav>
)
