
import { BaseEntity } from "../base-entity.model";


export class CountryCategorySetupViewModel extends BaseEntity {
  public categoryUID: string;
  public modelName: string;
  public guaranteedModel: string;
  public guaranteedYear: string;
  public mileageApplication: string;
  public fuelPolicy: string;
  public doors: number;
  public passengers: number;
  public minDriverAge: number;
  public maxDriverAge: number;
  public fourWD: string;
  public deposit: number;
  public status?: boolean;
}
