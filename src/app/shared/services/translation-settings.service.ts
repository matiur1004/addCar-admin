// Service for processing server-side calls, related to TranslationSettingsViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "./spinner-overlay.service";
import { BaseService } from '../common/base.service';
import { TranslationSettingsViewModel } from '../models/translation-settings-view-model.model';


@Injectable()
export class TranslationSettingsService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  getTranslationSettings(): Observable<TranslationSettingsViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<TranslationSettingsViewModel>(this.baseUrl + "api/translationsettings", options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  addLanguage(uid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show("Adding Language");
    return this.http.put(this.baseUrl + "api/translationsettings/" + uid, options)
      .pipe(map(res => {
        this.spinnerService.hide();
        return res;
      }),
        catchError(err => {
          this.spinnerService.hide();
          return this.handleError(err);
        }));
  }

  deleteLanguage(uid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show("Deleting Language");
    return this.http.delete(this.baseUrl + "api/translationsettings/" + uid, options)
      .pipe(map(res => {
        this.spinnerService.hide();
        return res;
      }),
        catchError(err => {
          this.spinnerService.hide();
          return this.handleError(err);
        }));
  }

}
