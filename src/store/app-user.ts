import { atom } from 'nanostores'
import { AppUser } from '../util'

// eslint-disable-next-line unicorn/no-null
export const appUserStore = atom<AppUser | null>(null)
