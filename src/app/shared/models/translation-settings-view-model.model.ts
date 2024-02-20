
import { BaseEntity } from "./base-entity.model";
import { LanguageListItem } from "./localization/language-list-item.model";


export class TranslationSettingsViewModel extends BaseEntity {
  public activeLanguages: Array<LanguageListItem>;
  public defaultLanguageUid: string ;

}
