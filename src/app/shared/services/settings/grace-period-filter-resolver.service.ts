// Resolver service for TranslationSettingsViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GracePeriodFilterViewModel } from 'app/shared/models/settings/grace-period-filter-view-model.model';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { FiltersSettingsService } from './filters-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';



@Injectable()
export class GracePeriodFilterResolverService implements Resolve<GracePeriodFilterViewModel> {

  constructor(private service: FiltersSettingsService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): GracePeriodFilterViewModel | Observable<GracePeriodFilterViewModel> | Observable<never> {
    this.spinnerService.show();
    return this.service.getGracePeriodFilter().pipe(catchError(() => {
      this.spinnerService.hide();
      return EMPTY;
    }), mergeMap(something => {
      if (something) {
        this.spinnerService.hide();
        return of(something);
      } else {
        this.spinnerService.hide();
        return EMPTY;
      }
    })
    );
  }
}
