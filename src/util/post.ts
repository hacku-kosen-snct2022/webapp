import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { auth } from "../firebase";

export class unitpost {
  isInspiration: boolean = false;
  memo: string = "";
  weather: "sunny" | "cloudy" | "rainy" | "snowy" = "sunny";
  placeName: string = "";
  place: { lat: number; lng: number } = { lat: 0, lng: 0 };
  unitid: number | null = null;
  postid: number | null = null;

  constructor(
    isInspiration: boolean = false,
    memo: string,
    weather: "sunny" | "cloudy" | "rainy" | "snowy" = "sunny",
    placeName: string = "",
    place: { lat: number; lng: number } = { lat: 0, lng: 0 },
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

  toJson() {
    return {
      "isInspiration": this.isInspiration,
      "memo": this.memo,
      "weather": this.weather,
      "placeName": this.placeName,
      "place": [this.place.lat, this.place.lng],
      "unitid": this.unitid,
      "postid": this.postid,
    };
  }
}
