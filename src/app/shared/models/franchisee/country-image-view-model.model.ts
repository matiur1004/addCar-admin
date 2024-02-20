
import { BaseEntity } from "../base-entity.model";


export class CountryImageViewModel extends BaseEntity {
  public countryUID: string;
  public imageData: string;
  public imageMd5: string;

}
