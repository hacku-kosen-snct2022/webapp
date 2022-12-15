import { db } from "../firebase";
import { getDoc, doc, collection, setDoc, getDocs, DocumentData } from "firebase/firestore";
import { auth } from "../firebase";
import { unitpost } from "./post";

export class timeLine {
  topicName: string = "";
  numPosts: number = 0;
  postsId: string[] = [];
  #uid = auth.currentUser?.uid;
  constructor(topicName: string, numPosts: number) {
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
      return new timeLine(data.topicName, data.numPosts);
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
    const posts = datas.map((data) => new unitpost(false, data.memo, data.weather, data.placeName, { lat: data.lat, lng: data.lng }, data.unitid, data.postid));
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
        return new unitpost(false, data.memo, data.weather, data.placeName, { lat: data.lat, lng: data.lng }, data.unitid, data.postid);
      }
      else {
        return;
      }
    });
    const posts = (await Promise.all(datas)).filter(nonNullable);
    return posts;
  }

  static postsDateFilter(posts: unitpost[], beginDate: Date, endDate: Date) {
    return posts.filter((post) => {
      const postDate = new Date(post.year, post.month, post.day, post.hour, post.minute, post.second)
      return postDate >= beginDate && postDate <= endDate;
    });
  }

  async post(post: unitpost, isReWirte: boolean = false) {
    const docRef = this.getDocRef();
    if (docRef === undefined) return;
    if (isReWirte) {
      const colRef = doc(docRef, (post.postid ?? this.numPosts).toString(), (post.unitid ?? 0).toString());
      setDoc(colRef, post.toJson());
    } else {
      const colRef = collection(docRef, this.numPosts.toString());
      const docs = await getDocs(colRef);
      const unitid = docs.size;
      const postRef = doc(colRef, unitid.toString());
      setDoc(postRef, post.toJson());
    }
    this.postsId.push(post.postid?.toString() ?? this.numPosts.toString());
  }

  async deletePost(postid: number) {
    this.postsId = this.postsId.filter((id) => id !== postid.toString());
    this.saveInfo();
  }
}
