import { css, Global } from '@emotion/react'
import { useStore } from '@nanostores/preact'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import tw, { GlobalStyles } from 'twin.macro'
import { Route, Router, useLocation } from 'wouter'
import { auth } from '../firebase'
import { LicensePage, TimelinePage, TopicsPage, WelcomePage } from '../pages'
import { appUserStore, topicsStore } from '../store'
import { AppUser } from '../util'

export const App: React.FC = () => {
  const appUser = useStore(appUserStore)
  const [location, setLocation] = useLocation()

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (appUser && location === '/') setLocation('/topics')
    else if (!appUser) {
      return auth.onAuthStateChanged((user) => {
        if (user) {
          const newAppUser = new AppUser(user)
          // eslint-disable-next-line no-void
          void newAppUser.init().then(() => {
            appUserStore.set(newAppUser)
            topicsStore.set(newAppUser.topics)
            if (location === '/') setLocation('/topics')
          })
        } else if (location !== '/license') {
          setLocation('/')
        }
      })
    }
  }, [appUser, location, setLocation])

  return (
    <div tw="w-full h-full flex justify-center items-center">
      <Helmet defaultTitle="アプリ名">
        <meta charSet="utf-8" />
      </Helmet>
      <Router>
        <Route path="/" component={WelcomePage} />
        <Route key="topics" path="/topics" component={TopicsPage} />
        <Route key="timeline" path="/timeline/:id" component={TimelinePage} />
        <Route key="license" path="/license" component={LicensePage} />
      </Router>
      <GlobalStyles />
      <Global styles={
        css({
          body: { ...tw`w-full h-full font-sans font-semibold bg-neutral-50` },
          html: { ...tw`w-full h-full font-sans font-semibold` }
        })
      } />
    </div>
  )
}
