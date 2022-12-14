import React from 'react'
import tw from 'twin.macro'

type DialogProperties = {
  children?: React.ReactNode,
  open?: boolean
}

export const Dialog: React.FC<DialogProperties> = ({ children, open }) => (
  <dialog
    css={{
      ...(open ? tw`flex` : tw`hidden`),
      ...tw`fixed left-0 right-0 m-auto w-full h-full justify-center items-center bg-transparent open:bg-gray-600/80`
    }}
    open={open}
  >
    {children}
  </dialog>
)
