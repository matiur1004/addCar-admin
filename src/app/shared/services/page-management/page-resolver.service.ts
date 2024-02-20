// Resolver service for PageViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { PageViewModel } from '../../models/page-management/page-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';

import { PageService } from './page.service';


@Injectable()
export class PageResolverService implements Resolve<PageViewModel> {

  constructor(private pageService: PageService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): PageViewModel | Observable<PageViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.pageService.getPage(route.params['uid']).pipe(catchError(() => {
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
      return this.pageService.createPage();
    }
  }
}
