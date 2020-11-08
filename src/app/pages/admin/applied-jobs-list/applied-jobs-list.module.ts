// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { AppliedJobsListRoutingModule } from './applied-jobs-list-routing.module';
// import { AppliedJobsListComponent } from './applied-jobs-list.component';

// @NgModule({
//   declarations: [AppliedJobsListComponent],
//   imports: [
//     CommonModule,
//     AppliedJobsListRoutingModule
//   ]
// })
// export class AppliedJobsListModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppliedJobsListRoutingModule } from './applied-jobs-list-routing.module';
import { AppliedJobsListComponent } from './applied-jobs-list.component';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';

import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { JobDetailModule } from './job-detail/job-detail.module';

@NgModule({
  declarations: [AppliedJobsListComponent],
  exports: [AppliedJobsListComponent],
  imports: [
    CommonModule,
    AppliedJobsListRoutingModule,
    FurySharedModule,

    FormsModule,
    MaterialModule,
    FurySharedModule,
    JobDetailModule,

    // Core
    ListModule,
    BreadcrumbsModule,
  ],
})
export class AppliedJobsListModule {}
