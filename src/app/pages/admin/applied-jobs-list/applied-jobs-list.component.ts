import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { AppliedJobs } from './../../../models/appliedJobs.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { AppliedJobsService } from 'src/app/shared/services/applied-jobs.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import { handleHttpResponseError } from './../../../utils/handleHttpResponseError';
import { JobDetailComponent } from './job-detail/job-detail.component';

@Component({
  selector: 'fury-applied-jobs-list',
  templateUrl: './applied-jobs-list.component.html',
  styleUrls: ['./applied-jobs-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class AppliedJobsListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  user: firebase.User;
  subject$: ReplaySubject<any[]> = new ReplaySubject<AppliedJobs[]>(1);
  data$: Observable<AppliedJobs[]> = this.subject$.asObservable();
  customers: AppliedJobs[];
  businessID = '';

  @Input()
  columns: ListColumn[] = [
    {
      name: 'Id',
      property: 'id',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Objective',
      property: 'objective',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Currency',
      property: 'currency',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Min Amount',
      property: 'minAmount',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Max Amount',
      property: 'maxAmount',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Status',
      property: 'status',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<AppliedJobs> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private appliedJobsService: AppliedJobsService,
    private dialog: MatDialog,
    private authService: AuthService,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {
    try {
      this.businessID = localStorage.getItem('businessID');
      this.user = this.authService.getUser();
      this.getAppliedJobs();

      this.dataSource = new MatTableDataSource();

      this.data$.pipe(filter((data) => !!data)).subscribe((customers) => {
        this.customers = customers;
        this.dataSource.data = customers;
      }, catchError(handleHttpResponseError));
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  async getAppliedJobs() {
    try {
      return this.appliedJobsService
        .getAppliedJobs(this.user.uid)
        .subscribe((res) => {
          const listDocuments: any[] = [];
          for (const iterator of res) {
            let document: {} = {};
            document = iterator.payload.doc.data();
            document = { ...document, id: iterator.payload.doc.id };
            listDocuments.push(document);
          }

          return this.subject$.next(listDocuments);
        }, catchError(handleHttpResponseError));
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  get visibleColumns() {
    try {
      return this.columns
        .filter((column) => column.visible)
        .map((column) => column.property);
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  ngAfterViewInit(): void {
    try {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  onFilterChange(value: any) {
    try {
      if (!this.dataSource) {
        return;
      }
      value = value.trim();
      value = value.toLowerCase();
      this.dataSource.filter = value;
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  ngOnDestroy(): void {}

  viewJob(jobRecord: any) {
    try {
      this.dialog
        .open(JobDetailComponent, {
          data: jobRecord,
        })
        .afterClosed()
        .subscribe((job) => {
          if (job) {
            console.log(job);
          }
        }, catchError(handleHttpResponseError));
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  deleteAppliedJob(customer: any) {
    try {
      this.customers.splice(
        this.customers.findIndex(
          (existingCustomer) => existingCustomer.id === customer.id
        ),
        1
      );
      this.subject$.next(this.customers);
      this.appliedJobsService.deleteAppliedJob(customer.id);
    } catch (err) {
      handleHttpResponseError(err);
    }
  }
}
