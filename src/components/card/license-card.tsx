import React from 'react'
import tw from 'twin.macro'
import { convertWeather, unitpost as UnitPost } from '../../util'
import { IconButton } from '../button'
import { BaseCardProperties } from './'

export interface License {
  lib: string,
  license: JSX.Element
}

type LicenseCardProperties = BaseCardProperties & {
  license: License
}

// eslint-disable-next-line max-lines-per-function
export const LicenseCard: React.FC<LicenseCardProperties> = ({
  license,
  padding = tw`p-4`,
  backgroundColor = tw`bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400`,
  rounded = tw`rounded-xl`,
  shadow = tw`shadow shadow-neutral-200`
}) => (
  <article
    css={{
      ...padding,
      ...backgroundColor,
      ...rounded,
      ...shadow,
      ...tw`flex w-full flex-col justify-center items-start gap-4 cursor-pointer duration-300`
    }}
  >
    <div tw="flex w-full gap-4 items-center flex-wrap">
      <span tw="text-xl">{license.lib}</span>
    </div>
    <div tw="flex w-full gap-4 flex-wrap">
      <span tw="text-xs">{license.license}</span>
    </div>
  </article>
)
