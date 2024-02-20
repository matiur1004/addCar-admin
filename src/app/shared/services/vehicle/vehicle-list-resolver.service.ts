// Resolver service for VehicleListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { ListSettingsService } from '../list-settings.service';

import { VehicleService } from './vehicle.service';
import { VehicleListItem } from '../../models/vehicle/vehicle-list-item.model';


@Injectable()
export class VehicleListResolverService implements Resolve<ListPageWrapper<VehicleListItem>> {

  constructor(private vehicleService: VehicleService, private router: Router, private spinnerService: SpinnerOverlayService, private listSettings: ListSettingsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ListPageWrapper<VehicleListItem> | Observable<any> | Observable<never> {
    let page = "1";
    const settings = this.listSettings.get(`/vehicles`);
    const searchText = (route.queryParams['searchText']) ? route.queryParams['searchText'] : null;
    const categories = (route.queryParams['categories']) ? route.queryParams['categories'] : null;

    if (route.params['pageNum']) {
      page = route.params['pageNum'];
      this.listSettings.set(`/vehicles`, { page: page });
    } else if (settings && settings.page) {
      this.router.navigate([`/vehicles/page/${settings.page}`])
      return;
    }

    this.spinnerService.show();
    return this.vehicleService.getVehicles(+page, searchText, categories).pipe(catchError(error => {
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
