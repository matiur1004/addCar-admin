import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BaseService } from "app/shared/common/base.service";
import { SpinnerOverlayService } from "../spinner-overlay.service";
import { WidgetViewModel } from "app/shared/models/widget/widget-view.model";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ListPageWrapper } from "app/shared/common/list-page-wrapper.model";
import { WidgetListItem } from "app/shared/models/widget/widget-list-item.model";

@Injectable()
export class WidgetService extends BaseService {
    baseUrl: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
        private spinnerService: SpinnerOverlayService) {
        super();
        this.baseUrl = baseUrl;
    }
    
    createWidget(): WidgetViewModel {
        return new WidgetViewModel();
    }

    getWidget(uID: string): Observable<WidgetViewModel> {
        const headers = this.prepareHeaders();
        const options = { headers: headers };
        return this.http.get<WidgetViewModel>(this.baseUrl + "api/widget/" + uID, options)
          .pipe(map(res => {
            return res;
          }),
            catchError(err => this.handleError(err)));
    }

    getWidgets(pageNum: number, franchiseeUid: string = null): Observable<ListPageWrapper<WidgetListItem>> {
        const headers = this.prepareHeaders();
        const options = { headers: headers };
    
        const query = franchiseeUid ? "?franchiseeUid=" + franchiseeUid : "";
    
        return this.http.get<ListPageWrapper<WidgetListItem>>(this.baseUrl + "api/Widget/page/" + pageNum + query, options)
          .pipe(map(res => {
            return res;
          }),
            catchError(err => this.handleError(err)));
    }

    saveWidget(item: WidgetViewModel): Observable<WidgetViewModel> {
      const headers = this.prepareHeaders();
      const options = { headers: headers };
      const s = JSON.stringify(item);
      // if (item.isCountrySpecific) {
      //   const serverUrl = this.countryPageUrlService.getServerUrl(item.countryPageType, item.countryUid);
      //   return this.http.put<PageViewModel>(`${this.baseUrl}${serverUrl}`, s, options)
      //     .pipe(map(res => {
      //       return res;
      //     }),
      //       catchError(err => this.handleError(err)));
      // } else {
      //   return this.http.post<PageViewModel>(this.baseUrl + "api/page/", s, options)
      //     .pipe(map(res => {
      //       return res;
      //     }),
      //       catchError(err => this.handleError(err)));
      // }

      return this.http.post<WidgetViewModel>(this.baseUrl + "api/widget/", s, options)
          .pipe(map(res => {
            return res;
          }),
            catchError(err => this.handleError(err)));
    }
}