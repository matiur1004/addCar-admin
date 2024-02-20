// Service for processing server-side calls, related to Labels

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { LabelTranslationListItem } from "../../models/localization/label-translation-list-item.model";


@Injectable()
export class LabelService extends BaseService {

  baseUrl: string;

  codesArray: string[] = [];

  codeCount: number;
  private _selectCountStatusSource = new BehaviorSubject<boolean>(false);
  public selectCountStatus$ = this._selectCountStatusSource.asObservable();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
    this._selectCountStatusSource.next(true);

  }


  getLabels(searchText: string, languageUid: string, pageNum: number): Observable<ListPageWrapper<LabelTranslationListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    let query = "?";
    query = query + ((searchText) ? "searchText=" + encodeURI(searchText) : "") + "&";
    //if (hideNoInvoices)query = query + "hideNoInvoices=" + hideNoInvoices + "&";
    return this.http
      .get<ListPageWrapper<LabelTranslationListItem>>(`${this.baseUrl}api/label/page/${pageNum}/language/${languageUid}${query}`, options)
      .pipe(
        map((res) => {
          if (this.codesArray.length != 0 && res.items != undefined) {
            res.items.forEach((item) => {
              if (this.codesArray.filter(a => a == item.code).length > 0) {
                item.isChecked = true;
              }

            });

          }
          return res;
        }),
        catchError((err) => this.handleError(err)),
    );

  }
  addLabelcode(codenumber: string): number{
    this.codeCount = this.codesArray.push(codenumber);
    return this.codeCount;

  }

  deleteLabelcode(codenumber: string): number {

    this.codesArray.splice((this.codesArray.indexOf(codenumber)), 1);

    this.codeCount--;
    return this.codeCount;

  }
  statusTrue() {
    this._selectCountStatusSource.next(true);
  }
  statusFalse() {

    this._selectCountStatusSource.next(false);
  }

  clearSelectItems() {
    this.codesArray.length = 0;
    this.codeCount = 0;
    this.statusFalse();
  }
  getCount() {
    return this.codesArray.length;
  }
  getLabelCodes() {
    return this.codesArray;
  }
  saveLabel(item: LabelTranslationListItem, languageUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.put<any>(`${this.baseUrl}api/label/language/${languageUid}`, item, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  removeLabel(code: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.delete<any>(`${this.baseUrl}api/label/${code}`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

}
