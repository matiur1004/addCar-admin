import { BaseEntity } from './base-entity.model';
import { AddressViewModel } from './address-view-model.model';

export class FranchiseeViewModel extends BaseEntity {
  public name: string;
  public email: string;
  public isPublicSiteManagementEnabled = false;
  public websiteName: string;
  public websiteDomain: string;
  public defaultLanguageUID: string;
  public userCount = 0;
  public locationCount = 0;

  

  //End TODO
}
