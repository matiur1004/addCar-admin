import { BaseEntity } from "../base-entity.model";
import { CountryPageTypes, PageTypes } from "../enums";
import { TextEntryViewModel } from "../localization/text-entry-view-model.model";
import { MetaTagViewModel } from "./meta-tag-view-model.model";

export class PageViewModel extends BaseEntity {

  public constructor(init?: Partial<PageViewModel>) {
    super();
    Object.assign(this, init);
  }

  public name: string;
  public url: string;
  public isCountrySpecific: boolean;
  public countryPageType: CountryPageTypes;
  public pageType: PageTypes;
  public countryUid: string;
  public localizedTitles: Array<TextEntryViewModel> = [];
  public metaTags: Array<MetaTagViewModel> = [];
  public localizedTexts: Array<TextEntryViewModel> = [];
  public isDraft = false;
}
