// Resolver service for WidgetListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';
import { SpinnerOverlayService } from '../spinner-overlay.service';

import { WidgetListItem } from 'app/shared/models/widget/widget-list-item.model';
import { WidgetService } from './widget.service';


@Injectable()
export class WidgetListResolverService implements Resolve<ListPageWrapper<WidgetListItem>> {

  constructor(private widgetService: WidgetService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<WidgetListItem> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/content-management/widgets`);

    const franchiseeUid = (route.queryParams['franchiseeUid']) ? route.queryParams['franchiseeUid'] : null;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/content-management/widgets`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/content-management/widgets/page/${settings.page}`])
      return;
    }

    this.spinnerService.show();
    return this.widgetService.getWidgets(+page, franchiseeUid).pipe(catchError(error => {
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
