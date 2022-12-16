import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth'
import { getDocs, doc, collection, CollectionReference, DocumentData, setDoc, getDoc } from 'firebase/firestore'
import { db as database, auth } from '../firebase'

import { unitpost } from './post'
import { timeLine } from './timeLine'
export class AppUser {
  user?: User
  static uid = ''
  name = ''
  email = ''
  topics: string[] = []
  static dbRef: CollectionReference<DocumentData> | null = null
  constructor(user: User) {
    AppUser.uid = user.uid
    this.name = user.displayName!
    this.email = user.email!
    AppUser.dbRef = collection(database, AppUser.uid)
  }

  async init() {
    const documentReference = doc(AppUser.getCollectionRef(), 'userData')
    const documentSnap = await getDoc(documentReference)
    if (documentSnap.exists()) {
      const data = documentSnap.data()
      if (data) {
        this.topics = data.topics
      }
    }
  }

  static getCollectionRef() {
    return (AppUser.dbRef ??= collection(database, AppUser.uid))
  }

  toJson() {
    return {
      email: this.email,
      name: this.name,
      topics: this.topics,
      uid: AppUser.uid
    }
  }

  async saveUserData() {
    const documentReference = doc(AppUser.getCollectionRef(), 'userData')
    await setDoc(documentReference, this.toJson())
  }

  static async login() {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(userCredential)
    if (!credential) return
    const token = credential.accessToken
    return userCredential.user
  }

  async logout() {
    await auth.signOut()
  }

  async addTopic(topicName: string) {
    this.topics.push(topicName)
    const process1 = setDoc(doc(AppUser.getCollectionRef(), "topics", topicName, "timeLine"), { "topicName": topicName });
    const process2 = this.saveUserData()
    await Promise.all([process1, process2])
  }

  async post(topicName: string, post: unitpost, isReWirte = false) {
    const tl = await timeLine.getTimeLine(topicName)
    if (tl === undefined) return
    await tl.post(post, isReWirte)
  }
}

export default AppUser
