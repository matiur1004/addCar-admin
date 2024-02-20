import { BaseEntity } from "../base-entity.model";

export class VehicleImageListItem extends BaseEntity {
  public vehicleUID: string;
  public imageFileUrl: string;
  public sequenceNo: number;
}
