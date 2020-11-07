import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { handleHttpResponseError } from 'src/app/utils/handleHttpResponseError';
import { BusinessService } from 'src/app/shared/services/business.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(
    private angularFirestore: AngularFirestore,
    private businessService: BusinessService
  ) {}

  async addPaymentCustomer(
    businessID: string,
    userID: string,
    customerID: string,
    data: any
  ): Promise<any> {
    try {
      const businessData = await this.businessService.getBusiness(businessID);

      const payload = {
        ...data,
        businessID,
        customerID,
        logoURL: businessData.logoURL,
        legalName: businessData.legalName,
        name: businessData.name,
        legalAddress: businessData.legalAddress,
        phoneNumber: businessData.phoneNumber,
        publicEmail: businessData.publicEmail,
        webSite: businessData.webSite,
        messageISR: businessData.messageISR,
        messageIVA: businessData.messageIVA,
        createdBy: userID,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      return new Promise<any>((resolve, reject) => {
        this.angularFirestore
          .collection('payments')
          .add(payload)
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
