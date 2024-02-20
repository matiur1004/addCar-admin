import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SpinnerOverlayService } from '@app-shared/services/spinner-overlay.service';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { VehicleImageService } from '@app-shared/services/vehicle/vehicle-image.service';
import { VehicleImageListItem } from '@app-shared/models/vehicle/vehicle-image-list-item.model';

@Injectable()
export class VehicleImageResolverService implements Resolve<VehicleImageListItem[]> {
  constructor(private vis: VehicleImageService, private spinnerService: SpinnerOverlayService) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): VehicleImageListItem[] | Observable<VehicleImageListItem[]> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.vis.loadVehicleImages(route.params['uid']).pipe(
        catchError(() => {
          this.spinnerService.hide();
          return EMPTY;
        }),
        mergeMap((something) => {
          if (something) {
            this.spinnerService.hide();
            return of(something);
          } else {
            this.spinnerService.hide();
            return EMPTY;
          }
        }),
      );
    }
  }
}
