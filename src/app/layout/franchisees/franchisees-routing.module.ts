import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FranchiseeListComponent } from './franchisee-list/franchisee-list.component';
import { FranchiseeListResolverService } from '@app-shared/services/franchisee/franchisee-list-resolver.service';
import { FranchiseeDetailsComponent } from './franchisee-details/franchisee-details.component';
import { FranchiseeResolverService } from '@app-shared/services/franchisee/franchisee-resolver.service';
import { LocationListComponent } from './location-list/location-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { NamedRoutes } from '../../shared/named-routes/named-route-declarations';
import { CountryImageComponent } from './country-image/country-image.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationVehicleListComponent } from './location-vehicle-list/location-vehicle-list.component';
import { LocationReturnLocationsListComponent } from './location-return-locations-list/location-return-locations-list.component';
import { LocationListResolverService } from '../../shared/services/location/location-list-resolver.service';
import { LocationResolverService } from '../../shared/services/location/location-resolver.service';
import { CountryResolverService } from '../../shared/services/country/country-resolver.service';
import { CountryImageResolverService } from '../../shared/services/franchisee/country-image-resolver.service';
import { LocationVehicleResolverService } from 'app/shared/services/location/location-vehicle-resolver.service';

const routes: NamedRoutes = [
  {
    path: '', component: FranchiseeListComponent, resolve: { franchisees: FranchiseeListResolverService }, menuCode: 'franchisee-list'
  },
  {
    path: 'countries/:uid/image', component: CountryImageComponent, menuCode: 'country-image',
  },
  {
    path: 'countries/:uid', component: CountryDetailsComponent, menuCode: 'country-details', resolve: { country: CountryResolverService }
  },
  {
    path: 'locations/page/:pageNum', component: LocationListComponent, runGuardsAndResolvers: 'always', resolve: { datas: LocationListResolverService }
  },
  {
    path: 'locations/page', component: LocationListComponent, resolve: { datas: LocationListResolverService }
  },
  {
    path: 'locations/:uid', component: LocationDetailsComponent, menuCode: 'location-details', resolve: { location: LocationResolverService }
  },
  {
    path: 'locations/:uid/vehicles', component: LocationVehicleListComponent, menuCode: 'location-vehicles', resolve: { datas: LocationVehicleResolverService }
  },
  {
    path: 'locations/:uid/return-locations', component: LocationReturnLocationsListComponent, menuCode: 'location-return-locations'//, resolve: { datas: CountryResolverService }
  },
  {
    path: 'page/:pageNum', component: FranchiseeListComponent, runGuardsAndResolvers: 'always', resolve: { franchisees: FranchiseeListResolverService }, menuCode: 'franchisee-list'
  },
  {
    path: 'page', component: FranchiseeListComponent, resolve: { franchisees: FranchiseeListResolverService }, menuCode: 'franchisee-list'
  },
  {
    path: ':uid', component: FranchiseeDetailsComponent, resolve: { franchisee: FranchiseeResolverService }, menuCode: 'franchisee-details'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseesRoutingModule { }
