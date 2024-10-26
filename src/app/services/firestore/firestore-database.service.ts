import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { DatabaseDocument } from 'src/app/model/firestore-database.data';
import { doc, getFirestore, setDoc, getDoc, collection, collectionData, query } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {

  constructor(private _angularFirestore: AngularFirestore) {}

  /**
   * creates a document
   */
  public createDocument<T extends object= object>(collection: string, data: T): Observable<DocumentReference<unknown>> {
    return from(this._angularFirestore.collection(collection).add(data));
  }

  /**
   * Updates a document
   */
  public setDocument<T extends object = object>(document: DatabaseDocument<T>):Observable<void> {
    return from(setDoc(doc(getFirestore(), `${document.collection}/${document.id}`), document.data))
  }

  /**
   * Gets a document by id
   */
  public getDocument<T = DocumentData>(collection: string, id: string):Observable<T | null> {
    return from(getDoc(doc(getFirestore(), `${collection}/${id}`))).pipe(
      map(snapshot => {
        return snapshot && snapshot.data() ? {...snapshot.data(), id: snapshot.id} as T : null;
      }),
    )
  }

  /**
   * Deletes a document by id
   */
  public deleteDocument(collection: string, id: string): Observable<void> {
    return from(this._angularFirestore.collection(collection).doc(id).delete());
  }

  /**
  * Gets the documents of a collection
  */
  public getCollection(collectionName: string, ...queryConstraints: any[]): Observable<any> {
    const reference = collection(getFirestore(), collectionName);
    return collectionData(query(reference, ...queryConstraints), {idField: 'id'});
  }

}
