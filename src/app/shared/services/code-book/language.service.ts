import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '@app-shared/common/base.service';
import { LanguageListItem } from '../../models/localization/language-list-item.model';

@Injectable()
export class LanguageService extends BaseService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    super();
    this.baseUrl = baseUrl;
  }

  getLanguages(): Observable<Array<LanguageListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<Array<LanguageListItem>>(this.baseUrl + 'api/codebook/languages', options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }
  getLanguagesexceptEnglish(): Observable<Array<LanguageListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.get<Array<LanguageListItem>>(this.baseUrl + 'api/codebook/languages', options).pipe(
      map((res) => {
        let index = res.findIndex(d => d.name === "English");
        res.splice(index, 1);
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }
}
