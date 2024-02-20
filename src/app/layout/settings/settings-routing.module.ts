
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslationSettingsComponent } from './translation-settings/translation-settings.component';
import { TranslationSettingsResolverService } from '@app-shared/services/translation-settings-resolver.service';
import { SettingsComponent } from './settings.component';
import { MinPriceFilterComponent } from './min-price-filter/min-price-filter.component';
import { GracePeriodFilterComponent } from './grace-period-filter/grace-period-filter.component';
import { GracePeriodFilterResolverService } from 'app/shared/services/settings/grace-period-filter-resolver.service';


const routes: Routes = [
  {
    path: '', component: SettingsComponent
  },
  {
    path: 'translation-settings', component: TranslationSettingsComponent, resolve: { translationSettings: TranslationSettingsResolverService }
  },
  {
    path: 'min-price-filter', component: MinPriceFilterComponent
  },
  {
    path: 'grace-period-filter', component: GracePeriodFilterComponent, resolve: { data: GracePeriodFilterResolverService }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
