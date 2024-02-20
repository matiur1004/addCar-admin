// Service for processing server-side calls, related to FranchiseeViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseService} from '@app-shared/common/base.service';
import {ListPageWrapper} from '@app-shared/common/list-page-wrapper.model';
import {FranchiseeLightViewModel} from '@app-shared/models/franchisee-light-view-model.model';
import {FranchiseeShortListItem} from '@app-shared/models/franchisee-short-list-item.model';
import {FranchiseeListItem} from '@app-shared/models/franchisee-list-item.model';
import {FranchiseeViewModel} from '@app-shared/models/franchisee-view-model.model';
import {SpinnerOverlayService} from '../spinner-overlay.service';
import {LocationListItem} from '../../models/location-list-item.model';
import {SubFranchiseeListItem} from '../../models/sub-franchisee-list-item.model';

@Injectable()
export class FranchiseeService extends BaseService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private spinnerService: SpinnerOverlayService,
  ) {
    super();
    this.baseUrl = baseUrl;
  }

  createFranchisee(): FranchiseeViewModel {
    return new FranchiseeViewModel();
  }

  getFranchisee(uID: string): Observable<FranchiseeViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<FranchiseeViewModel>(this.baseUrl + 'api/franchisee/' + uID, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getFranchiseeLight(uID: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<FranchiseeViewModel>(this.baseUrl + 'api/franchisee/' + uID, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getMyFranchiseId(): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get(this.baseUrl + 'api/franchisee/my-franchisee-id', options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  saveFranchisee(item: FranchiseeViewModel): Observable<FranchiseeViewModel> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    const s = JSON.stringify(item);
    return this.http.post<FranchiseeViewModel>(this.baseUrl + 'api/franchisee/', s, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  getFranchisees(pageNum: number, searchText?: string): Observable<ListPageWrapper<FranchiseeListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};
    const query = (searchText) ? "?searchText=" + encodeURI(searchText) : "";

    return this.http
      .get<ListPageWrapper<FranchiseeListItem>>(
        `${this.baseUrl}api/franchisee/page/${pageNum}/${query}`,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  findFranchisees(name: string, isAll = false): Observable<Array<FranchiseeShortListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    let url = this.baseUrl + `api/franchisee/find?namePattern=${encodeURI(name)}`;
    if(isAll) url += '&getAll=true' ;
    return this.http.get<Array<FranchiseeShortListItem>>(url, options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }

  getFranchiseeLocations(uId: string): Observable<Array<LocationListItem>> {
    const headers = this.prepareHeaders();
    const options = {headers: headers};

    return this.http.get<Array<LocationListItem>>(this.baseUrl + `api/franchisee/${uId}/locations`, options)
      .pipe(map(res => {
          return res;
        }),
        catchError(err => this.handleError(err)));
  }


  loadWhiteLabelFranchisees(): Observable<Array<FranchiseeListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<Array<FranchiseeListItem>>(`${this.baseUrl}api/franchisee/having-white-label`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

}
