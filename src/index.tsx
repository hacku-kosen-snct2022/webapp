import React from 'react'
import { render } from 'react-dom'
import { App } from './components'

render(<App />, document.body)

if (process.env.NODE_ENV === 'development') {
  // @ts-expect-error, unnecessary type definition
  import('preact/debug')
}
