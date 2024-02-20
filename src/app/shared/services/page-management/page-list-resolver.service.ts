// Resolver service for PageListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { PageListItem } from '../../models/page-management/page-list-item.model';
import { ListSettingsService } from '../list-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';


import { PageService } from './page.service';


@Injectable()
export class PageListResolverService implements Resolve<ListPageWrapper<PageListItem>> {

  constructor(private pageService: PageService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<PageListItem> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/content-management/pages`);

    const franchiseeUid = (route.queryParams['franchiseeUid']) ? route.queryParams['franchiseeUid'] : null;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/content-management/pages`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/content-management/pages/page/${settings.page}`])
      return;
    }

    this.spinnerService.show();
    return this.pageService.getPages(+page, franchiseeUid).pipe(catchError(error => {
      this.spinnerService.hide();
      return EMPTY;
    }), mergeMap(something => {
      this.spinnerService.hide();
      if (something) {
        return of(something);
      } else {
        return EMPTY;
      }
    })
    );
  }
}
