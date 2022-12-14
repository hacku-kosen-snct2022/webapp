import React from 'react'
import tw from 'twin.macro'

type CarouselProperties = {
  children?: React.ReactNode,
  ref?: React.Ref<never>
}

export const Carousel: React.FC<CarouselProperties> = ({ children, ref }) => (
  <div
    // eslint-disable-next-line max-len
    tw="flex w-full h-full p-4 md:p-16 gap-8 sm:gap-24 md:gap-48 lg:gap-64 xl:gap-96 overflow-x-auto snap-x snap-mandatory"
    ref={ref}
  >
    <div tw="aspect-[7/16] lg:aspect-square h-full" />
    {children}
    <div tw="aspect-[7/16] lg:aspect-square h-full" />
  </div>
)
