import { BaseEntity } from "../base-entity.model";

export class WidgetListItem extends BaseEntity {
  public name: string;
  public url: string;
  public defaultTitle: string;
  public isSiteStructure: boolean;
}
