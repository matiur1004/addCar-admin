
import { BaseEntity } from "../base-entity.model";
import { FuelTypes, GearTypes } from "../enums";
import { VehicleCategoryListItem } from "./vehicle-category-list-item.model";


export class VehicleViewModel extends BaseEntity {
  public modelName: string;
  public gears: GearTypes = GearTypes.Automatic;
  public passengers: number = 2;
  public doors: number = 2;
  public isCdPlayer: boolean = false;
  public isAirCondition: boolean = false;
  public isGps: boolean = false;
  public baggage: number = 2;
  public engine: number = 0.1;
  public fuel: FuelTypes = FuelTypes.Gasoline;
  public isUsb: boolean = false;
  public categories: Array<VehicleCategoryListItem>;

}
