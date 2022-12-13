// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getDocs, doc, collection, CollectionReference, DocumentData, setDoc } from 'firebase/firestore'
import { db as database, auth } from '../firebase'

import { unitpost } from './post'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TimeLine } from './timeLine'
export class AppUser {
  user?: User
  uid = ''
  name = ''
  email = ''
  topics: string[] = []
  dbRef: CollectionReference<DocumentData> | null = null
  constructor (user: User) {
    this.uid = user.uid
    if (user.displayName !== null) {
      this.name = user.displayName
    }
    if (user.email !== null) {
      this.email = user.email
    }
    this.dbRef = collection(database, this.uid)
  }

  getCollectionRef () {
    return this.dbRef ?? collection(database, this.uid)
  }

  static async login () {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(userCredential)
    if (!credential) return {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = credential.accessToken
    return userCredential.user
  }

  static async logout () {
    await auth.signOut()
  }

  addTopic (topicName: string) {
    this.topics.push(topicName)
  }

  static async post (topicName: string, post: unitpost, isReWirte = false) {
    const tl = await TimeLine.getTimeLine(topicName)
    if (tl === undefined) return
    await tl.post(post, isReWirte)
  }
}

export default AppUser
