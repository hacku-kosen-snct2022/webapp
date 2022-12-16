import React, { createRef, useState } from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter'
import {
  Dialog,
  IconButton,
  Layout,
  Main,
  MultilineText,
  Navbar,
  SimpleCard,
  Spacer,
  TextButton,
  Timeline,
  TimelineCard
} from '../components'
import { useForceUpdate } from '../hooks'
import { convertWeather, unitpost as UnitPost } from '../util'

const posts = [
  new UnitPost(false, 'うんこ'),
  new UnitPost(true, 'うんこ'),
  new UnitPost(false, 'うんこ')
]

// eslint-disable-next-line max-lines-per-function
export const TimelinePage: React.FC = () => {
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [isInspiration, setIsInspiration] = useState(false)
  const [isWeatherDialogOpen, setIsWeatherDialogOpen] = useState(false)
  const [unitPost, setUnitPost] = useState<UnitPost>(new UnitPost(false, ''))
  const forceUpdate = useForceUpdate()
  const textareaReference = createRef<HTMLTextAreaElement>()
  const [, setLocation] = useLocation()

  return (
    <Layout title="タイムライン" direction={tw`flex-col`} justifyContent={tw`justify-start`}>
      <Navbar>
        <IconButton icon="mdi:chevron-left" label="戻る" onClick={() => setLocation('/topics')} />
        <Spacer />
        <IconButton
          icon="mdi:pencil"
          label="記録"
          onClick={() => {
            if (isPostMenuOpen) {
              setIsInspiration(false)
              setUnitPost(new UnitPost(false, ''))
              setIsPostMenuOpen(false)
            } else {
              setIsPostMenuOpen(true)
              setIsFilterMenuOpen(false)
              window.scrollTo({ behavior: 'smooth', top: 0 })
            }
          }}
        />
        <IconButton
          icon="mdi:filter"
          label="フィルター"
          onClick={() => {
            if (isFilterMenuOpen) {
              setIsFilterMenuOpen(false)
            } else {
              setIsFilterMenuOpen(true)
              setIsPostMenuOpen(false)
              window.scrollTo({ behavior: 'smooth', top: 0 })
            }
          }}
        />
      </Navbar>
      <Main
        direction={tw`flex-col`}
        justifyContent={tw`justify-start`}
        gap={tw`gap-0`}
        customStyles={tw`px-4 max-w-screen-lg`}
      >
        <SimpleCard
          margin={isPostMenuOpen ? tw`mb-4` : tw`mb-0`}
          padding={tw`p-4`}
          backgroundColor={tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`}
          direction={tw`flex-col`}
          alignItems={tw`items-start`}
          customStyles={{ ...(isPostMenuOpen ? tw`h-auto py-4` : tw`h-0 py-0`), ...tw`w-full px-4 overflow-hidden` }}
        >
          <h1>記録</h1>
          <span>記録を入力してください</span>
          <div tw="flex w-full gap-4 flex-wrap">
            <IconButton
              icon={isInspiration ? 'mdi:lightbulb' : 'mdi:note'}
              label={`${isInspiration ? 'ひらめき' : 'メモ'}として記録する`}
              backgroundColor={
                isInspiration
                  ? tw`bg-amber-500 hover:bg-amber-600 active:bg-amber-700`
                  : tw`bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600`
              }
              onClick={() => setIsInspiration(!isInspiration)}
              alwaysVisibleLabel
            />
            <IconButton
              icon={`mdi:weather-${unitPost.weather ?? 'sunny'}`}
              label={convertWeather(unitPost.weather) ?? '天気を追加'}
              backgroundColor={tw`bg-sky-500 hover:bg-sky-600 active:bg-sky-700`}
              onClick={() => setIsWeatherDialogOpen(true)}
              alwaysVisibleLabel
            />
            <IconButton
              icon="mdi:map-marker"
              label={unitPost.placeName ?? '場所を設定'}
              backgroundColor={tw`bg-green-500 hover:bg-green-600 active:bg-green-700`}
              onClick={async () => {
                await unitPost.setPlace()
                forceUpdate()
              }}
              alwaysVisibleLabel
            />
          </div>
          <MultilineText ref={textareaReference} placeholder="メモ" />
          <div css={tw`flex w-full justify-end items-center gap-4`}>
            <TextButton
              label="記録"
              backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
              onClick={() => {
                if (textareaReference.current && textareaReference.current.value.length > 0) {
                  unitPost.memo = textareaReference.current.value
                  // eslint-disable-next-line no-console
                  console.log(unitPost)
                  textareaReference.current.value = ''
                  setIsInspiration(false)
                  setUnitPost(new UnitPost(false, ''))
                  setIsPostMenuOpen(false)
                }
              }}
            />
            <TextButton
              label="キャンセル"
              backgroundColor={tw`bg-rose-500 hover:bg-rose-600 active:bg-rose-700`}
              onClick={() => {
                if (textareaReference.current) {
                  // eslint-disable-next-line no-console
                  textareaReference.current.value = ''
                }
                setIsInspiration(false)
                setUnitPost(new UnitPost(false, ''))
                setIsPostMenuOpen(false)
              }}
            />
          </div>
        </SimpleCard>
        <SimpleCard
          margin={isFilterMenuOpen ? tw`mb-4` : tw`mb-0`}
          padding={tw`p-4`}
          backgroundColor={tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`}
          direction={tw`flex-col`}
          alignItems={tw`items-start`}
          customStyles={{ ...(isFilterMenuOpen ? tw`h-auto py-4` : tw`h-0 py-0`), ...tw`w-full px-4 overflow-hidden` }}
        >
          <h1>フィルター</h1>
          <div css={tw`flex w-full justify-end items-center gap-4`}>
            <TextButton
              label="適用"
              backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
              onClick={() => setIsFilterMenuOpen(false)}
            />
            <TextButton
              label="キャンセル"
              backgroundColor={tw`bg-rose-500 hover:bg-rose-600 active:bg-rose-700`}
              onClick={() => setIsFilterMenuOpen(false)}
            />
          </div>
        </SimpleCard>
        <Timeline>
          {
            posts.map((post) => (
              <TimelineCard key={post.unitid} unitPost={post} />
            ))
          }
        </Timeline>
      </Main>
      <Dialog open={isWeatherDialogOpen}>
        <SimpleCard
          padding={tw`p-6`}
          direction={tw`flex-col`}
          alignItems={tw`items-start`}
          customStyles={tw`grow shrink`}
        >
          <h1>天気</h1>
          <span>天気を選択してください</span>
          <div tw="flex gap-4 flex-wrap">
            <IconButton
              icon="mdi:weather-sunny"
              label="晴れ"
              onClick={() => {
                unitPost.weather = 'sunny'
                setIsWeatherDialogOpen(false)
              }}
              alwaysVisibleLabel
            />
            <IconButton
              icon="mdi:weather-cloudy"
              label="曇り"
              onClick={() => {
                unitPost.weather = 'cloudy'
                setIsWeatherDialogOpen(false)
              }}
              alwaysVisibleLabel
            />
            <IconButton
              icon="mdi:weather-rainy"
              label="雨"
              onClick={() => {
                unitPost.weather = 'rainy'
                setIsWeatherDialogOpen(false)
              }}
              alwaysVisibleLabel
            />
            <IconButton
              icon="mdi:weather-snowy"
              label="雪"
              onClick={() => {
                unitPost.weather = 'snowy'
                setIsWeatherDialogOpen(false)
              }}
              alwaysVisibleLabel
            />
          </div>
          <div tw="flex w-full justify-end items-center gap-4">
            <TextButton
              label="決定"
              backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
              // eslint-disable-next-line unicorn/no-null
              onClick={() => {
                setIsWeatherDialogOpen(false)
              }}
            />
            <TextButton
              label="キャンセル"
              backgroundColor={tw`bg-rose-500 hover:bg-rose-600 active:bg-rose-700`}
              onClick={() => {
                setIsWeatherDialogOpen(false)
              }}
            />
          </div>
        </SimpleCard>
      </Dialog>
    </Layout>
  )
}
