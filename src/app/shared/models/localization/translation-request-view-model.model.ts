import { BaseEntity } from "../base-entity.model";

export class TranslationRequestViewModel extends BaseEntity {

  public constructor(init?: Partial<TranslationRequestViewModel>) {
    super();
    Object.assign(this, init);
  }

  public isHtml = true;
  public sourceLanguageUid: string;
  public content: string;
  public destinationLanguageUids: string[] = [];
}
