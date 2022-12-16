import React from 'react'
import tw from 'twin.macro'
import { convertWeather, unitpost as UnitPost } from '../../util'
import { IconButton } from '../button'
import { BaseCardProperties } from './'

type TimelineCardProperties = BaseCardProperties & {
  unitPost: UnitPost,
  onWordCloudClick: () => void | Promise<void>
}

// eslint-disable-next-line max-lines-per-function
export const TimelineCard: React.FC<TimelineCardProperties> = ({
  unitPost,
  padding = tw`p-4`,
  backgroundColor = tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`,
  rounded = tw`rounded-xl`,
  shadow = tw`shadow shadow-neutral-200`,
  onWordCloudClick
}) => (
  <article
    css={{
      ...padding,
      ...backgroundColor,
      ...rounded,
      ...shadow,
      ...tw`flex w-full flex-col justify-center items-start gap-4 cursor-pointer duration-300`
    }}
  >
    <div tw="flex w-full gap-4 items-center flex-wrap">
      <IconButton
        icon={unitPost.isInspiration ? 'mdi:lightbulb' : 'mdi:note'}
        backgroundColor={
          unitPost.isInspiration
            ? tw`bg-amber-500 hover:bg-amber-600 active:bg-amber-700`
            : tw`bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600`
        }
        customStyles={tw`rounded-full`}
      />
      <span tw="text-xl">{unitPost.memo}</span>
    </div>
    <div tw="flex w-full gap-4 flex-wrap">
      <IconButton
        icon="mdi:cloud"
        label="ワードクラウドを開く"
        backgroundColor={tw`bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300`}
        onClick={onWordCloudClick}
        alwaysVisibleLabel
      />
      <IconButton
        icon="mdi:clock"
        label={
          new Date(`${unitPost.year}/${unitPost.month}/${unitPost.day} ${unitPost.hour}:${unitPost.minute}`)
            .toLocaleString('ja-JP', { dateStyle: 'short', timeStyle: 'short' })
        }
        padding={tw`px-4 py-2`}
        iconSize="1.0rem"
        labelSize={tw`text-base`}
        backgroundColor={tw`bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600`}
        customStyles={tw`h-auto`}
        alwaysVisibleLabel
      />
      {
        unitPost.weather &&
        <IconButton
          icon={`mdi:weather-${unitPost.weather}`}
          label={convertWeather(unitPost.weather)!}
          padding={tw`px-4 py-2`}
          iconSize={'1.0rem'}
          labelSize={tw`text-base`}
          backgroundColor={tw`bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600`}
          customStyles={tw`h-auto`}
          alwaysVisibleLabel
        />
      }
      {
        unitPost.placeName &&
        <IconButton
          icon="mdi:map-marker"
          label={unitPost.placeName}
          padding={tw`px-4 py-2`}
          iconSize={'1.0rem'}
          labelSize={tw`text-base`}
          backgroundColor={tw`bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600`}
          customStyles={tw`h-auto`}
          alwaysVisibleLabel
        />
      }
    </div>
  </article>
)
