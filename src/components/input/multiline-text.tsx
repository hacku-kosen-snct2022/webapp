import React, { forwardRef } from 'react'
import tw from 'twin.macro'
import { BaseTextProperties } from './'

type MultilineTextProperties = BaseTextProperties

const MultilineText =
  forwardRef<HTMLTextAreaElement, MultilineTextProperties>(({ placeholder }, reference) => (
    <textarea
      ref={reference}
      css={{ ...tw`w-full h-32 min-h-fit p-4 shadow rounded-lg resize-none grow-0 shrink-0` }}
      placeholder={placeholder}
    />
  ))

MultilineText.displayName = 'MultilineText'

export {
  MultilineText
}
