import { getDoc, doc, collection, setDoc, getDocs } from 'firebase/firestore'
import { db as database, auth } from '../firebase'
import { unitpost } from './post'

export class timeLine {
  topicName = ''
  numPosts = 0
  #uid = auth.currentUser?.uid
  constructor (topicName: string, numberPosts: number) {
    this.topicName = topicName
    this.numPosts = numberPosts
  }

  getDocRef () {
    if (this.#uid === null) return
    return doc(database, this.#uid!, 'topics', this.topicName, 'timeLine')
  }

  async saveInfo () {
    const documentReference = this.getDocRef()
    if (documentReference === undefined) return
    setDoc(documentReference, {
      numPosts: this.numPosts,
      topicName: this.topicName
    })
  }

  static async getTimeLine (topicName: string) {
    const uid = auth.currentUser?.uid
    if (!uid) return
    const documentReference = doc(database, uid, 'topics', topicName, 'timeLine')
    const documentSnap = await getDoc(documentReference)
    if (documentSnap.exists()) {
      const data = documentSnap.data()
      if (data === undefined) return
      return new timeLine(data.topicName, data.numPosts)
    }
  }

  async post (post: unitpost, isReWirte = false) {
    const documentReference = this.getDocRef()
    if (documentReference === undefined) return
    if (isReWirte) {
      const colReference = doc(documentReference, (post.postid ?? this.numPosts).toString(), (post.unitid ?? 0).toString())
      setDoc(colReference, post.toJson())
    } else {
      const colReference = collection(documentReference, this.numPosts.toString())
      const docs = await getDocs(colReference)
      const unitid = docs.size
      const postReference = doc(colReference, unitid.toString())
      setDoc(postReference, post.toJson())
    }
  }
}
