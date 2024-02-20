import { BaseEntity } from "../base-entity.model";

export class LabelTranslationListItem extends BaseEntity {
  public isChecked:boolean= false;
  public code: string;
  public description: string;
  public content: string;
  public defaultLanguageContent: string;
}
