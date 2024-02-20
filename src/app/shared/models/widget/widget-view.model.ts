import { BaseEntity } from "../base-entity.model";
import { CountryPageTypes, PageTypes } from "../enums";
import { TextEntryViewModel } from "../localization/text-entry-view-model.model";

export class WidgetViewModel extends BaseEntity {

  public constructor(init?: Partial<WidgetViewModel>) {
    super();
    Object.assign(this, init);
  }

  public name: string;
  public notes: string;
  public isCountrySpecific: boolean;
  public countryPageType: CountryPageTypes;
  public pageType: PageTypes;
  public countryUid: string;
  public localizedTitles: Array<TextEntryViewModel> = [];
  public localizedTexts: Array<TextEntryViewModel> = [];
  public isDraft = false;
}
