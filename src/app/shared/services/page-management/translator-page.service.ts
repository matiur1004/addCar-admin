// Service for processing server-side calls, related to page translations

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";
import { BaseService } from "../../common/base.service";

@Injectable()
export class TranslatorPageService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }


  getTranslatorPageOriginal(uid: string): Observable<string> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<string>(`${this.baseUrl}api/translator-page/${uid}/original`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


  getTranslatorPageContent(uid: string): Observable<string> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<string>(`${this.baseUrl}api/translator-page/${uid}/content`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


  saveTranslatorPageDraft(uid: string, content: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.put<any>(`${this.baseUrl}api/translator-page/${uid}/draft`, content, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


  submitTranslatorPage(uid: string, content: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.put<any>(`${this.baseUrl}api/translator-page/${uid}/submit`, content, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

}
