import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankAccountsService } from 'src/app/shared/services/bank-accounts.service';
import { handleHttpResponseError } from 'src/app/utils/handleHttpResponseError';
import { Customer } from './customer.model';

@Component({
  selector: 'fury-customer-add-payment',
  templateUrl: './customer-add-payment.component.html',
  styleUrls: ['./customer-add-payment.component.scss'],
})
export class CustomerAddPaymentComponent implements OnInit {
  bankAccounts$: any[] = [];
  bankAccountDescription = '';

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CustomerAddPaymentComponent>,
    private bankAccountsService: BankAccountsService
  ) {}

  ngOnInit() {
    try {
      if (this.defaults) {
        this.mode = 'update';
      } else {
        this.defaults = {} as Customer;
      }

      this.getBankAccounts();

      this.form = new FormGroup({
        bankAccount: new FormControl('', [Validators.required]),
        taxName: new FormControl(this.defaults.taxName || '', [
          Validators.required,
        ]),
        taxId: new FormControl(this.defaults.taxId || '', [
          Validators.required,
        ]),
        documentNumber: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required]),
        documentDate: new FormControl(new Date(), [Validators.required]),
      });
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  async getBankAccounts() {
    try {
      const bankAccounts = await this.bankAccountsService.getBankAccounts();
      this.bankAccounts$ = bankAccounts;
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  save() {
    try {
      if (this.mode === 'update') {
        this.addPaymentCustomer();
      }
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  addPaymentCustomer() {
    try {
      const newPayment = this.form.value;
      newPayment.customerID = this.defaults.id;
      newPayment.bankAccountDescription = this.bankAccountDescription;

      this.dialogRef.close(newPayment);
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  isUpdateMode() {
    try {
      return this.mode === 'update';
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  selectedBankAccount(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim(),
    };
    console.log(selectedData);
    this.bankAccountDescription = target.innerText.trim();
  }
}
