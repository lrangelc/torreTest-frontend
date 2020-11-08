import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/authentication/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/authentication/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import(
        './pages/authentication/forgot-password/forgot-password.module'
      ).then((m) => m.ForgotPasswordModule),
  },
  {
    path: 'coming-soon',
    loadChildren: () =>
      import('./pages/coming-soon/coming-soon.module').then(
        (m) => m.ComingSoonModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    // canActivate: [AdminGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        pathMatch: 'full',
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/admin/admin.module').then((m) => m.AdminModule),
      },

      // {
      //   path: 'page-layouts',
      //   loadChildren: () =>
      //     import('./pages/page-layouts/page-layouts.module').then(
      //       (m) => m.PageLayoutsModule
      //     ),
      // },
      // {
      //   path: 'maps/google-maps',
      //   loadChildren: () =>
      //     import('./pages/maps/google-maps/google-maps.module').then(
      //       (m) => m.GoogleMapsModule
      //     ),
      // },
      // {
      //   path: 'tables/all-in-one-table',
      //   loadChildren: () =>
      //     import(
      //       './pages/tables/all-in-one-table/all-in-one-table.module'
      //     ).then((m) => m.AllInOneTableModule),
      // },
      // {
      //   path: 'drag-and-drop',
      //   loadChildren: () =>
      //     import('./pages/drag-and-drop/drag-and-drop.module').then(
      //       (m) => m.DragAndDropModule
      //     ),
      // },
      // {
      //   path: 'editor',
      //   loadChildren: () =>
      //     import('./pages/editor/editor.module').then((m) => m.EditorModule),
      // },
      // {
      //   path: 'blank',
      //   loadChildren: () =>
      //     import('./pages/blank/blank.module').then((m) => m.BlankModule),
      // },
      // {
      //   path: 'level1/level2/level3/level4/level5',
      //   loadChildren: () =>
      //     import('./pages/level5/level5.module').then((m) => m.Level5Module),
      // },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
