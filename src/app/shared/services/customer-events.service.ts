import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { handleHttpResponseError } from 'src/app/utils/handleHttpResponseError';

@Injectable({
  providedIn: 'root',
})
export class CustomerEventsService {
  constructor(private angularFirestore: AngularFirestore) {}

  activateCustomer(userID: string, customerID: string): Promise<any> {
    try {
      const data = {
        eventType: 'ACTIVATE-TEMPORARILY',
        customerID: customerID,
        createdBy: userID,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      return new Promise<any>((resolve, reject) => {
        this.angularFirestore
          .collection('customerEvents')
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

  blockServiceCustomer(userID: string, customerID: string): Promise<any> {
    try {
      const data = {
        eventType: 'BLOCK-SERVICE',
        customerID: customerID,
        createdBy: userID,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      return new Promise<any>((resolve, reject) => {
        this.angularFirestore
          .collection('customerEvents')
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
}
