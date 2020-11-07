import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerListRoutingModule } from './customer-list-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';

import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { CustomerCreateUpdateModule } from './customer-create-update/customer-create-update.module';
import { CustomerAddPaymentModule } from './customer-add-payment/customer-add-payment.module';

@NgModule({
  declarations: [CustomerListComponent],
  exports: [CustomerListComponent],
  imports: [
    CommonModule,
    CustomerListRoutingModule,
    FurySharedModule,

    FormsModule,
    MaterialModule,
    FurySharedModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    CustomerCreateUpdateModule,
    CustomerAddPaymentModule,
  ],
})
export class CustomerListModule {}
