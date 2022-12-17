export class unitpost {
  isInspiration = false
  memo = ''
  weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | null = null
  placeName: string | null = null
  place: { lat: number; lng: number } | null = null
  unitid: number | null = null
  postid: number | null = null
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number

  constructor(
    isInspiration = false,
    memo: string,
    options: {
      weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | null,
      placeName: string | null,
      place: { lat: number; lng: number } | null,
      unitid: number | null,
      postid: number | null,
      year: number | null,
      month: number | null,
      day: number | null,
      hour: number | null,
      minute: number | null,
      second: number | null
    } = { day: null, hour: null, minute: null, month: null, place: null, placeName: null, postid: null, second: null, unitid: null, weather: null, year: null }
  ) {
    this.isInspiration = isInspiration
    this.memo = memo
    this.weather = options.weather
    this.placeName = options.placeName
    this.place = options.place ?? null
    this.unitid = options.unitid
    this.postid = options.postid
    const date = new Date()
    this.year = options.year ?? date.getFullYear()
    this.month = options.month ?? date.getMonth() + 1
    this.day = options.day ?? date.getDate()
    this.hour = options.hour ?? date.getHours()
    this.minute = options.minute ?? date.getMinutes()
    this.second = options.second ?? date.getSeconds()
  }

  copy() {
    return new unitpost(this.isInspiration, this.memo, {
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      month: this.month,
      place: this.place,
      placeName: this.placeName,
      postid: this.postid,
      second: this.second,
      unitid: this.unitid,
      weather: this.weather,
      year: this.year
    })
  }

  async setPlace(position: GeolocationPosition) {
    this.place = { lat: position.coords.latitude, lng: position.coords.longitude }
    const url = `http://geoapi.heartrails.com/api/json?method=searchByGeoLocation&x=${this.place.lng}&y=${this.place.lat}`
    const res = await fetch(url, {
      mode: 'cors'
    })
    const data = await res.json()
    const pre = data.response.location[0].prefecture
    const { city } = data.response.location[0]
    this.placeName = pre + city
  }

  toJson() {
    return {
      day: this.day,
      hour: this.hour,
      isInspiration: this.isInspiration,
      lat: this.place?.lat ?? null,
      lng: this.place?.lng ?? null,
      memo: this.memo,
      minute: this.minute,
      month: this.month,
      placeName: this.placeName,
      postid: this.postid,
      second: this.second,
      unitid: this.unitid,
      weather: this.weather,
      year: this.year
    }
  }
}
