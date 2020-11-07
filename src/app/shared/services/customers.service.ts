import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { handleHttpResponseError } from 'src/app/utils/handleHttpResponseError';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false),
  });

  constructor(private angularFirestore: AngularFirestore) {}

  createCustomer(userID: string, data, businessID: string): Promise<any> {
    try {
      data = {
        ...data,
        serviceStatus: 'ACTIVE',
        businessID,
        createdBy: userID,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      return new Promise<any>((resolve, reject) => {
        this.angularFirestore
          .collection('customers')
          .add(data)
          .then(
            (res) => {},
            (err) => reject(err)
          );
      });
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  updateCustomer(data): Promise<void> {
    try {
      return this.angularFirestore
        .collection('customers')
        .doc(data.payload.doc.id)
        .set({ completed: true }, { merge: true });
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  updateCustomer2(userID: string, id: string, data): Promise<void> {
    try {
      data = {
        ...data,
        updatedBy: userID,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      return this.angularFirestore
        .collection('customers')
        .doc(id)
        .set(data, { merge: true });
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  getCustomers() {
    try {
      return this.angularFirestore.collection('customers').snapshotChanges();
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  async getCustomers2() {
    try {
      const query = this.angularFirestore.collection('customers');

      const snapshot = await query
        .get()
        .toPromise()
        .then((data) => data);
      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  deleteCustomer(data): Promise<void> {
    try {
      return this.angularFirestore
        .collection('customers')
        .doc(data.payload.doc.id)
        .delete();
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  deleteCustomer2(id: string): Promise<void> {
    try {
      return this.angularFirestore.collection('customers').doc(id).delete();
    } catch (err) {
      handleHttpResponseError(err);
    }
  }
}
