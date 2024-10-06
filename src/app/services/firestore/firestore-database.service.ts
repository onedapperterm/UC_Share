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

  public createDocument(collection: string, data: object): Observable<DocumentReference<unknown>> {
    return from(this._angularFirestore.collection(collection).add(data));
  }

  public setDocument(document: DatabaseDocument<object>):Observable<void> {
    return from(setDoc(doc(getFirestore(), `${document.collection}/${document.id}`), document.data))
  }

  public getDocument(collection: string, id: string):Observable<DocumentData | undefined> {
    return from(getDoc(doc(getFirestore(), `${collection}/${id}`))).pipe(
      map(snapshot => {
        return {...snapshot.data(), id: snapshot.id}
      }),
    )
  }

  public deleteDocument(collection: string, id: string): Observable<void> {
    return from(this._angularFirestore.collection(collection).doc(id).delete());
  }

  public getCollection(collectionName: string, ...queryConstraints: any[]): Observable<any> {
    const reference = collection(getFirestore(), collectionName);
    return collectionData(query(reference, ...queryConstraints), {idField: 'id'});
  }

}
