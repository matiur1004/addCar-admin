// Service for processing server-side calls, related to VehicleViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { VehicleViewModel } from "../../models/vehicle/vehicle-view-model.model";
import { VehicleListItem } from "../../models/vehicle/vehicle-list-item.model";


@Injectable()
export class VehicleService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  createVehicle(): VehicleViewModel {
    return new VehicleViewModel();
  }

  getVehicle(uid: string): Observable<VehicleViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<VehicleViewModel>(`${this.baseUrl}api/vehicle/${uid}`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


  saveVehicle(item: VehicleViewModel): Observable<VehicleViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<VehicleViewModel>(`${this.baseUrl}api/vehicle/`, item, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  cloneVehicle(uID: string): Observable<VehicleViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.post<VehicleViewModel>(this.baseUrl + "api/vehicle/clone/" + uID, null, options)
      .pipe(map(res => {
        return res;
      }),
        catchError(err => this.handleError(err)));
  }

  getVehicles(pageNum: number, searchText: string, categories: string): Observable<ListPageWrapper<VehicleListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    let query = "?";
    query = query + ((searchText) ? "searchText=" + encodeURI(searchText) : "") + "&";
    if (categories) query = query + "categories=" + categories + "&";

    return this.http
      .get<ListPageWrapper<VehicleListItem>>(`${this.baseUrl}api/vehicle/page/${pageNum}${query}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  findVehicles(searchText: string = ''): Observable<VehicleListItem[]> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    let query = "?";
    query = query + ((searchText) ? "searchText=" + encodeURI(searchText) : "") + "&";

    return this.http
      .get<VehicleListItem[]>(`${this.baseUrl}api/vehicle/find${query}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  deleteVehicle(uid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    this.spinnerService.show('Deleting...');
    return this.http.delete(`${this.baseUrl}api/vehicle/${uid}`, options).pipe(
      map((res) => {
        this.spinnerService.hide();
        return res;
      }),
      catchError((err) => {
        this.spinnerService.hide();
        return this.handleError(err);
      }),
    );
  }

}
