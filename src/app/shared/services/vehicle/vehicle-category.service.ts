import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from '@app-shared/common/base.service';
import { VehicleCategoryListItem } from '../../models/vehicle/vehicle-category-list-item.model';

@Injectable()
export class VehicleCategoryService extends BaseService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    super();
    this.baseUrl = baseUrl;
  }


  loadVehicleCategories(searchText: string): Observable<Array<VehicleCategoryListItem>> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };

    let query = "?";
    query = query + ((searchText) ? "searchText=" + encodeURI(searchText) : "") + "&";
    //if (hideNoInvoices)query = query + "hideNoInvoices=" + hideNoInvoices + "&";

    return this.http
      .get<Array<VehicleCategoryListItem>>(`${this.baseUrl}api/vehiclecategory/list${query}`, options)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err) => this.handleError(err)),
      );
  }

  addVehicleToCategory(categoryUid: string, vehicleUid: string): Observable<any> {
    const headers = this.prepareHeaders();
    const options = { headers: headers };
    return this.http.put(`${this.baseUrl}api/vehiclecategory/${categoryUid}/add-vehicle/${vehicleUid}`, options).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => this.handleError(err)),
    );
  }
}
