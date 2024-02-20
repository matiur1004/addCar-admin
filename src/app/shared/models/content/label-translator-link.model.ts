
import { BaseEntity } from "../base-entity.model";


export class LabelTranslatorLink extends BaseEntity {
  public translatorEmail: string;
  public languageUid: string;
  public labelCodes: Array<string>;

}
