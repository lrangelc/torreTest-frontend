import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { handleHttpResponseError } from 'src/app/utils/handleHttpResponseError';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(private angularFirestore: AngularFirestore) {}

  getBusiness2(businessID: string) {
    try {
      const xx = this.angularFirestore
        .collection('business')
        .doc(businessID)
        .get();
      return this.angularFirestore.collection('business').doc(businessID).get();
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  async getBusiness(businessID: string): Promise<any> {
    try {
      const docref = this.angularFirestore
        .collection('business')
        .doc(businessID);
      return docref.ref.get().then(function (doc) {
        if (doc.exists) {
          const invoice = doc.data();

          console.log('Business data: ', doc.data());
          const xx = { ...doc.data(), id: doc.id };
          console.log(xx);
          return xx;
        } else {
          console.error('No matching Business found');
        }
      });
    } catch (err) {
      handleHttpResponseError(err);
    }
  }
}
