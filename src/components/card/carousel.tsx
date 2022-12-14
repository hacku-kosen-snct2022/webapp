import React from 'react'
import tw from 'twin.macro'

type CarouselProperties = {
  children?: React.ReactNode,
  ref?: React.Ref<never>
}

export const Carousel: React.FC<CarouselProperties> = ({ children, ref }) => (
  <div
    tw="flex w-full h-full p-16 gap-8 sm:gap-16 md:gap-32 lg:gap-64 xl:gap-96 overflow-x-auto snap-x snap-mandatory"
    ref={ref}
  >
    <div tw="aspect-[1/3] lg:aspect-square h-full" />
    {children}
    <div tw="aspect-[1/3] lg:aspect-square h-full" />
  </div>
)
