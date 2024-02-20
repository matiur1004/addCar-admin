
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../../shared/services/services.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { TranslationSettingsComponent } from './translation-settings/translation-settings.component';
import { SettingsComponent } from './settings.component';
import { MinPriceFilterComponent } from './min-price-filter/min-price-filter.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MinPriceFilterDetailComponent } from './min-price-filter-detail/min-price-filter-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { GracePeriodFilterComponent } from './grace-period-filter/grace-period-filter.component';


@NgModule({
    imports: [
        CommonModule,
        SettingsRoutingModule,
        FormsModule,
        ReactiveFormsModule, 
        ServicesModule,
        MatTooltipModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        NgbTypeaheadModule,
  ],
  declarations: [TranslationSettingsComponent, SettingsComponent, MinPriceFilterComponent, MinPriceFilterDetailComponent, GracePeriodFilterComponent, ]
})
export class SettingsModule {}
