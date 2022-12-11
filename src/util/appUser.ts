import { db } from "../firebase";
import { getDocs, doc, collection, CollectionReference, DocumentData, setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

import { unitpost } from "./post";
import { timeLine } from "./timeLine";
export class AppUser {
  user?: User;
  uid = "";
  name = "";
  email = "";
  topics: string[] = [];
  dbRef: CollectionReference<DocumentData> | null = null;
  constructor(user: User) {
    this.uid = user.uid;
    this.name = user.displayName!;
    this.email = user.email!;
    this.dbRef = collection(db, this.uid);
  }

  getCollectionRef() {
    return this.dbRef ?? collection(db, this.uid);
  }

  static async login() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    if (!credential) return;
    const token = credential.accessToken;
    return userCredential.user;
  }

  addTopic(topicName: string) {
    this.topics.push(topicName);
  }

  async post(topicName: string, post: unitpost, isReWirte: boolean = false) {
    const tl = await timeLine.getTimeLine(topicName);
    if (tl === undefined) return;
    await tl.post(post, isReWirte);
  }
}

export default AppUser;