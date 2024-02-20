// Resolver service for CountryViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { CountryViewModel } from '../../models/country/country-view-model.model';
import { CountryService } from '../franchisee/country.service';

import { SpinnerOverlayService } from '../spinner-overlay.service';


@Injectable()
export class CountryResolverService implements Resolve<CountryViewModel> {

  constructor(private countryService: CountryService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): CountryViewModel | Observable<CountryViewModel> | Observable<never> {
    if (route.params['uid']) {
      this.spinnerService.show();
      return this.countryService.getCountry(route.params['uid']).pipe(catchError(() => {
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
    else {
      return EMPTY;
    }
  }
}
