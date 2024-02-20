import { BaseEntity } from "../base-entity.model";

export class TextEntryViewModel extends BaseEntity {
  constructor(languageUid: string) {
    super();
    this.languageUID = languageUid;
  }

  public languageUID: string;
  public name: string;
  public content: string;

}
