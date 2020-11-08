import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CustomersService } from './../../../shared/services/customers.service';

import { Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { JobDetailComponent } from './job-detail/job-detail.component';
// import { CustomerAddPaymentComponent } from './../customer-list/customer-add-payment/customer-add-payment.component';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { CustomerEventsService } from 'src/app/shared/services/customer-events.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import { handleHttpResponseError } from './../../../utils/handleHttpResponseError';

import { JobsService } from 'src/app/shared/services/jobs.service';
import { Job } from 'src/app/models/job.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'fury-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class JobsComponent implements OnInit, AfterViewInit, OnDestroy {
  user: firebase.User;
  skills: string[] = ['Fullstack Development'];

  subject$: ReplaySubject<Job[]> = new ReplaySubject<Job[]>(1);
  data$: Observable<Job[]> = this.subject$.asObservable();
  customers: Job[];
  businessID = '';

  @Input()
  columns: ListColumn[] = [
    {
      name: 'Id',
      property: 'id',
      visible: false,
      isModelProperty: true,
    },
    {
      name: 'Objective',
      property: 'objective',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Skills',
      property: 'skillX',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'organizations',
      property: 'organizationX',
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
      name: 'min Amount',
      property: 'minAmount',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'max Amount',
      property: 'maxAmount',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Actions',
      property: 'actions',
      visible: true,
      isModelProperty: false,
    },
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Job> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private customersService: CustomersService,
    private dialog: MatDialog,
    private customerEventsService: CustomerEventsService,
    private authService: AuthService,
    private paymentsService: PaymentsService,
    private jobsService: JobsService
  ) {}

  searchTerm = '';
  jobs$: Job[];

  ngOnInit(): void {
    // this.jobsService.search(this.searchTerm).subscribe();

    try {
      this.businessID = localStorage.getItem('businessID');
      this.user = this.authService.getUser();
      this.getCustomers();

      // this.customersService.getCustomers().subscribe((res) => {
      //   return this.subject$.next(res);
      // });

      // this.getData().subscribe((customers) => {
      //   console.log('customers');
      //   console.log(customers);
      //   this.subject$.next(customers);
      // });

      this.dataSource = new MatTableDataSource();

      this.data$.pipe(filter((data) => !!data)).subscribe((customers) => {
        this.customers = customers;
        this.dataSource.data = customers;
      }, catchError(handleHttpResponseError));
      // this.doSomething();
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  // async doSomething() {
  //   const user = await this.authService.isLoggedIn();
  //   if (user) {
  //     // do something
  //     this.user = user;
  //     this.sidenavUserVisible$ = true;
  //   } else {
  //     // do something else
  //     this.sidenavUserVisible$ = false;
  //   }
  // }

  async onSearchTermChange(): Promise<void> {
    const skills = this.skills || [];
    this.jobsService.sendPostRequest(skills).subscribe((res) => {
      const listDocuments: any[] = [];
      for (const iterator of res.results) {
        let document: {} = {};
        let minAmount = 0;
        let maxAmount = 0;
        let currency = 'USD$';
        document = iterator;

        const skillX = iterator.skills.map((a) => a.name + ' ');
        const organizationX = iterator.organizations.map((a) => a.name + ' ');
        if (iterator.compensation.data) {
          minAmount = iterator.compensation.data.minAmount || 0;
          maxAmount = iterator.compensation.data.maxAmount || 0;
          currency = iterator.compensation.data.currency || 'USD$';
        }

        document = {
          ...document,
          skillX,
          organizationX,
          minAmount,
          maxAmount,
          currency,
        };
        listDocuments.push(document);
      }

      return this.subject$.next(listDocuments);
    });
  }

  async getCustomers() {
    try {
      return this.customersService.getCustomers().subscribe((res) => {
        const listDocuments: any[] = [];
        for (const iterator of res) {
          let document: {} = {};
          document = iterator.payload.doc.data();
          document = { ...document, id: iterator.payload.doc.id };
          listDocuments.push(document);
          // xx.push(iterator.payload.doc.data());
        }

        return this.subject$.next(listDocuments);
      }, catchError(handleHttpResponseError));

      // const xx = await this.customersService.getCustomers2();
      // console.log(xx);
      // return this.subject$.next(xx);
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

  applyJob(job: any) {
    try {
      if (this.user) {
        let minAmount = 0;
        let maxAmount = 0;
        let currency = 'USD$';

        const skillX = job.skills.map((a) => a.name + ' ');
        const locationX = job.locations.map((a) => a);
        const organizationX = job.organizations.map((a) => a.name + ' ');
        if (job.compensation.data) {
          minAmount = job.compensation.data.minAmount || 0;
          maxAmount = job.compensation.data.maxAmount || 0;
          currency = job.compensation.data.currency || 'USD$';
        }

        this.jobsService.applyJob(this.user.uid, job.id, {
          objective: job.objective,
          organizationX,
          skillX,
          locationX,
          currency: currency,
          minAmount: minAmount,
          maxAmount: maxAmount,
        });
      } else {
        this.router.navigate(['/login'], { queryParams: { jobID: job.id } });
      }
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  viewJob(jobRecord: any) {
    try {
      this.dialog
        .open(JobDetailComponent, {
          data: jobRecord,
        })
        .afterClosed()
        .subscribe((job) => {
          if (job) {
            this.applyJob(job);
          }
        }, catchError(handleHttpResponseError));
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  deleteCustomer(customer: any) {
    try {
      this.customers.splice(
        this.customers.findIndex(
          (existingCustomer) => existingCustomer.id === customer.id
        ),
        1
      );
      this.subject$.next(this.customers);
      this.customersService.deleteCustomer2(customer.id);
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  activateCustomer(customer: any) {
    try {
      this.customerEventsService.activateCustomer(this.user.uid, customer.id);
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  blockServiceCustomer(customer: any) {
    try {
      this.customerEventsService.blockServiceCustomer(
        this.user.uid,
        customer.id
      );
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  async onFilterChange(value: any) {
    console.log(typeof value);

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
}
