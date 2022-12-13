// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getDoc, doc } from 'firebase/firestore'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { db as database, auth } from '../firebase'

export class unitpost {
  isInspiration = false
  memo = ''
  weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy' = 'sunny'
  placeName = ''
  place: { lat: number; lng: number } = { lat: 0, lng: 0 }
  unitid: number | null = null
  postid: number | null = null

  constructor (
    isInspiration: boolean,
    memo: string,
    weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy',
    placeName: string,
    place: { lat: number; lng: number },
    unitid: number | null,
    postid: number | null
  ) {
    this.isInspiration = isInspiration
    this.memo = memo
    this.weather = weather
    this.placeName = placeName
    this.place = place
    this.unitid = postid
  }

  toJson () {
    return {
      isInspiration: this.isInspiration,
      memo: this.memo,
      place: [this.place.lat, this.place.lng],
      placeName: this.placeName,
      postid: this.postid,
      unitid: this.unitid,
      weather: this.weather
    }
  }
}
