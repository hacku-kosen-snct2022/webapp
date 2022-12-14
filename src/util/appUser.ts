import { db } from "../firebase";
import { getDocs, doc, collection, CollectionReference, DocumentData, setDoc, getDoc } from "firebase/firestore";
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
    (async () => {
      const docRef = doc(this.getCollectionRef(), "userData");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data) {
          this.topics = data.topics;
        }
      }
    })
  }

  getCollectionRef() {
    return this.dbRef ?? collection(db, this.uid);
  }

  toJson() {
    return {
      uid: this.uid,
      name: this.name,
      email: this.email,
      topics: this.topics
    }
  }

  async saveUserData() {
    const docRef = doc(this.getCollectionRef(), "userData");
    await setDoc(docRef, this.toJson());
  }

  static async login() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    if (!credential) return;
    const token = credential.accessToken;
    return userCredential.user;
  }

  async logout() {
    await auth.signOut();
  }

  addTopic(topicName: string) {
    this.topics.push(topicName);
    this.saveUserData();
  }

  async post(topicName: string, post: unitpost, isReWirte: boolean = false) {
    const tl = await timeLine.getTimeLine(topicName);
    if (tl === undefined) return;
    await tl.post(post, isReWirte);
  }
}

export default AppUser;
