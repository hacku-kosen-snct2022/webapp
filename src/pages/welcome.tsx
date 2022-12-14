import React from 'react'
import tw from 'twin.macro'
import { IconButton, Layout, Main, SimpleCard } from '../components'
import { appUserStore } from '../store'
import { AppUser } from '../util'

export const WelcomePage: React.FC = () => (
  <Layout title="アプリ名へようこそ!" direction={tw`flex-col`}>
    <Main direction={tw`flex-col`}>
      <h1>アプリ名</h1>
      <SimpleCard>
        <span>アプリのアイコンと概要</span>
      </SimpleCard>
      <IconButton
        icon="mdi:login"
        label="ログイン"
        onClick={() => AppUser.login().then((user) => user && appUserStore.set(new AppUser(user)))}
        backgroundColor={tw`bg-blue-300 hover:bg-blue-400 active:bg-blue-500`}
        shadow={tw`shadow shadow-blue-300`}
        alwaysVisibleLabel
      />
    </Main>
  </Layout>
)
