import React from 'react'
import tw from 'twin.macro'

type TimelineProperties = {
  children?: React.ReactNode
}

export const Timeline: React.FC<TimelineProperties> = ({
  children
}) => (
  <div
    css={{
      ...tw`flex flex-col w-full h-auto justify-start items-center pb-4 gap-4`
    }}
  >
    {children}
  </div>
)
