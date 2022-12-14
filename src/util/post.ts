export class unitpost {
  isInspiration: boolean = false;
  memo: string = "";
  weather: "sunny" | "cloudy" | "rainy" | "snowy" | null = null;
  placeName: string | null = null;
  place: { lat: number; lng: number } | null = null;
  unitid: number | null = null;
  postid: number | null = null;

  constructor(
    isInspiration: boolean = false,
    memo: string,
    weather: "sunny" | "cloudy" | "rainy" | "snowy" | null = null,
    placeName: string | null = null,
    place: { lat: number; lng: number } | null = null,
    unitid: number | null = null,
    postid: number | null = null
  ) {
    this.isInspiration = isInspiration;
    this.memo = memo;
    this.weather = weather;
    this.placeName = placeName;
    this.place = place;
    this.unitid = unitid;
    this.postid = postid;
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
    };
  }
}
