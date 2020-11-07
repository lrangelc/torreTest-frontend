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
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import { CustomerAddPaymentComponent } from './customer-add-payment/customer-add-payment.component';
import { Customer } from './customer.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { CustomerEventsService } from 'src/app/shared/services/customer-events.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaymentsService } from 'src/app/shared/services/payments.service';
import { handleHttpResponseError } from './../../../utils/handleHttpResponseError';

@Component({
  selector: 'fury-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class CustomerListComponent implements OnInit, AfterViewInit, OnDestroy {
  user: firebase.User;
  // customers;

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];
  businessID = '';

  @Input()
  columns: ListColumn[] = [
    // { name: 'Checkbox', property: 'checkbox', visible: false },
    // { name: 'Image', property: 'image', visible: false },
    // { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    // {
    //   name: 'First Name',
    //   property: 'taxId',
    //   visible: true,
    //   isModelProperty: true,
    // },

    {
      name: 'Tax Id',
      property: 'taxId',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Tax Name',
      property: 'taxName',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Name',
      property: 'name',
      visible: false,
      isModelProperty: true,
    },
    {
      name: 'ip',
      property: 'ip',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Service Cost',
      property: 'serviceCost',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Service Status',
      property: 'serviceStatus',
      visible: true,
      isModelProperty: true,
    },
    // {
    //   name: 'Street',
    //   property: 'comments',
    //   visible: false,
    //   isModelProperty: true,
    // },
    // {
    //   name: 'Zipcode',
    //   property: 'email',
    //   visible: false,
    //   isModelProperty: true,
    // },
    // { name: 'City', property: 'seller', visible: false, isModelProperty: true },
    // {
    //   name: 'Phone',
    //   property: 'phone',
    //   visible: false,
    //   isModelProperty: true,
    // },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Customer> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private customersService: CustomersService,
    private dialog: MatDialog,
    private customerEventsService: CustomerEventsService,
    private authService: AuthService,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {
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
    } catch (err) {
      handleHttpResponseError(err);
    }
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

  createCustomer() {
    try {
      this.dialog
        .open(CustomerCreateUpdateComponent)
        .afterClosed()
        .subscribe((customer: Customer) => {
          /**
           * Customer is the updated customer (if the user pressed Save - otherwise it's null)
           */
          if (customer) {
            /**
             * Here we are updating our local array.
             * You would probably make an HTTP request here.
             */
            this.customers.unshift(new Customer(customer));
            this.subject$.next(this.customers);

            // this.customersService.createCustomer(
            //   JSON.parse(JSON.stringify(customer))
            // );
            this.customersService.createCustomer(
              this.user.uid,
              customer,
              this.businessID
            );
          }
        }, catchError(handleHttpResponseError));
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  updateCustomer(customer2: any) {
    try {
      this.dialog
        .open(CustomerCreateUpdateComponent, {
          data: customer2,
        })
        .afterClosed()
        .subscribe((customer) => {
          if (customer) {
            const index = this.customers.findIndex(
              (existingCustomer) => existingCustomer.id === customer.id
            );
            this.customers[index] = new Customer(customer);
            this.subject$.next(this.customers);

            this.customersService.updateCustomer2(this.user.uid, customer.id, {
              taxId: customer.taxId,
              taxName: customer.taxName,
              name: customer.name,
              email: customer.email,
              generateInvoice: customer.generateInvoice,
              serviceCost: customer.serviceCost,
              dateOfService: customer.dateOfService,
              ip: customer.ip,
              MB: customer.MB,
              phone: customer.phone,
              address: customer.address,
              instalationDate: customer.instalationDate,
              comments: customer.comments,
              mainRouterID: customer.mainRouterID,
              mainRouterName: customer.mainRouterName,
            });
          }
        }, catchError(handleHttpResponseError));
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  deleteCustomer(customer: any) {
    try {
      /**
       * Here we are updating our local array.
       * You would probably make an HTTP request here.
       */
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

  addPaymentCustomer(customer: any) {
    try {
      this.dialog
        .open(CustomerAddPaymentComponent, {
          data: customer,
        })
        .afterClosed()
        .subscribe((newPayment) => {
          /**
           * Customer is the updated customer (if the user pressed Save - otherwise it's null)
           */
          if (newPayment) {
            /**
             * Here we are updating our local array.
             * You would probably make an HTTP request here.
             */
            // const index = this.customers.findIndex(
            //   (existingCustomer) => existingCustomer.id === newPayment.customerID
            // );
            // this.customers[index] = new Customer(newPayment);
            // this.subject$.next(this.customers);

            this.paymentsService.addPaymentCustomer(
              this.businessID,
              this.user.uid,
              newPayment.customerID,
              {
                taxId: newPayment.taxId,
                taxName: newPayment.taxName,
                bankAccountID: newPayment.bankAccount,
                documentNumber: newPayment.documentNumber,
                amount: Number(newPayment.amount),
                documentDate: newPayment.documentDate,
                bankAccountDescription: newPayment.bankAccountDescription,
                description: 'DEPOSITO - TRANSFERENCIA'
              }
            );
          }
        }, catchError(handleHttpResponseError));
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  addPrepaymentCustomer(customer: any) {}

  ngOnDestroy(): void {}

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  // getData() {
  //   return of(
  //     ALL_IN_ONE_TABLE_DEMO_DATA.map((customer) => new Customer(customer))
  //   );
  // }

  // deleteCustomer(data): Promise<void> {
  //   return this.customersService.deleteCustomer(data);
  // }

  // markCompleted(data): Promise<void> {
  //   return this.customersService.updateCustomer(data);
  // }
}
