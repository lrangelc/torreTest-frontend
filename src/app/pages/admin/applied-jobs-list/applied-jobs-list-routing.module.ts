import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppliedJobsListComponent } from './applied-jobs-list.component';

const routes: Routes = [
  {
    path: '',
    component: AppliedJobsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppliedJobsListRoutingModule {}
