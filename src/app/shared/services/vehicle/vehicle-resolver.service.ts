// Resolver service for VehicleViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { VehicleViewModel } from '../../models/vehicle/vehicle-view-model.model';

import { SpinnerOverlayService } from '../spinner-overlay.service';
import { VehicleService } from './vehicle.service';

@Injectable()
export class VehicleResolverService implements Resolve<VehicleViewModel> {

  constructor(private vehicleService: VehicleService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): VehicleViewModel | Observable<VehicleViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.vehicleService.getVehicle(route.params['uid']).pipe(catchError(() => {
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
      return this.vehicleService.createVehicle();
    }
  }
}
