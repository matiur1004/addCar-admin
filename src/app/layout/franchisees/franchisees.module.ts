import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesModule } from '@app-shared/services/services.module';
import { FranchiseeDetailsComponent } from './franchisee-details/franchisee-details.component';
import { FranchiseeListComponent } from './franchisee-list/franchisee-list.component';
import { FranchiseesRoutingModule } from './franchisees-routing.module';
import { AddressDetailsModule } from '../components/address-details/address-details.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FranchiseeListSearchComponent } from './franchisee-list-search/franchisee-list-search.component';
import { LocationListComponent } from './location-list/location-list.component';
import { CountryImageComponent } from './country-image/country-image.component';
import { LocationVehicleListComponent } from './location-vehicle-list/location-vehicle-list.component';
import { LocationReturnLocationsListComponent } from './location-return-locations-list/location-return-locations-list.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { AddLocationVehicleComponent } from './add-location-vehicle/add-location-vehicle.component';
import { CountryCategorySettingsComponent } from './country-category-settings/country-category-settings.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { MatSelectModule } from '@angular/material/select';
import { CountryAllowedCountriesComponent } from './country-allowed-countries/country-allowed-countries.component';
import { CountryExportExcelComponent } from './country-export-excel/country-export-excel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { LocationListSearchComponent } from './location-list-search/location-list-search.component';
import { CountryListSearchComponent } from './country-list-search/country-list-search.component';

@NgModule({
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    FranchiseesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    FranchiseesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    AddressDetailsModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ],

  declarations: [
    FranchiseeDetailsComponent,
    FranchiseeListComponent,
    FranchiseeListSearchComponent,
    LocationListComponent,
    CountryImageComponent,
    LocationVehicleListComponent,
    LocationReturnLocationsListComponent,
    LocationDetailsComponent,
    AddLocationVehicleComponent,
    CountryCategorySettingsComponent,
    CountryDetailsComponent,
    CountryAllowedCountriesComponent,
    CountryExportExcelComponent,
    CountryListSearchComponent,
    LocationListSearchComponent
  ],

  entryComponents: [
  ]
})
export class FranchiseesModule { }
