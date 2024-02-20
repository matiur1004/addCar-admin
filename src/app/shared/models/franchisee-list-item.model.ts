import { BaseEntity } from './base-entity.model';

export class FranchiseeListItem extends BaseEntity {
  public name: string;
  public email: string;
  public countryName: string;
  public websiteDomain: string;
  public userCount = 0;
  public countryUid: string;
}
