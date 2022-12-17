/* eslint-disable max-lines,unicorn/no-null */

import { Icon } from '@iconify/react'
import { useStore } from '@nanostores/preact'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { createRef, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter'
import {
  Dialog, IconButton, Layout, Main, MultilineText, Navbar, SimpleCard,
  SinglelineText, Spacer, Spinner, TextButton, Timeline, TimelineCard
} from '../components'
import { appUserStore } from '../store'
import { AppUser, convertWeather, timeLine, unitpost as UnitPost } from '../util'

// eslint-disable-next-line max-lines-per-function,max-statements,sonarjs/cognitive-complexity
export const TimelinePage: React.FC = () => {
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [isWeatherDialogOpen, setIsWeatherDialogOpen] = useState(false)
  const [isPlaceLoading, setIsPlaceLoading] = useState(false)
  const [filterIsInspiration, setFilterIsInspiration] = useState<boolean | null>(null)
  const [filterBeginDate, setFilterBeginDate] = useState<Date | null>(null)
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null)
  const [unitPost, setUnitPost] = useState<UnitPost>(new UnitPost(false, ''))
  const textareaReference = createRef<HTMLTextAreaElement>()
  const [location, setLocation] = useLocation()
  const topicName = decodeURI(location.slice(Math.max(0, location.lastIndexOf('/') + 1)))
  const [posts, setPosts] = useState<UnitPost[]>([])
  const [isTimelineLoading, setIsTimelineLoading] = useState(true)
  const [isImagesDialogOpen, setIsImagesDialogOpen] = useState(false)
  const [images, setImages] = useState<{ wordcloud?: string, networkUrl?: string } | null>(null)
  const appUser = useStore(appUserStore)

  useEffect(() => {
    if (appUser) {
      // eslint-disable-next-line no-void
      void timeLine.getTimeLine(topicName).then(async (value) => {
        if (value) {
          const fetchedPosts = await value.getPosts()
          if (fetchedPosts) setPosts(fetchedPosts)
          const fetchedImages = await value.getImageUrls()
          if (fetchedImages) setImages(fetchedImages)
        }
        setIsTimelineLoading(false)
      })
    }
  }, [appUser, topicName])

  useEffect(() => {
    const documentReference = doc(AppUser.getCollectionRef(), 'topics', topicName, 'analytics')
    const unsubscribe = onSnapshot(documentReference, (document_) => {
      const data = document_.data()
      if (data) {
        setImages({ networkUrl: data.networkGraphUrl, wordcloud: data.wordcloudUrl })
      }
    })
    return () => { unsubscribe() }
  }, [])

  return (
    <Layout title="タイムライン" direction={tw`flex-col`} justifyContent={tw`justify-start`}>
      <Navbar>
        <IconButton icon="mdi:chevron-left" label="戻る" onClick={() => setLocation('/topics')} />
        <Spacer />
        <IconButton
          icon="mdi:lightbulb"
          label="ひらめき"
          backgroundColor={tw`bg-amber-500 hover:bg-amber-600 active:bg-amber-700`}
          onClick={() => {
            setUnitPost(new UnitPost(true, ''))
            if (!isPostMenuOpen) {
              setIsPostMenuOpen(true)
              setIsFilterMenuOpen(false)
              window.scrollTo({ behavior: 'smooth', top: 0 })
            }
          }}
        />
        <IconButton
          icon="mdi:note"
          label="メモ"
          backgroundColor={tw`bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600`}
          onClick={() => {
            setUnitPost(new UnitPost(false, ''))
            if (!isPostMenuOpen) {
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
              setUnitPost(new UnitPost(false, ''))
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
        gap={tw`gap-4`}
        customStyles={tw`px-4 max-w-screen-lg`}
      >
        <SimpleCard
          margin={isPostMenuOpen ? tw`mb-4` : tw`mb-0`}
          backgroundColor={tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`}
          direction={tw`flex-col`}
          alignItems={tw`items-start`}
          customStyles={{ ...(isPostMenuOpen ? tw`h-auto py-4` : tw`h-0 py-0`), ...tw`w-full px-4 overflow-hidden` }}
        >
          <h1>{unitPost.isInspiration ? 'ひらめき' : 'メモ'}</h1>
          <MultilineText ref={textareaReference} placeholder="メモ" />
          <div tw="flex w-full gap-4 flex-wrap">
            <IconButton
              icon={`mdi:weather-${unitPost.weather ?? 'sunny'}`}
              label={convertWeather(unitPost.weather) ?? '天気を設定'}
              backgroundColor={tw`bg-sky-500 hover:bg-sky-600 active:bg-sky-700`}
              onClick={() => {
                if (unitPost.weather) {
                  unitPost.weather = null
                } else {
                  setIsWeatherDialogOpen(true)
                }
              }}
              alwaysVisibleLabel
            />
            <IconButton
              icon="mdi:map-marker"
              label={unitPost.placeName ?? (isPlaceLoading ? '現在地を取得中...' : '場所を設定')}
              backgroundColor={tw`bg-green-500 hover:bg-green-600 active:bg-green-700`}
              onClick={async () => {
                if (unitPost?.placeName) {
                  unitPost.place = null
                  unitPost.placeName = null
                } else {
                  setIsPlaceLoading(true)
                  navigator.geolocation.getCurrentPosition((position) => {
                    unitPost.setPlace(position, location).then(() => setIsPlaceLoading(false));
                  });
                }
              }}
              loading={isPlaceLoading}
              alwaysVisibleLabel
            />
          </div>
          <div css={tw`flex w-full justify-end items-center gap-4`}>
            <TextButton
              label="記録"
              backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
              onClick={async () => {
                if (textareaReference.current && textareaReference.current.value.length > 0) {
                  unitPost.memo = textareaReference.current.value
                  textareaReference.current.value = ''
                  if (appUser) await appUser.post(topicName, unitPost)
                  setIsTimelineLoading(true)
                  await timeLine.getTimeLine(topicName).then(async (value) => {
                    if (value) {
                      const fetchedPosts = await value.getPosts()
                      if (fetchedPosts) {
                        setPosts(fetchedPosts)
                        setFilterIsInspiration(null)
                        setFilterBeginDate(null)
                        setFilterEndDate(null)
                      }
                    }
                  })
                  setIsTimelineLoading(false)
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
                setUnitPost(new UnitPost(false, ''))
                setIsPostMenuOpen(false)
              }}
            />
          </div>
        </SimpleCard>
        <SimpleCard
          margin={isFilterMenuOpen ? tw`mb-4` : tw`mb-0`}
          backgroundColor={tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`}
          direction={tw`flex-col`}
          alignItems={tw`items-start`}
          customStyles={{ ...(isFilterMenuOpen ? tw`h-auto py-4` : tw`h-0 py-0`), ...tw`w-full px-4 overflow-hidden` }}
        >
          <h1>フィルター</h1>
          <div tw="flex w-full gap-4 items-center flex-wrap">
            <span>種類:</span>
            <TextButton
              label={
                filterIsInspiration === true
                  ? 'ひらめきのみ'
                  : (
                    filterIsInspiration === false
                      ? 'メモのみ'
                      : 'ひらめきとメモ'
                  )
              }
              backgroundColor={tw`bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600`}
              onClick={() => (filterIsInspiration === true
                ? setFilterIsInspiration(false)
                : (
                  filterIsInspiration === false
                    ? setFilterIsInspiration(null)
                    : setFilterIsInspiration(true)
                ))}
            />
          </div>
          <div tw="flex w-full gap-4 items-center whitespace-nowrap">
            <span>日時:</span>
            <SinglelineText
              placeholder="開始日時（YYYY/MM/DD hh:mm）"
              onChange={(event) => event.target.value.length > 0 && setFilterBeginDate(new Date(event.target.value))}
            />
            <SinglelineText
              placeholder="終了日時（YYYY/MM/DD hh:mm）"
              onChange={(event) => event.target.value.length > 0 && setFilterEndDate(new Date(event.target.value))}
            />
          </div>
          <div css={tw`flex w-full justify-end items-center gap-4`}>
            <TextButton
              label="適用"
              backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
              // eslint-disable-next-line sonarjs/cognitive-complexity
              onClick={async () => {
                setIsTimelineLoading(true)
                await timeLine.getTimeLine(topicName).then(async (value) => {
                  if (value) {
                    const fetchedPosts = await value.getPosts()
                    if (fetchedPosts) {
                      setPosts(fetchedPosts.filter((post) => {
                        const date =
                          new Date(`${post.year}/${post.month}/${post.day} ${post.hour}:${post.minute}`)
                        if (filterIsInspiration === true && !post.isInspiration) return false
                        if (filterIsInspiration === false && post.isInspiration) return false
                        if (filterBeginDate && date < filterBeginDate) return false
                        if (filterEndDate && date > filterEndDate) return false
                        return true
                      }))
                    }
                  }
                  setIsTimelineLoading(false)
                })
                setIsFilterMenuOpen(false)
              }}
            />
            <TextButton
              label="キャンセル"
              backgroundColor={tw`bg-rose-500 hover:bg-rose-600 active:bg-rose-700`}
              onClick={() => {
                setIsFilterMenuOpen(false)
              }}
            />
          </div>
        </SimpleCard>
        <IconButton
          icon="mdi:image"
          label="ワードクラウド&ネットワーク"
          backgroundColor={tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`}
          onClick={() => {
            setIsImagesDialogOpen(!isImagesDialogOpen)
          }}
          alwaysVisibleLabel
        />
        {
          isTimelineLoading
            ? (
              <div tw="flex w-full h-full items-center justify-center">
                <Spinner />
              </div>
            )
            : (
              posts.length > 0
                ? (
                  <Timeline>
                    {
                      posts.map((post) => (
                        <TimelineCard
                          key={post.unitid}
                          unitPost={post}
                        />
                      ))
                    }
                  </Timeline>
                )
                : (
                  <div tw="flex w-full h-full items-center justify-center">
                    <SimpleCard direction={tw`flex-col`}>
                      <Icon icon="mdi:add" fontSize="5.0rem" />
                      <span tw="text-lg">投稿してみましょう</span>
                    </SimpleCard>
                  </div>
                )
            )
        }
      </Main>
      <Dialog open={isWeatherDialogOpen}>
        <SimpleCard
          direction={tw`flex-col`}
          alignItems={tw`items-start`}
          customStyles={tw`shrink`}
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
              label="キャンセル"
              backgroundColor={tw`bg-rose-500 hover:bg-rose-600 active:bg-rose-700`}
              onClick={() => {
                setIsWeatherDialogOpen(false)
              }}
            />
          </div>
        </SimpleCard>
      </Dialog>
      <Dialog open={isImagesDialogOpen}>
        <SimpleCard
          direction={tw`flex-col`}
          alignItems={tw`items-start`}
          customStyles={tw`shrink`}
        >
          {
            images === null
              ? (
                <div tw="flex w-full h-full items-center justify-center">
                  <Spinner />
                </div>
              )
              : (
                <>
                  {
                    images.wordcloud && (
                      <SimpleCard direction={tw`flex-col`} alignItems={tw`items-start`}>
                        <h1>ワードクラウド</h1>
                        <img src={images.wordcloud} alt="ワードクラウド" tw="flex w-full rounded-lg my-0" />
                      </SimpleCard>
                    )
                  }
                  {
                    images.networkUrl && (
                      <SimpleCard direction={tw`flex-col`} alignItems={tw`items-start`}>
                        <h1>ネットワーク</h1>
                        <img src={images.networkUrl} alt="ネットワーク" tw="flex w-full rounded-lg my-0" />
                      </SimpleCard>
                    )
                  }
                </>
              )
          }
          <div tw="flex w-full justify-end items-center gap-4">
            <TextButton
              label="閉じる"
              backgroundColor={tw`bg-rose-500 hover:bg-rose-600 active:bg-rose-700`}
              onClick={() => setIsImagesDialogOpen(false)}
            />
          </div>
        </SimpleCard>
      </Dialog>
    </Layout>
  )
}

/* eslint-enable max-lines,unicorn/no-null */
