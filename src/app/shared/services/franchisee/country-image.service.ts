// Service for processing server-side calls, related to CountryImageViewModel

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";

import { SpinnerOverlayService } from "../spinner-overlay.service";
import { BaseService } from '../../common/base.service';
import { CountryImageViewModel } from "../../models/franchisee/country-image-view-model.model";
import { ImageConverterService } from "../vehicle/image-converter.service";
import { switchMap } from "rxjs/operators";


@Injectable()
export class CountryImageService extends BaseService {

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,  ) {
    super();
    this.baseUrl = baseUrl;
  }

  createCountryImage(): CountryImageViewModel {
    return new CountryImageViewModel();
  }

  saveCountryImage(uid: string, file: File): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    options.headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .post(`${this.baseUrl}api/countryimage/${uid}`, formData, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  showCountryImage(uid: string): Observable<any>{
    return this.http
      .get(`${this.baseUrl}api/countryimage/${uid}`, { responseType: 'blob' })
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
    );
    
  }
  deleteImage(uid: string): Observable<any>{
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http.delete(`${this.baseUrl}api/countryimage/${uid}`, options)
      .pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
        return this.handleError(err);
      }),
    );
  }
}
