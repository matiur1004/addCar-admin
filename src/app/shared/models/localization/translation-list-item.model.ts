import { BaseEntity } from "../base-entity.model";

export class TranslationListItem extends BaseEntity {
  public languageUid: string;
  public content: string;
}
