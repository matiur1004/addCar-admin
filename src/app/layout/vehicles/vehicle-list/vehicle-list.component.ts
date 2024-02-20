// Code behind logic for list of VehicleListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { OnInit, Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

import { PagerService } from "@app-shared/common/pager.service";
import { ListPageWrapper } from "@app-shared/common/list-page-wrapper.model";
import { NotificationService } from "@app-shared/services/notification.service";
import { SpinnerOverlayService } from "@app-shared/services/spinner-overlay.service";
import { VehicleListItem } from '@app-shared/models/vehicle/vehicle-list-item.model';
import { VehicleService } from '@app-shared/services/vehicle/vehicle.service';


@Component({
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})

export class VehicleListComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver

  pageWrapper: ListPageWrapper<VehicleListItem>;
  vehicles: Array<VehicleListItem>;
  pager: any = {};
  public searchTextQueryParams: string;
  public categoriesQueryParams: string;

  constructor(private defaultService: VehicleService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: { vehicles: ListPageWrapper<VehicleListItem> }) => {
      this.pageWrapper = data.vehicles;
      this.vehicles = data.vehicles.items;
      this.pager = this.pagerService.getPager(data.vehicles.totalCount, data.vehicles.currentPage, data.vehicles.pageSize);
    });
    this.getQueryParams();
  }

  deleteVehicle(uid: string) {
    this.defaultService.deleteVehicle(uid).subscribe((res) => {
      this.notificationService.showSuccess("The vehicle was deleted successfully");
      this.reloadList();
    });
  }

  cloneVehicle(uid: string) {
    this.defaultService.cloneVehicle(uid).subscribe((res) => {
      this.notificationService.showSuccess("The vehicle was cloned successfully");
      this.reloadList();
    });
  }

  private reloadList() {
    this.spinnerService.show();
    this.defaultService.getVehicles(this.pager.currentPage, null, null).subscribe((vehicle: ListPageWrapper<VehicleListItem>) => {
      this.pageWrapper = vehicle;
      this.vehicles = vehicle.items;
      this.pager = this.pagerService.getPager(vehicle.totalCount, vehicle.currentPage, vehicle.pageSize);
      this.spinnerService.hide();
    }, (err) => {
      this.spinnerService.hide();
      throw err;
    });
  }
  public getQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.searchTextQueryParams = params.searchText;
      this.categoriesQueryParams = params.categories;

    });
    //return this.queryParams;
  };
  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();
  }
}
