// Code behind logic for list of LocationListItem
// @ts-ignore

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { OnInit, Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

import { PagerService } from "@app-shared/common/pager.service";
import { ListPageWrapper } from "@app-shared/common/list-page-wrapper.model";
import { NotificationService } from "@app-shared/services/notification.service";
import { SpinnerOverlayService } from "@app-shared/services/spinner-overlay.service";
import { LocationListItem } from '@app-shared/models/franchisee/location-list-item.model';
import { LocationService } from '@app-shared/services/location/location.service';


@Component({
  templateUrl: './location-list.component.html',
})

export class LocationListComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription; //Used for the current model retrieval from the resolver

  pageWrapper: ListPageWrapper<LocationListItem>;
  locations: Array<LocationListItem>;
  countries: Array<string>;
  pager: any = {};

  constructor(
    private defaultService: LocationService,
    private pagerService: PagerService,
    private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute) {
  }

  searchText: string;
  selectedCountryUID: string;

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe(
      (data: { datas: ListPageWrapper<LocationListItem> }) => {
        this.pageWrapper = data.datas;
        this.locations = data.datas.items;
        const filteredCountries = data.datas.items?.map((el) => el.country);
        this.countries = [...new Set(filteredCountries)];
        this.pager = this.pagerService.getPager(
          data.datas.totalCount,
          data.datas.currentPage,
          data.datas.pageSize,
        );
      },
    );
    this.route.queryParams.subscribe((values) => {
      this.searchText = values['searchText'];
      this.selectedCountryUID = values['searchCountry'];
    });
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();
  }
}
