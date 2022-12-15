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
    weather: "sunny" | "cloudy" | "rainy" | "snowy" | null = null,
    placeName: string | null = null,
    place: { lat: number; lng: number } | null = null,
    unitid: number | null = null,
    postid: number | null = null,
    year: number | null = null,
    month: number | null = null,
    day: number | null = null,
    hour: number | null = null,
    minute: number | null = null,
    second: number | null = null
  ) {
    this.isInspiration = isInspiration;
    this.memo = memo;
    this.weather = weather;
    this.placeName = placeName;
    this.place = place;
    this.unitid = unitid;
    this.postid = postid;
    const date = new Date();
    this.year = year ?? date.getFullYear();
    this.month = month ?? date.getMonth() + 1;
    this.day = day ?? date.getDate();
    this.hour = hour ?? date.getHours();
    this.minute = minute ?? date.getMinutes();
    this.second = second ?? date.getSeconds();
  }

  copy() {
    return new unitpost(
      this.isInspiration,
      this.memo,
      this.weather,
      this.placeName,
      this.place,
      this.unitid,
      this.postid
    );
  }

  async setPlace() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      this.place = { lat: position.coords.latitude, lng: position.coords.longitude }
      const url = `	http://geoapi.heartrails.com/api/json?method=searchByGeoLocation&x=${this.place!.lng}&y=${this.place!.lat}`;
      const res = await fetch(url);
      const data = await res.json();
      const pre = data.response.location[0].prefecture;
      const city = data.response.location[0].city;
      this.placeName = pre + city;
    });
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
