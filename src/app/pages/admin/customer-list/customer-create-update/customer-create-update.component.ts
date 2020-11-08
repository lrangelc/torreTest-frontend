import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { handleHttpResponseError } from 'src/app/utils/handleHttpResponseError';
import { Customer } from './customer.model';
import { MainRoutersService } from 'src/app/shared/services/main-routers.service';

@Component({
  selector: 'fury-customer-create-update',
  templateUrl: './customer-create-update.component.html',
  styleUrls: ['./customer-create-update.component.scss'],
})
export class CustomerCreateUpdateComponent implements OnInit {
  static id = 100;
  mainRouters$: any[] = [];
  mainRouterName = '';
  selectedMainRouter = '';

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  instalationDate = new FormControl(new Date());

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
    private fb: FormBuilder,
    private mainRoutersService: MainRoutersService
  ) {}

  ngOnInit() {
    try {
      if (this.defaults) {
        this.mode = 'update';
      } else {
        this.defaults = {} as Customer;
      }

      this.getMainRouters();
      this.selectedMainRouter = this.defaults.mainRouterID;
      this.mainRouterName = this.defaults.mainRouterName;

      this.form = this.fb.group({
        id: [CustomerCreateUpdateComponent.id++],
        mainRouterID: new FormControl(this.defaults.mainRouterID, [
          Validators.required,
        ]),
        taxId: [this.defaults.taxId || ''],
        taxName: [this.defaults.taxName || ''],
        name: [this.defaults.name || ''],
        generateInvoice: [this.defaults.generateInvoice || false],
        email: this.defaults.email || '',
        serviceCost: this.defaults.serviceCost || '',
        dateOfService: this.defaults.dateOfService || 1,
        ip: this.defaults.ip || '',
        MB: this.defaults.MB || '',
        phone: this.defaults.phone || '',
        address: this.defaults.address || '',
        instalationDate: this.defaults.instalationDate || '',
        comments: this.defaults.comments || '',
      });
      // // this.instalationDate = this.defaults.instalationDate;
      if (this.validDate(this.defaults.instalationDate)) {
        const dateMomentObject = moment(
          this.defaults.instalationDate,
          'DD/MM/YYYY'
        ); // 1st argument - string, 2nd argument - format
        const dateObject = dateMomentObject.toDate();

        this.instalationDate = new FormControl(dateObject.toISOString());
      } else {
        this.instalationDate = new FormControl(
          new Date(this.defaults.instalationDate.toDate()).toISOString()
        );
      }
      // this.instalationDate = new FormControl((new Date()).toISOString());
      console.log('korn');
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  async getMainRouters() {
    try {
      const mainRouters = await this.mainRoutersService.getMainRouters();
      this.mainRouters$ = mainRouters;
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  validDate(date: string) {
    let result = false;
    try {
      const dateMomentObject = moment(date, 'DD/MM/YYYY'); // 1st argument - string, 2nd argument - format
      const dateObject = dateMomentObject.toDate();
      console.log(dateObject);
      if (dateObject.toString() !== 'Invalid Date') {
        result = true;
      }
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  save() {
    try {
      if (this.mode === 'create') {
        this.createCustomer();
      } else if (this.mode === 'update') {
        this.updateCustomer();
      }
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  createCustomer() {
    try {
      const customer = this.form.value;
      customer.mainRouterName = this.mainRouterName;
      this.dialogRef.close(customer);
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  updateCustomer() {
    try {
      const customer = this.form.value;
      customer.id = this.defaults.id;
      customer.instalationDate = this.instalationDate.value;
      customer.mainRouterName = this.mainRouterName;

      this.dialogRef.close(customer);
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  isCreateMode() {
    try {
      return this.mode === 'create';
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

  selectionChangeMainRouter(event) {
    const target = event.source.selected._element.nativeElement;
    const selectedData = {
      value: event.value,
      text: target.innerText.trim(),
    };
    console.log(selectedData);
    this.mainRouterName = target.innerText.trim();
  }
}
