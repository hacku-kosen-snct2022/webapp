import { useStore } from '@nanostores/preact'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter'
import { Carousel, IconButton, Layout, Main, Navbar, Spacer, TopicCard } from '../components'
import { appUserStore } from '../store'

const topics = ['トピック1', 'トピック2', 'トピック3']

export const TopicsPage: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState(topics[0])
  const [, setLocation] = useLocation()
  const appUser = useStore(appUserStore)

  return (
    <Layout title="トピック" direction={tw`flex-col`}>
      <Navbar>
        <Spacer />
        <IconButton
          icon="mdi:logout"
          label="ログアウト"
          labelPosition="left"
          // eslint-disable-next-line unicorn/no-null
          onClick={() => appUser?.logout().then(() => appUserStore.set(null))}
        />
      </Navbar>
      <Main direction={tw`flex-col`} justifyContent={tw`justify-start`} customStyles={tw`min-h-0 `}>
        <Carousel>
          {/* eslint-disable-next-line max-statements-per-line */}
          {
            topics.map((topic) => (
              <TopicCard
                key={topic}
                topic={topic}
                onClick={() => setLocation(`/timeline/${currentTopic}`)}
                onChange={(inView) => inView && setCurrentTopic(topic)}
              />
            ))
          }
        </Carousel>
        <IconButton
          icon="mdi:edit" label="開く"
          onClick={() => setLocation(`/timeline/${currentTopic}`)}
          alwaysVisibleLabel
        />
      </Main>
    </Layout>
  )
}
