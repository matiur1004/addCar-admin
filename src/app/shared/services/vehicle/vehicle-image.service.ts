import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BaseService } from '@app-shared/common/base.service';
import { VehicleImageListItem } from '../../models/vehicle/vehicle-image-list-item.model';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { ImageConverterService } from '@app-shared/services/vehicle/image-converter.service';

@Injectable()
export class VehicleImageService extends BaseService {
  baseUrl: string;
  constructor(
    private ics: ImageConverterService,
    private http: HttpClient,
    private spinnerService: SpinnerOverlayService,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    super();
    this.baseUrl = baseUrl;
  }

  loadVehicleImages(vehicleUid: string): Observable<Array<VehicleImageListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    return this.http
      .get<Array<VehicleImageListItem>>(
        `${this.baseUrl}api/vehicle/${vehicleUid}/image/list`,
        options,
      )
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  saveVehicleImage(vehicleUid: string, file: File, sequenceNo: number): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    options.headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');

    return this.ics.getPostBodyForFileUpload(file, vehicleUid, sequenceNo).pipe(
      switchMap((res) => {
        return this.http
          .post<VehicleImageListItem>(
            `${this.baseUrl}api/vehicle/${vehicleUid}/image`,
            res,
            options,
          )
          .pipe(
            map((res) => {
              return res;
            }),
            catchError((err) => this.handleError(err)),
          );
      }),
    );
  }

  deleteVehicleImage(vehicleUid: string, uid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    this.spinnerService.show('Deleting...');
    return this.http.delete(`${this.baseUrl}api/vehicle/${vehicleUid}/image/${uid}`, options).pipe(
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

  getVehicleCount(uid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.get<any>(`${this.baseUrl}api/vehicle/${uid}/image/count`, options);
  }
}
