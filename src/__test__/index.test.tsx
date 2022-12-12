import { render, screen } from '@testing-library/preact'
import React from 'react'
import { describe, expect, it } from 'vitest'
import { App } from '../components'

describe('Rendering', () => {
  it('App', () => {
    render(<App />)
    expect(screen).toMatchSnapshot()
  })
})
