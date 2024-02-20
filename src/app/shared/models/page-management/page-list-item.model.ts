import { BaseEntity } from "../base-entity.model";

export class PageListItem extends BaseEntity {
  public name: string;
  public url: string;
  public defaultTitle: string;
  public isSiteStructure: boolean;
}
