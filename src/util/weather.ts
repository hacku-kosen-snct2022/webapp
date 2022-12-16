import { unitpost as UnitPost } from './post'

export const convertWeather = (weather?: UnitPost['weather']) => {
  switch (weather) {
  case 'sunny':
    return '晴れ'
  case 'cloudy':
    return '曇り'
  case 'rainy':
    return '雨'
  case 'snowy':
    return '雪'
  default:
    // eslint-disable-next-line unicorn/no-null
    return null
  }
}
