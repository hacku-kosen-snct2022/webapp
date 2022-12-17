import React from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter'
import imageUrl from '../assets/logo.png'
import { IconButton, Layout, Main, SimpleCard, TextButton } from '../components'
import { appUserStore } from '../store'
import { AppUser } from '../util'

export const WelcomePage: React.FC = () => {
  const [, setLocation] = useLocation()

  return (
    <Layout title="Worduitousへようこそ!" direction={tw`flex-col`}>
      <Main direction={tw`flex-col`}>
        <h1>Worduitous</h1>
        <SimpleCard direction={tw`flex-col`} alignItems={tw`items-center`}>
          <img src={imageUrl as string} alt="Worduitous" tw="w-40 h-40 my-0" />
          <ul tw="my-0 list-disc">
            <li>日々の「！」を逃さずメモ</li>
            <li>積み重ねた「！」から新たな「！」を</li>
            <li>日時や場所、天気も使って、今後に活かす</li>
          </ul>
        </SimpleCard>
        <IconButton
          icon="mdi:login"
          label="ログイン"
          onClick={() => AppUser.login().then((user) => user && appUserStore.set(new AppUser(user)))}
          backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
          shadow={tw`shadow shadow-blue-300`}
          alwaysVisibleLabel
        />
        <TextButton
          label="ライセンス"
          onClick={() => setLocation('/license')}
          backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
          shadow={tw`shadow shadow-blue-300`}
        />
      </Main>
    </Layout>
  )
}
