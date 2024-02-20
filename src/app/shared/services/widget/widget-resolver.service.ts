// Resolver service for PageViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { PageViewModel } from '../../models/page-management/page-view-model.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { WidgetViewModel } from 'app/shared/models/widget/widget-view.model';
import { WidgetService } from './widget.service';
import { AuthService } from '../auth.new.service';
import { UserRoles } from 'app/shared/models/enums';



@Injectable()
export class WidgetResolverService implements Resolve<WidgetViewModel> {

  constructor(private widgetService: WidgetService, private spinnerService: SpinnerOverlayService, private authService: AuthService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): WidgetViewModel | Observable<WidgetViewModel> | Observable<never> {
    if (route.params['uid'] && route.params['uid'] !== 'new') {
      this.spinnerService.show();
      return this.widgetService.getWidget(route.params['uid']).pipe(catchError(() => {
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
      if(this.authService.isUserInRole(UserRoles.AddCarAdmin)) {
        return this.widgetService.createWidget();
      } else {
        this.router.navigate(['/content-management/widgets/page']);
      }
      
    }
  }
}
