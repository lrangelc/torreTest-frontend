import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { handleHttpResponseError } from 'src/app/utils/handleHttpResponseError';

@Injectable({
  providedIn: 'root',
})
export class BankAccountsService {
  constructor(private angularFirestore: AngularFirestore) {}

  async getBankAccounts() {
    try {
      const query = this.angularFirestore.collection('bankAccounts');

      const snapshot = await query
        .get()
        .toPromise()
        .then((data) => data);
      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      handleHttpResponseError(err);
    }
  }
}
