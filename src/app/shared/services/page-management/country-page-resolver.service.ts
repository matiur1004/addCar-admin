// Resolver service for PageViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError, tap } from 'rxjs/operators';
import { CountryPageTypes } from '../../models/enums';
import { PageViewModel } from '../../models/page-management/page-view-model.model';
import { CountryService } from '../franchisee/country.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { CountryPageUrlService } from './country-page-url.service';

import { PageService } from './page.service';


@Injectable()
export class CountryPageResolverService implements Resolve<PageViewModel> {

  constructor(private pageService: PageService, private countryPageUrlService: CountryPageUrlService,
    private countryService: CountryService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): PageViewModel | Observable<PageViewModel> | Observable<never> {
    //console.log(route.routeConfig.path);
    //return this.pageService.createPage();
    if (route.params['countryUid']) {
      const pageType = this.countryPageUrlService.getPageTypeFromPath(route.routeConfig.path);
      if (pageType !== CountryPageTypes.General) {
        this.spinnerService.show();
        return this.pageService.getCountryPage(pageType, route.params['countryUid']).pipe(catchError((err) => {
          this.spinnerService.hide();
          if (err.status === 404)
            return of(this.countryPageUrlService.createCountryPage(pageType, route.params['countryUid']));
          return EMPTY;
        }),
          mergeMap(something => {
            if (something) {
              something.countryPageType = pageType;
              something.countryUid = route.params['countryUid'];
              this.spinnerService.hide();
              return of(something);
            } else {
              this.spinnerService.hide();
              return of(this.countryPageUrlService.createCountryPage(pageType, route.params['countryUid']));
            }
          }),
          mergeMap(page => {
            if (pageType === CountryPageTypes.LocationContent && page) {
              return this.countryService.getCountryLight(route.params['countryUid']).pipe(mergeMap(country => {
                page.url = "/" + country.name.toLowerCase().replace(" ", "-").replace(".", "");
                page.name = "Location content for " + country.name;
                return of(page);
              }));
            } else {
              return of(page);
            }
          })
        );
      }
      else {
        return EMPTY;
      }
    }
    else {
      return EMPTY;
    }
  }
}
