import React, { forwardRef } from 'react'
import tw from 'twin.macro'
import { BaseTextProperties } from './'

type SinglelineTextProperties = BaseTextProperties

const SinglelineText =
  forwardRef<HTMLInputElement, SinglelineTextProperties>(({ placeholder }, reference) => (
    <input
      ref={reference}
      type="text"
      css={{ ...tw`w-full h-12 p-4 shadow rounded-lg` }}
      placeholder={placeholder}
    />
  ))

SinglelineText.displayName = 'SinglelineText'

export {
  SinglelineText
}
