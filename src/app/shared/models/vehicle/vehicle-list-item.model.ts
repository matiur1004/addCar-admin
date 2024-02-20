
import { BaseEntity } from "../base-entity.model";
import { FuelTypes, GearTypes } from "../enums";


export class VehicleListItem extends BaseEntity {
  public modelName: string;
  public gears: GearTypes;
  public passengers: number;
  public doors: number;
  public isCdPlayer: boolean;
  public isAirCondition: boolean;
  public isGps: boolean;
  public baggage: number;
  public engine: number;
  public fuel: FuelTypes;
  public isUsb: boolean;
  public categories: string;

}
