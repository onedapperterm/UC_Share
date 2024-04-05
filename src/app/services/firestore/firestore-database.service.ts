import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { DatabaseDocument } from 'src/app/model/firestore-database.data';
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {

  constructor(private _angularFirestore: AngularFirestore) {}

  public setDocument(document: DatabaseDocument<object>):Observable<void> {
    return from(setDoc(doc(getFirestore(), `${document.collection}/${document.id}`), document.data))
  }

  public getDocument(collection: string, id: string):Observable<DocumentData | undefined> {
    return from(getDoc(doc(getFirestore(), `${collection}/${id}`))).pipe(
      map(snapshot => snapshot.data())
    )
  }
}
