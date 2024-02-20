
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../../shared/services/services.module';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleImagesComponent } from './vehicle-images/vehicle-images.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import {AngularMaterialModule} from "../../angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    AngularMaterialModule,
  ],
  declarations: [
    VehicleDetailsComponent,
    VehicleImagesComponent,
    VehicleListComponent,
    VehicleSearchComponent,
  ],
})
export class VehiclesModule { }
