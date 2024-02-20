import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FranchiseeViewModel} from '../models/franchisee-view-model.model';
import { Output, EventEmitter } from '@angular/core';
import {VehicleViewModel} from "@app-shared/models/vehicle/vehicle-view-model.model";

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public static _app_version: string;
  public versionemitter = new EventEmitter<string>();
  public _franchiseeDetailSource = new Subject<FranchiseeViewModel>();
  public _vehicleDetailsSource = new Subject<VehicleViewModel>();

  public emitFranchiseeDetail(detail: any) {
    this._franchiseeDetailSource.next(detail);
  }

  public emitVehicleDetails(detail: any) {
    this._vehicleDetailsSource.next(detail);
  }


  public emitVersion() {
    this.versionemitter.emit(GlobalService._app_version);
  }
}
