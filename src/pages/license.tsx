/* eslint-disable max-lines-per-function */
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
import { License, LicenseCard } from '../components/card/license-card'
import { appUserStore } from '../store'
import { AppUser, convertWeather, timeLine, unitpost as UnitPost } from '../util'

// eslint-disable-next-line max-lines-per-function,max-statements,sonarjs/cognitive-complexity

interface LinkProperties{
  href: string;
  children: React.ReactNode;
}

const Link = (properties: LinkProperties) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a {...properties} tw="text-blue-400 underline">{properties.children}</a>
)

export const LicensePage: React.FC = () => {
  const [, setLocation] = useLocation()

  const licenseList = [
    {
      lib: 'MeCab',
      license: (<span><Link href="https://www.gnu.org/licenses/gpl-3.0.txt">GPL</Link>
        (the GNU General Public License),
        <Link href="https://www.gnu.org/licenses/lgpl-3.0.txt">LGPL</Link>
        (Lesser GNU General Public License), BSD</span>)
    },
    {
      lib: 'Wordcloud',
      license: (
        <span>
          MIT
        </span>
      )
    },
    {
      lib: 'NetworkX',
      license: (
        <span>
          <Link href="https://github.com/networkx/networkx/blob/main/LICENSE.txt">BSD</Link>
        </span>
      )
    },
    {
      lib: 'PREACT.JS',
      license: (
        <span>
          <Link href="https://github.com/preactjs/preact/blob/master/LICENSE">MIT</Link>
        </span>
      )
    },
    {
      lib: 'React.js',
      license: (
        <span>
          <Link href="https://github.com/facebook/react/blob/main/LICENSE">MIT</Link>
        </span>
      )
    },
    {
      lib: 'tailwindcss',
      license: (
        <span>
          <Link href="https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE">MIT</Link>
        </span>
      )
    },
    {
      lib: 'iconify',
      license: (
        <span>
          <Link href="https://github.com/iconify/iconify/blob/main/license.txt">MIT</Link>
        </span>
      )
    },
    {
      License: (
        <span>出典:<Link href="https://nlftp.mlit.go.jp/">「位置参照情報」(国土交通省)</Link>
          の加工情報・
          <Link href="https://geoapi.heartrails.com/">「HeartRails Geo API」(HeartRails Inc.)</Link>
        </span>
      ),
      lib: ''
    }
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
        )}
      </Main>
    </Layout>
  )
}

/* eslint-enable max-lines,unicorn/no-null */
