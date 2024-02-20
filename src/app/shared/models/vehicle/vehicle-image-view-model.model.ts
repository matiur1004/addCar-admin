import { BaseEntity } from "../base-entity.model";

export class VehicleImageViewModel extends BaseEntity {
  public vehicleUID: string;
  public imageData: string;
  public imageMd5: string;
  public sequenceNo: number;
}
