import { BaseEntity } from "../base-entity.model";
import { CategoryVehicleListItem } from "./category-vehicle-list-item.model";

export class CategoryVehiclesListItem extends BaseEntity {
  public categoryName: string;
  public vehicles: Array<CategoryVehicleListItem> = [];

  //True if any of the vehicles is selected
  public get isVehicleSelected(): boolean {
    if (!this.vehicles)
      return false;
    return this.vehicles.filter(a => a.isSelected === true).length > 0;
  }

}
