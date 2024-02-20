// Resolver service for TranslationSettingsViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { SpinnerOverlayService } from './spinner-overlay.service';
import { TranslationSettingsService } from './translation-settings.service';
import { TranslationSettingsViewModel } from '../models/translation-settings-view-model.model';


@Injectable()
export class TranslationSettingsResolverService implements Resolve<TranslationSettingsViewModel> {

  constructor(private translationSettingsService: TranslationSettingsService, private spinnerService: SpinnerOverlayService) { }

  resolve(route: ActivatedRouteSnapshot): TranslationSettingsViewModel | Observable<TranslationSettingsViewModel> | Observable<never> {
    this.spinnerService.show();
    return this.translationSettingsService.getTranslationSettings().pipe(catchError(() => {
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
