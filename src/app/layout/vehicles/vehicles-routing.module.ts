
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleListResolverService } from '@app-shared/services/vehicle/vehicle-list-resolver.service';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleResolverService } from '@app-shared/services/vehicle/vehicle-resolver.service';
import { VehicleImagesComponent } from './vehicle-images/vehicle-images.component';
import { VehicleImageResolverService } from "@app-shared/services/vehicle/vehicle-image-resolver.service";
import { NamedRoutes } from '../../shared/named-routes/named-route-declarations';


const routes: NamedRoutes = [
  {
    path: '', component: VehicleListComponent, resolve: { vehicles: VehicleListResolverService }
  },
  {
    path: 'page/:pageNum', component: VehicleListComponent,
    runGuardsAndResolvers: 'always',
    resolve: { vehicles: VehicleListResolverService }
  },
  {
    path: 'page',
    component: VehicleListComponent,
    resolve: { vehicles: VehicleListResolverService },
  },
  {
    path: ':uid',
    component: VehicleDetailsComponent,
    resolve: { vehicle: VehicleResolverService },
    menuCode: 'vehicle-details',
    menuCallback: (item) => {
      //console.log(item);
    }
  },
  {
    path: ':uid/images', component: VehicleImagesComponent, resolve: { vehicle: VehicleImageResolverService }, menuCode: 'vehicle-images'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
