import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GracePeriodFilterViewModel } from 'app/shared/models/settings/grace-period-filter-view-model.model';
import { NotificationService } from 'app/shared/services/notification.service';
import { FiltersSettingsService } from 'app/shared/services/settings/filters-settings.service';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grace-period-filter',
  templateUrl: './grace-period-filter.component.html',
  styleUrls: ['./grace-period-filter.component.css']
})
export class GracePeriodFilterComponent implements OnInit {

  currentFilter: GracePeriodFilterViewModel;

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  
  constructor(
    private _service: FiltersSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerOverlayService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: { data: GracePeriodFilterViewModel }) => {
      this.currentFilter = data.data;
    });
  }

  onSubmit() {
    this.spinnerService.show();
    this._service.saveGracePeriodFilter(this.currentFilter).subscribe(()=> {
      this.spinnerService.hide();
      this.notificationService.showSuccess("Saved successfully");
    });
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();
  }
}
