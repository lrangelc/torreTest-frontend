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
import { Job } from './../../../../models/job.model';
import { MainRoutersService } from 'src/app/shared/services/main-routers.service';

@Component({
  selector: 'fury-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  static id = 100;
  mainRouters$: any[] = [];
  mainRouterName = '';
  selectedMainRouter = '';

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  instalationDate = new FormControl(new Date());

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<JobDetailComponent>,
    private fb: FormBuilder,
    private mainRoutersService: MainRoutersService
  ) {}

  ngOnInit() {
    try {
      if (this.defaults) {
        this.mode = 'update';
      } else {
        this.defaults = {} as Job;
      }

      this.getMainRouters();
      this.selectedMainRouter = this.defaults.mainRouterID;
      this.mainRouterName = this.defaults.mainRouterName;

      let minAmount = 0;
      let maxAmount = 0;
      let currency = 'USD$';

      const skillX = this.defaults.skills.map((a) => a.name + ' ');
      const organizationX = this.defaults.organizations.map(
        (a) => a.name + ' '
      );
      if (this.defaults.compensation.data) {
        minAmount = this.defaults.compensation.data.minAmount || 0;
        maxAmount = this.defaults.compensation.data.maxAmount || 0;
        currency = this.defaults.compensation.data.currency || 'USD$';
      }
      const location = this.defaults.locations[0];

      this.form = this.fb.group({
        // id: [JobDetailComponent.id++],
        mainRouterID: new FormControl(this.defaults.mainRouterID, [
          Validators.required,
        ]),
        id: [this.defaults.id || ''],
        objective: [this.defaults.objective || ''],
        location: [location || ''],
        skills: [this.defaults.skills],
        organization: [organizationX || ''],
        currency: [currency || ''],
        // email: this.defaults.email || '',
        // serviceCost: this.defaults.serviceCost || '',
        minAmount: minAmount || 0,
        maxAmount: maxAmount || 0,
        // ip: this.defaults.ip || '',
        // MB: this.defaults.MB || '',
        // phone: this.defaults.phone || '',
        // address: this.defaults.address || '',
        // instalationDate: this.defaults.instalationDate || '',
        // comments: this.defaults.comments || '',
      });
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
      if (dateObject.toString() !== 'Invalid Date') {
        result = true;
      }
    } catch (err) {
      console.error(err);
    }
    return result;
  }

  save() {
    try {
      if (this.mode === 'update') {
        this.applyJob();
      }
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  applyJob() {
    try {
      const job = this.form.value;
      job.id = this.defaults.id;
      job.compensation = this.defaults.compensation;

      this.dialogRef.close(job);
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
    this.mainRouterName = target.innerText.trim();
  }
}
