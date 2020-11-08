import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppliedJobsListComponent } from './applied-jobs-list.component';

import { AdminGuard } from './../../../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AppliedJobsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppliedJobsListRoutingModule {}
