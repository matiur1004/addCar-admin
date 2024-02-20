import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/internal/operators/map";
import { catchError } from 'rxjs/operators';
import { SpinnerOverlayComponent } from '../../../spinner/spinner-overlay.component';
import { BaseService } from '../../common/base.service';
import { ListPageWrapper } from '../../common/list-page-wrapper.model';
import { LabelTranslationListItem } from '../../models/localization/label-translation-list-item.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';

@Injectable({
  providedIn: 'root'
})
export class InterpreterViewLabelsService extends BaseService{
  baseUrl: string;




  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private spinnerService: SpinnerOverlayService) {
    super();
    this.baseUrl = baseUrl;

  }


  getInterpreterLabels(searchText: string, linkUid: string, pageNum: number): Observable<ListPageWrapper<LabelTranslationListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
  //  let query = "?";
   // query = query + ((searchText) ? "searchText=" + encodeURI(searchText) : "") + "&";
    //if (hideNoInvoices)query = query + "hideNoInvoices=" + hideNoInvoices + "&";

    return this.http             //api/label/page/${pageNum}/language/${languageUid}${query}
      .get<ListPageWrapper<LabelTranslationListItem>>(`${this.baseUrl}api/translator-label/page/${pageNum}/link/${linkUid}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );

  }

  saveInterpreterLabel(item: LabelTranslationListItem, linkUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.put<any>(`${this.baseUrl}api/translator-label/link/${linkUid}`, item, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }


}
