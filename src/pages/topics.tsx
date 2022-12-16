import { Icon, InlineIcon } from '@iconify/react'
import { useStore } from '@nanostores/preact'
import React, { createRef, useState } from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter'
import {
  Carousel,
  Dialog,
  IconButton,
  Layout,
  Main,
  Navbar,
  SimpleCard,
  SinglelineText,
  Spacer,
  TextButton,
  TopicCard
} from '../components'
import { appUserStore, topicsStore } from '../store'

// eslint-disable-next-line max-lines-per-function
export const TopicsPage: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<string | null>()
  const [isCreateTopicDialogOpen, setIsCreateTopicDialogOpen] = useState(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const inputReference = createRef<HTMLInputElement>()
  const [, setLocation] = useLocation()
  const appUser = useStore(appUserStore)
  const topics = useStore(topicsStore)

  return (
    <Layout title="トピック" direction={tw`flex-col`}>
      <Navbar>
        <Spacer />
        <IconButton
          icon="mdi:book-plus"
          label="作成"
          onClick={() => setIsCreateTopicDialogOpen(true)}
        />
        <IconButton
          icon="mdi:logout"
          label="ログアウト"
          labelPosition="left"
          onClick={() => setIsLogoutDialogOpen(true)}
        />
      </Navbar>
      <Main direction={tw`flex-col`} justifyContent={tw`justify-start`} customStyles={tw`min-h-0 `}>
        <Carousel>
          {/* eslint-disable-next-line max-statements-per-line */}
          {
            topics.length > 0
              ? topics.map((topic) => (
                <TopicCard
                  key={topic}
                  topic={topic}
                  backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
                  onClick={() => setLocation(`/timeline/${topic}`)}
                  onChange={(inView) => inView && setCurrentTopic(topic)}
                />
              ))
              : (
                <SimpleCard
                  backgroundColor={tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`}
                  direction={tw`flex-col`}
                  aspectRatio={tw`aspect-[2/3]`}
                  customStyles={tw`snap-center cursor-pointer`}
                  onClick={() => setIsCreateTopicDialogOpen(true)}
                >
                  <Icon icon="mdi:book-plus" width="20%" />
                  <h1 tw="text-center">トピックの作成</h1>
                </SimpleCard>
              )
          }
        </Carousel>
        <h2 tw="flex items-center justify-center gap-2 text-neutral-600">
          <InlineIcon icon="mdi:gesture-tap" fontSize={'2.0rem'} />左右にスクロールできます
        </h2>
        {
          currentTopic
            ? <IconButton
              icon="mdi:edit"
              label="開く"
              onClick={() => setLocation(`/timeline/${currentTopic}`)}
              customStyles={tw`visible lg:invisible`}
              alwaysVisibleLabel
            />
            : <IconButton
              icon="mdi:book-plus"
              label="作成"
              onClick={() => setIsCreateTopicDialogOpen(true)}
              customStyles={tw`visible md:invisible`}
              alwaysVisibleLabel
            />
        }
      </Main>
      <Dialog open={isCreateTopicDialogOpen}>
        <SimpleCard
          padding={tw`p-6`}
          direction={tw`flex-col`}
          alignItems={tw`items-start`}
        >
          <h1>トピックの作成</h1>
          <span>トピック名を入力してください</span>
          <SinglelineText ref={inputReference} placeholder="トピック名" />
          <div tw="flex w-full justify-end items-center gap-4">
            <TextButton
              label="作成"
              backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
              // eslint-disable-next-line unicorn/no-null
              onClick={async () => {
                const inputElement = inputReference.current
                if (inputElement && inputElement.value.length > 0 && appUser && !topics.includes(inputElement.value)) {
                  const topicName = inputElement.value
                  inputElement.value = ''
                  await appUser.addTopic(topicName)
                  topicsStore.set(appUser.topics)
                  setIsCreateTopicDialogOpen(false)
                }
              }}
            />
            <TextButton
              label="キャンセル"
              backgroundColor={tw`bg-rose-500 hover:bg-rose-600 active:bg-rose-700`}
              onClick={() => {
                if (inputReference.current) {
                  inputReference.current.value = ''
                }
                setIsCreateTopicDialogOpen(false)
              }}
            />
          </div>
        </SimpleCard>
      </Dialog>
      <Dialog open={isLogoutDialogOpen}>
        <SimpleCard
          padding={tw`p-6`}
          direction={tw`flex-col`}
          alignItems={tw`items-start`}
        >
          <h1>ログアウト</h1>
          <span>ログアウトしてもよろしいでしょうか?</span>
          <div tw="flex w-full justify-end items-center gap-4">
            <TextButton
              label="はい"
              backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
              // eslint-disable-next-line unicorn/no-null
              onClick={() => appUser?.logout().then(() => appUserStore.set(null))}
            />
            <TextButton
              label="いいえ"
              backgroundColor={tw`bg-rose-500 hover:bg-rose-600 active:bg-rose-700`}
              onClick={() => setIsLogoutDialogOpen(false)}
            />
          </div>
        </SimpleCard>
      </Dialog>
    </Layout>
  )
}
