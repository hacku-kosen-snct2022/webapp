import { db } from "../firebase";
import { getDoc, doc, collection, setDoc, getDocs } from "firebase/firestore";
import { auth } from "../firebase";
import { unitpost } from "./post";

export class timeLine {
  topicName: string = "";
  numPosts: number = 0;
  #uid = auth.currentUser?.uid;
  constructor(topicName: string, numPosts: number) {
    this.topicName = topicName;
    this.numPosts = numPosts;
  }

  getDocRef() {
    if (this.#uid === null) return;
    return doc(db, this.#uid!, "topics", this.topicName, "timeLine");
  }

  async saveInfo() {
    const docRef = this.getDocRef();
    if (docRef === undefined) return;
    setDoc(docRef, {
      topicName: this.topicName,
      numPosts: this.numPosts,
    })
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
  }
}
