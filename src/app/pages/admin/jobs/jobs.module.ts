import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { JobsComponent } from './jobs.component';
import { ChipsComponent } from './chips/chips.component';

@NgModule({
  declarations: [JobsComponent, ChipsComponent],
  exports: [JobsComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    FurySharedModule,

    FormsModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule,

    // Core
    ListModule,
    BreadcrumbsModule,
  ],
})
export class JobsModule {}
