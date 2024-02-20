// Service for processing server-side calls, related to PageViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";
import { BaseService } from "../../common/base.service";
import { SpinnerOverlayService } from "../spinner-overlay.service";
import { PageViewModel } from "../../models/page-management/page-view-model.model";
import { ListPageWrapper } from "../../common/list-page-wrapper.model";
import { PageListItem } from "../../models/page-management/page-list-item.model";
import { CountryPageTypes } from "../../models/enums";
import { CountryPageUrlService } from "./country-page-url.service";

@Injectable()
export class PageService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
    private countryPageUrlService: CountryPageUrlService,
    private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  createPage(): PageViewModel {
    return new PageViewModel();
  }

  createTermsAndConditionsPageForCountry(countryUid): PageViewModel {
    return new PageViewModel(
      {
        countryUid: countryUid,
        name: `Terms and conditions`,
        url: `/conditions`,
        isCountrySpecific: true,
        countryPageType: CountryPageTypes.TermsAndConditions
      }
    );
  }

  getPage(uID: string): Observable<PageViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<PageViewModel>(this.baseUrl + "api/page/" + uID, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getCountryPage(pageType: CountryPageTypes, countryUid: string): Observable<PageViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const serverUrl = this.countryPageUrlService.getServerUrl(pageType, countryUid);
    return this.http.get<PageViewModel>(`${this.baseUrl}${serverUrl}`, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  savePage(item: PageViewModel): Observable<PageViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    const s = JSON.stringify(item);
    if (item.isCountrySpecific) {
      const serverUrl = this.countryPageUrlService.getServerUrl(item.countryPageType, item.countryUid);
      return this.http.put<PageViewModel>(`${this.baseUrl}${serverUrl}`, s, options)
        .pipe(map(res => {
          return res;
        }),
          catchError(err => this.handleError(err)));
    } else {
      return this.http.post<PageViewModel>(this.baseUrl + "api/page/", s, options)
        .pipe(map(res => {
          return res;
        }),
          catchError(err => this.handleError(err)));
    }
  }

  clonePage(uID: string): Observable<PageViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<PageViewModel>(this.baseUrl + "api/page/clone/" + uID, null, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getPages(pageNum: number, franchiseeUid: string = null): Observable<ListPageWrapper<PageListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    const query = franchiseeUid ? "?franchiseeUid=" + franchiseeUid : "";

    return this.http.get<ListPageWrapper<PageListItem>>(this.baseUrl + "api/page/page/" + pageNum + query, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  deletePage(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    this.spinnerService.show("Deleting Page");
    return this.http.delete(this.baseUrl + "api/page/" + uID, options)
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
