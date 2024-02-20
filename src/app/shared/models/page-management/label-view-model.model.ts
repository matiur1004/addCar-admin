import { BaseEntity } from "../base-entity.model";

export class LabelViewModel extends BaseEntity {
  public code: string;
  public content: string; //client side only
  public defaultLanguageContent: string;
}
