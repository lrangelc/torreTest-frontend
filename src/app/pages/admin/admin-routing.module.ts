// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// import { NavComponent } from './components/nav/nav.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { CustomersComponent } from './components/customers/customers.component';
// import { CustomerListComponent } from './components/customer-list/customer-list.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: NavComponent,
//     children: [
//       // {
//       //   path: '',
//       //   component: DashboardComponent,
//       // },
//       // {
//       //   path: 'dashboard',
//       //   component: DashboardComponent,
//       // },
//       {
//         path: 'customers',
//         component: CustomersComponent,
//       },
//       {
//         path: 'customer-list',
//         component: CustomerListComponent,
//       },
//     ],
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class AdminRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'customer-list',
    loadChildren: () => import('./customer-list/customer-list.module').then(m => m.CustomerListModule)
  },
  // {
  //   path: 'simple-tabbed',
  //   loadChildren: () => import('./page-layout-simple-tabbed/page-layout-simple-tabbed.module').then(m => m.PageLayoutSimpleTabbedModule)
  // },
  // {
  //   path: 'card',
  //   loadChildren: () => import('./page-layout-card/page-layout-card.module').then(m => m.PageLayoutCardModule)
  // },
  // {
  //   path: 'card-tabbed',
  //   loadChildren: () => import('./page-layout-card-tabbed/page-layout-card-tabbed.module').then(m => m.PageLayoutCardTabbedModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
