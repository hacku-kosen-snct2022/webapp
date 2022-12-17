import { db } from "../firebase";
import { getDoc, doc, collection, setDoc, getDocs, DocumentData } from "firebase/firestore";
import { auth } from "../firebase";
import { unitpost } from "./post";

export class timeLine {
  topicName: string = "";
  numPosts: number = 0;
  postsId: string[] = [];
  reWrite: string = "";
  #uid = auth.currentUser?.uid;
  constructor(topicName: string, numPosts: number = 0) {
    this.topicName = topicName;
    this.numPosts = numPosts;
  }

  getDocRef() {
    if (this.#uid === null) return;
    return doc(db, this.#uid!, "topics", this.topicName, "timeLine");
  }

  toJson() {
    return {
      "topicName": this.topicName,
      "numPosts": this.numPosts,
      "postsId": this.postsId,
      "reWrite": this.reWrite
    }
  }

  async saveInfo() {
    const docRef = this.getDocRef();
    if (docRef === undefined) return;
    setDoc(docRef, this.toJson());
  }

  static async getTimeLine(topicName: string) {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const docRef = doc(db, uid, "topics", topicName, "timeLine");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data === undefined) return;
      const tl = new timeLine(data.topicName, data.numPosts ?? 0);
      tl.postsId = data.postsId ?? [];
      tl.reWrite = data.reWrite ?? "";
      return tl;
    } else {
      return;
    }
  }

  async getPostEditHistory(postid: string) {
    const docRef = this.getDocRef();
    if (docRef === undefined) return [];
    const colRef = collection(docRef, postid);
    const docs = (await getDocs(colRef)).docs;
    const datas = docs.map((doc) => doc.data());
    const posts = datas.map((data) => new unitpost(false, data.memo, {
      weather: data.weather,
      placeName: data.placeName,
      place: data.place,
      unitid: data.unitid,
      postid: data.postid,
      year: data.year,
      month: data.month,
      day: data.day,
      hour: data.hour,
      minute: data.minute,
      second: data.second
    }));
    return posts;
  }

  async getPosts() {
    const docRef = this.getDocRef();
    if (docRef === undefined) return;
    const nonNullable = <T>(item: T | undefined): item is T => item !== null;
    const datas = this.postsId.map(async (postId) => {
      const colRef = collection(docRef, postId);
      const docs = (await getDocs(colRef)).docs;
      let data: DocumentData | null = null;
      for (let i = docs.length - 1; i >= 0; i--) {
        if (docs[i].data()) {
          data = docs[i].data();
          break;
        }
      }
      if (data !== null) {
        return new unitpost(data.isInspiration, data.memo, {
          weather: data.weather,
          placeName: data.placeName,
          place: data.place,
          unitid: data.unitid,
          postid: data.postid,
          year: data.year,
          month: data.month,
          day: data.day,
          hour: data.hour,
          minute: data.minute,
          second: data.second
        });
      }
      else {
        return;
      }
    });
    const posts = (await Promise.all(datas)).filter(nonNullable);
    return posts;
  }

  static postsFilter(posts: unitpost[], date: { beginDate: Date, endDate: Date } | null = null, isInspiration: boolean | null = null) {
    if (date === null && isInspiration === null) return posts;
    let filtered: unitpost[] = [];
    if (date !== null) {
      filtered = posts.filter((post) => {
        const postDate = new Date(post.year, post.month, post.day, post.hour, post.minute, post.second)
        return postDate >= date.beginDate && postDate <= date.endDate;
      });
    }
    if (isInspiration !== null) {
      filtered = posts.filter((post) => post.isInspiration === isInspiration);
    }
    return filtered;
  }

  async post(post: unitpost, isReWirte: boolean = false) {
    const docRef = this.getDocRef();
    if (docRef === undefined) return;
    if (isReWirte) {
      const colRef = doc(docRef, (post.postid ?? this.numPosts).toString(), (post.unitid ?? 0).toString());
      setDoc(colRef, post.toJson());
      this.rewriteFlag();
      return;
    } else {
      const colRef = collection(docRef, this.numPosts.toString());
      const docs = await getDocs(colRef);
      const unitid = docs.size;
      const postRef = doc(colRef, unitid.toString());
      setDoc(postRef, post.toJson());
    }
    this.postsId.push(post.postid?.toString() ?? this.numPosts.toString());
    this.numPosts++;
    await this.saveInfo();
  }

  async getImageUrls() {
    const docRef = doc(db, this.#uid!, "topics", this.topicName, "analytics");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data === undefined) return null;
    return { "wordcloud": data.wordcloudUrl as string, "networkUrl": data.networkGraphUrl as string }
  }

  rewriteFlag() {
    this.reWrite = (new Date()).toLocaleTimeString();
    this.saveInfo();
  }

  async deletePost(postid: number) {
    this.postsId = this.postsId.filter((id) => id !== postid.toString());
    this.saveInfo();
  }
}
