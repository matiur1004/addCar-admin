import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";
import { BaseService } from "../../common/base.service";
import { MinPriceFilterViewModel } from "../../models/settings/min-price-filter-view-model.model";
import { SpinnerOverlayService } from "../spinner-overlay.service";
import { GracePeriodFilterViewModel } from "../../models/settings/grace-period-filter-view-model.model";

@Injectable()
export class FiltersSettingsService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;
  }

  getMinPriceFilter(franchiseeUid: string): Observable<MinPriceFilterViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<MinPriceFilterViewModel>(`${this.baseUrl}api/settings/filters/min-price-for-franchisee/${franchiseeUid}`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }

  saveMinPriceFilter(franchiseeUid: string, item: MinPriceFilterViewModel): Observable<MinPriceFilterViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.put<MinPriceFilterViewModel>(`${this.baseUrl}api/settings/filters/min-price-for-franchisee/${franchiseeUid}`, item, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


  getGracePeriodFilter(): Observable<GracePeriodFilterViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<GracePeriodFilterViewModel>(`${this.baseUrl}api/settings/filters/grace-period`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }


  saveGracePeriodFilter(item: GracePeriodFilterViewModel): Observable<GracePeriodFilterViewModel> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.put<GracePeriodFilterViewModel>(`${this.baseUrl}api/settings/filters/grace-period`, item, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


}
