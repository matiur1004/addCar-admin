import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionsComponent } from './versions.component';

const routes: Routes = [
  {
    path: '',
    component: VersionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VersionsRoutingModule {}
