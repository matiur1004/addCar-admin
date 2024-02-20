// Service for processing server-side calls, related to Translations

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { TranslationRequestViewModel } from "../../models/localization/translation-request-view-model.model";
import { TranslationListItem } from "../../models/localization/translation-list-item.model";
import { LabelTranslatorLinkViewModel } from "../../models/localization/label-translator-link-view-model.model";
import { PageTranslatorLinkViewModel } from "../../models/localization/page-translator-link-view-model.model";
import { TextEntryViewModel } from "../../models/localization/text-entry-view-model.model";


@Injectable()
export class TranslateService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  translate(item: TranslationRequestViewModel): Observable<TranslationListItem[]> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<TranslationListItem[]>(`${this.baseUrl}api/translate`, item, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  saveLabelTranslation(item: LabelTranslatorLinkViewModel): Observable<string> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<string>(`${this.baseUrl}api/Translate/labels/create-link`, item, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }
  savePageTranslation(item: PageTranslatorLinkViewModel): Observable<string> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<string>(`${this.baseUrl}api/Translate/page/create-link`, item, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }
  getContent(uid: string): Observable<string> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
  //  return this.http.get<string>(`${this.baseUrl}api/translator-page/${uid}/content`, options).pipe(
  //    map((res) => {
   //     return res;
   //   }),
   //   catchError((err) => this.handleError(err)),
    // );
    return of("TEST TEXT IN HTML EDITOR ");
  }


  getEnglishText(uid: string): Observable<string> {


    const headers = this.prepareHeaders();
    const options = { headers: headers };
  //  return this.http.get<string>(`${this.baseUrl}api/translator-page/${uid}/original`, options).pipe(
   //   map((res) => {
   //     return res;
  // //   }),
  //    catchError((err) => this.handleError(err)),
  //  );
    return of('<h1>inside_h1 </h1>');

  }
}
