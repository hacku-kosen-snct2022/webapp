import React, { ChangeEventHandler, forwardRef } from 'react'
import tw from 'twin.macro'
import { BaseTextProperties } from './'

type MultilineTextProperties = BaseTextProperties & {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
}

const MultilineText =
  forwardRef<HTMLTextAreaElement, MultilineTextProperties>(({ placeholder, onChange }, reference) => (
    <textarea
      ref={reference}
      css={{ ...tw`w-full h-32 min-h-fit p-4 shadow rounded-lg resize-none` }}
      placeholder={placeholder}
      onChange={onChange}
    />
  ))

MultilineText.displayName = 'MultilineText'

export {
  MultilineText
}
