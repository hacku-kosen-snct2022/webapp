export class unitpost {
  isInspiration: boolean = false;
  memo: string = "";
  weather: "sunny" | "cloudy" | "rainy" | "snowy" | null = null;
  placeName: string | null = null;
  place: { lat: number; lng: number } | null = null;
  unitid: number | null = null;
  postid: number | null = null;
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number

  constructor(
    isInspiration: boolean = false,
    memo: string,
    options: {
      weather: "sunny" | "cloudy" | "rainy" | "snowy" | null,
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
    } = { weather: null, placeName: null, place: null, unitid: null, postid: null, year: null, month: null, day: null, hour: null, minute: null, second: null }
  ) {
    this.isInspiration = isInspiration;
    this.memo = memo;
    this.weather = options.weather;
    this.placeName = options.placeName;
    this.place = options.place;
    this.unitid = options.unitid;
    this.postid = options.postid;
    const date = new Date();
    this.year = options.year ?? date.getFullYear();
    this.month = options.month ?? date.getMonth() + 1;
    this.day = options.day ?? date.getDate();
    this.hour = options.hour ?? date.getHours();
    this.minute = options.minute ?? date.getMinutes();
    this.second = options.second ?? date.getSeconds();
  }

  copy() {
    return new unitpost(this.isInspiration, this.memo, {
      weather: this.weather,
      placeName: this.placeName,
      place: this.place,
      unitid: this.unitid,
      postid: this.postid,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second
    });
  }

  async setPlace() {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    this.place = { lat: position.coords.latitude, lng: position.coords.longitude }
    const url = `http://geoapi.heartrails.com/api/json?method=searchByGeoLocation&x=${this.place!.lng}&y=${this.place!.lat}`;
    const res = await fetch(url);
    const data = await res.json();
    const pre = data.response.location[0].prefecture;
    const city = data.response.location[0].city;
    this.placeName = pre + city;
  }

  toJson() {
    return {
      "isInspiration": this.isInspiration,
      "memo": this.memo,
      "weather": this.weather,
      "placeName": this.placeName,
      "lat": this.place?.lat,
      "lng": this.place?.lng,
      "unitid": this.unitid,
      "postid": this.postid,
      "year": this.year,
      "month": this.month,
      "day": this.day,
      "hour": this.hour,
      "minute": this.minute,
      "second": this.second
    };
  }
}
