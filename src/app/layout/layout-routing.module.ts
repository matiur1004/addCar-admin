import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix',
      },
      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'franchisees',
        loadChildren: () =>
          import('./franchisees/franchisees.module').then((m) => m.FranchiseesModule),
      },
      {
        path: 'versions',
        loadChildren: () => import('./versions/versions.module').then((m) => m.VersionsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'content-management', loadChildren: () => import('./content-management/content-management.module').then(m => m.ContentManagementModule)
      },
      {
        path: 'vehicles', loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule)
      },
      {
        path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'dashboard', component: DashboardComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
