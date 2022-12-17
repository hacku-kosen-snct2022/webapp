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
export const LicensePage: React.FC = () => {
  const [, setLocation] = useLocation()

  const licenseList = [
    { lib: 'React', license: 'Reactのライセンス' },
    { lib: 'Tailwind', license: 'hoge' }
  ]

  return (
    <Layout title="ライセンス" direction={tw`flex-col`} justifyContent={tw`justify-start`}>
      <Navbar>
        <IconButton icon="mdi:chevron-left" label="戻る" onClick={() => setLocation('/topics')} />
      </Navbar>
      <Main
        direction={tw`flex-col`}
        justifyContent={tw`justify-start`}
        gap={tw`gap-4`}
        customStyles={tw`px-4 max-w-screen-lg`}
      >
        {(
          <Timeline>
            {
              licenseList.map((license) => (
                <LicenseCard
                  key={license.lib}
                  license={license}
                />
              ))
            }
          </Timeline>

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
