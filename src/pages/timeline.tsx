import React from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter'
import { IconButton, Layout, Main, Navbar, Spacer, Timeline, TimelineCard } from '../components'

export const TimelinePage: React.FC = () => {
  const [, setLocation] = useLocation()

  return (
    <Layout title="タイムライン" direction={tw`flex-col`} justifyContent={tw`justify-start`}>
      <Navbar>
        <IconButton icon="mdi:chevron-left" label="戻る" onClick={() => setLocation('/topics')} />
        <Spacer />
        <IconButton icon="mdi:pencil" label="記録" />
        <IconButton icon="mdi:filter" label="フィルター" />
      </Navbar>
      <Main>
        <Timeline>
          <TimelineCard />
          <TimelineCard />
          <TimelineCard />
        </Timeline>
      </Main>
    </Layout>
  )
}
