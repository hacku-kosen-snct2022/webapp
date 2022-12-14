import { TwStyle } from 'twin.macro'
import { SimpleCard } from './simple-card'
import { TimelineCard } from './timeline-card'
import { TopicCard } from './topic-card'

export type BaseCardProperties = {
  padding?: TwStyle,
  backgroundColor?: TwStyle,
  rounded?: TwStyle,
  shadow?: TwStyle
}

export type Card = typeof SimpleCard | typeof TimelineCard | typeof TopicCard

export * from './carousel'
export * from './timeline'
export * from './simple-card'
export * from './timeline-card'
export * from './topic-card'
