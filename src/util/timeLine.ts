import { getDoc, doc, collection, setDoc, getDocs, DocumentReference, DocumentData } from 'firebase/firestore'
import { db as database, auth } from '../firebase'
import { unitpost } from './post'

export class TimeLine {
  topicName = ''
  numPosts = 0
  #uid = auth.currentUser?.uid
  constructor (topicName: string, numberPosts: number) {
    this.topicName = topicName
    this.numPosts = numberPosts
  }

  getDocRef (): DocumentReference<DocumentData> | undefined {
    if (this.#uid === null) return undefined
    return doc(database, this.#uid as string, 'topics', this.topicName, 'timeLine')
  }

  async saveInfo () {
    const documentReference = this.getDocRef()
    if (documentReference === undefined) return
    await setDoc(documentReference, {
      numPosts: this.numPosts,
      topicName: this.topicName
    })
  }

  static async getTimeLine (topicName: string): Promise<TimeLine | undefined> {
    const uid = auth.currentUser?.uid
    if (!uid) return undefined
    const documentReference = doc(database, uid, 'topics', topicName, 'timeLine')
    const documentSnap = await getDoc(documentReference)
    if (documentSnap.exists()) {
      const data = documentSnap.data() as {topicName:string, numPosts:number}
      if (data === undefined) return undefined
      return new TimeLine(data.topicName, data.numPosts)
    }
    return undefined
  }

  async post (post: unitpost, isReWirte = false) {
    const documentReference = this.getDocRef()
    if (documentReference === undefined) return
    if (isReWirte) {
      const colReference =
        doc(documentReference, (post.postid ?? this.numPosts).toString(), (post.unitid ?? 0).toString())
      await setDoc(colReference, post.toJson())
    } else {
      const colReference = collection(documentReference, this.numPosts.toString())
      const docs = await getDocs(colReference)
      const unitid = docs.size
      const postReference = doc(colReference, unitid.toString())
      await setDoc(postReference, post.toJson())
    }
  }
}
