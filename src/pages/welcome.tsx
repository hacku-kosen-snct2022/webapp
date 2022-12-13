import React from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter'
import { IconButton, Layout, Main, SimpleCard } from '../components'

export const WelcomePage: React.FC = () => {
  const [, setLocation] = useLocation()

  return (
    <Layout title="アプリ名へようこそ!" direction={tw`flex-col`}>
      <Main direction={tw`flex-col`}>
        <h1>アプリ名</h1>
        <SimpleCard>
          <span>アプリのアイコンと概要</span>
        </SimpleCard>
        <IconButton
          icon="mdi:login"
          label="ログイン"
          onClick={() => setLocation('/topics')}
          backgroundColor={tw`bg-blue-300 hover:bg-blue-400 active:bg-blue-500`}
          shadow={tw`shadow shadow-blue-300`}
          alwaysVisibleLabel
        />
      </Main>
    </Layout>
  )
}
