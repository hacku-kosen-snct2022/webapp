import React from 'react'
import { useInView } from 'react-intersection-observer'
import tw from 'twin.macro'
import { BaseCardProperties } from './'

type TopicCardProperties = BaseCardProperties & {
  topic?: string,
  onClick?: () => void,
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void
}

export const TopicCard: React.FC<TopicCardProperties> = ({
  topic,
  padding = tw`p-4`,
  backgroundColor = tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`,
  rounded = tw`rounded-xl`,
  shadow = tw`shadow shadow-neutral-200`,
  onClick,
  onChange
}) => {
  // eslint-disable-next-line no-alert
  const { ref } = useInView({ onChange, threshold: 1 })

  return (
    <div css={{ ...tw`snap-center shrink-0 flex` }}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        ref={ref}
        css={{
          ...padding,
          ...(topic ? backgroundColor : tw`bg-transparent`),
          ...rounded,
          ...(topic ? shadow : tw`shadow-none`),
          ...tw`flex h-full justify-center items-center gap-4 aspect-[2/3] cursor-pointer`
        }}
        onClick={onClick}
      >
        {topic}
      </div>
    </div>
  )
}