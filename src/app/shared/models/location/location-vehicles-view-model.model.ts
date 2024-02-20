import { BaseEntity } from "../base-entity.model";
import { CategoryVehiclesListItem } from "./category-vehicles-list-item.model";

export class LocationVehiclesViewModel extends BaseEntity {
  public locationName: string;
  public categories: Array<CategoryVehiclesListItem>;

}
