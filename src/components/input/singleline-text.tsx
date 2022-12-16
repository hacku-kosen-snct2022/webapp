import React, { ChangeEventHandler, forwardRef } from 'react'
import tw from 'twin.macro'
import { BaseTextProperties } from './'

type SinglelineTextProperties = BaseTextProperties & {
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const SinglelineText =
  forwardRef<HTMLInputElement, SinglelineTextProperties>(({ placeholder, onChange }, reference) => (
    <input
      ref={reference}
      type="text"
      css={{ ...tw`w-full h-12 p-4 shadow rounded-lg` }}
      placeholder={placeholder}
      onChange={onChange}
    />
  ))

SinglelineText.displayName = 'SinglelineText'

export {
  SinglelineText
}
