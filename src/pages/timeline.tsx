import React, { createRef, useState } from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter'
import {
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

const posts = ['記録1', '記録2', '記録3']

// eslint-disable-next-line max-lines-per-function
export const TimelinePage: React.FC = () => {
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
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
            setIsPostMenuOpen(true)
            setIsFilterMenuOpen(false)
            window.scrollTo({ behavior: 'smooth', top: 0 })
          }}
          disabled={isPostMenuOpen}
        />
        <IconButton
          icon="mdi:filter"
          label="フィルター"
          onClick={() => {
            setIsFilterMenuOpen(true)
            setIsPostMenuOpen(false)
            window.scrollTo({ behavior: 'smooth', top: 0 })
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
          <MultilineText ref={textareaReference} placeholder="メモ" />
          <div css={tw`flex w-full justify-end items-center gap-4`}>
            <TextButton
              label="記録"
              backgroundColor={tw`bg-lime-500 hover:bg-lime-600 active:bg-lime-700`}
              onClick={() => {
                if (textareaReference.current && textareaReference.current.value.length > 0) {
                  // eslint-disable-next-line no-console
                  console.log(textareaReference.current.value)
                  textareaReference.current.value = ''
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
              <TimelineCard key={post}>
                {post}
              </TimelineCard>
            ))
          }
        </Timeline>
      </Main>
    </Layout>
  )
}
