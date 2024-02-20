
import { BaseEntity } from "../base-entity.model";
import { CountryCategorySetupViewModel } from "./country-category-setup-view-model.model";


export class CountryViewModel extends BaseEntity {
  public name: string;
  public refuelCharge: number;
  public missingFuelCharge: number;
  public penalty: number;
  public categorySetups: Array<CountryCategorySetupViewModel> = [];

}
