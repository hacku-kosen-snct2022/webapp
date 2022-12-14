import { css, Global } from '@emotion/react'
import React from 'react'
import { Helmet } from 'react-helmet'
import tw, { GlobalStyles } from 'twin.macro'
import { Route, Router } from 'wouter'
import { TimelinePage, TopicsPage, WelcomePage } from '../pages'

export const App: React.FC = () => (
  <div tw="w-full h-full flex justify-center items-center">
    <Helmet defaultTitle="アプリ名">
      <meta charSet="utf-8" />
    </Helmet>
    <Router>
      <Route path="/" component={WelcomePage} />
      <Route path="/topics" component={TopicsPage} />
      <Route path="/timeline/:id" component={TimelinePage} />
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
