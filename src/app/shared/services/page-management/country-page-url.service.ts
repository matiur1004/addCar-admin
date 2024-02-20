import { Injectable } from "@angular/core";
import { CountryPageTypes } from "../../models/enums";
import { PageViewModel } from "../../models/page-management/page-view-model.model";
import { CountryService } from "../franchisee/country.service";

@Injectable()
export class CountryPageUrlService {

  constructor(private countryService: CountryService) {

  }

  getPageTypeFromPath(path: string): CountryPageTypes {
    if (path.endsWith('terms-and-conditions'))
      return CountryPageTypes.TermsAndConditions;
    if (path.endsWith('conditions'))
      return CountryPageTypes.Conditions;
    if (path.endsWith('content'))
      return CountryPageTypes.LocationContent;
    if (path.endsWith('important-information'))
      return CountryPageTypes.ImportantInformation;

    return CountryPageTypes.General;
  }

  createCountryPage(pageType: CountryPageTypes, countryUid: string): PageViewModel {
    switch (pageType) {
      case CountryPageTypes.TermsAndConditions:
        return new PageViewModel(
          {
            countryUid: countryUid,
            name: `Terms and conditions`,
            url: `/conditions`,
            isCountrySpecific: true,
            countryPageType: CountryPageTypes.TermsAndConditions
          }
        );
      case CountryPageTypes.Conditions:
        return new PageViewModel(
          {
            countryUid: countryUid,
            name: `Conditions`,
            url: 'n/a',
            isCountrySpecific: true,
            countryPageType: CountryPageTypes.TermsAndConditions
          }
        );
      case CountryPageTypes.ImportantInformation:
        return new PageViewModel(
          {
            countryUid: countryUid,
            name: `Important information`,
            url: 'n/a',
            isCountrySpecific: true,
            countryPageType: CountryPageTypes.TermsAndConditions
          }
        );
      case CountryPageTypes.LocationContent:
        const page = new PageViewModel(
          {
            countryUid: countryUid,
            name: null,
            url: null,
            isCountrySpecific: true,
            countryPageType: CountryPageTypes.TermsAndConditions
          }
        );
        return page;
      default: throw new Error(`Unsupported page type: '${pageType}'`);
    }
  }

  getPageDetailsUrl(pageType: CountryPageTypes, countryUid: string): string {
    switch (pageType) {
      case CountryPageTypes.TermsAndConditions:
        return `/content-management/pages/country-page/${countryUid}/terms-and-conditions`;
      case CountryPageTypes.Conditions:
        return `/content-management/pages/country-page/${countryUid}/conditions`;
      case CountryPageTypes.ImportantInformation:
        return `/content-management/pages/country-page/${countryUid}/important-information`;
      case CountryPageTypes.LocationContent:
        return `/content-management/pages/country-page/${countryUid}/content`;
      default: throw new Error(`Unsupported page type: '${pageType}'`);
    }
  }

  getServerUrl(pageType: CountryPageTypes, countryUid: string): string {
    switch (pageType) {
      case CountryPageTypes.TermsAndConditions:
        return `api/page/by-country/${countryUid}/terms-and-conditions`;
      case CountryPageTypes.Conditions:
        return `api/page/by-country/${countryUid}/conditions`;
      case CountryPageTypes.ImportantInformation:
        return `api/page/by-country/${countryUid}/important-information`;
      case CountryPageTypes.LocationContent:
        return `api/page/by-country/${countryUid}/content`;
      default: throw new Error(`Unsupported page type: '${pageType}'`);
    }
  }

}
