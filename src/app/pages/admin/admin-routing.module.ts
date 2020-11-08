import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
  {
    path: 'customer-list',
    loadChildren: () =>
      import('./customer-list/customer-list.module').then(
        (m) => m.CustomerListModule
      ),
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then((m) => m.JobsModule),
  },
  {
    path: 'appliedJobs',
    loadChildren: () =>
      import('./applied-jobs-list/applied-jobs-list.module').then(
        (m) => m.AppliedJobsListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
