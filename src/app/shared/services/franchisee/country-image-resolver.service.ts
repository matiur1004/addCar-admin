// Resolver service for CountryImageViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { CountryImageViewModel } from '../../models/franchisee/country-image-view-model.model';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { CountryImageService } from './country-image.service';


@Injectable()
export class CountryImageResolverService implements Resolve<any> {

  constructor(private countryImageService: CountryImageService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.countryImageService.showCountryImage(route.params['uid']).pipe(catchError((error) => {
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
}
