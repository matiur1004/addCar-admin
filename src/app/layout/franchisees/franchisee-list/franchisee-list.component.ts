// Code behind logic for list of FranchiseeListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListPageWrapper } from '@app-shared/common/list-page-wrapper.model';
import { PagerService } from '@app-shared/common/pager.service';
import { FranchiseeListItem } from '@app-shared/models/franchisee-list-item.model';
import { FranchiseeService } from '@app-shared/services/franchisee/franchisee.service';
import { GlobalService } from '@app-shared/services/global.service';
import { NotificationService } from '@app-shared/services/notification.service';
import { SpinnerOverlayService } from '@app-shared/services/spinner-overlay.service';
import { MessageCodes } from '../../../shared/models/system/message-codes';

@Component({
  templateUrl: './franchisee-list.component.html',
})
export class FranchiseeListComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription; //Used for the current model retrieval from the resolver

  public pageWrapper: ListPageWrapper<FranchiseeListItem>;
  public franchisees: Array<FranchiseeListItem>;
  public pager: any = {};
  public queryParams: string;

  constructor(
    private readonly defaultService: FranchiseeService,
    private readonly pagerService: PagerService,
    private readonly spinnerService: SpinnerOverlayService,
    private readonly route: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly globalService: GlobalService,
  ) {
    // emit to sidebar component that current menu has no subfranchisee menu
    this.globalService.emitFranchiseeDetail(null);
  }

  public ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe(
      (data: { franchisees: ListPageWrapper<FranchiseeListItem> }) => {
        this.pageWrapper = data.franchisees;
        this.franchisees = data.franchisees.items;
        this.pager = this.pagerService.getPager(
          data.franchisees.totalCount,
          data.franchisees.currentPage,
          data.franchisees.pageSize,
        );
      },
    );
    this.getQueryParams();
  }

  private reloadList() {
    this.spinnerService.show();
    this.defaultService.getFranchisees(this.pager.currentPage).subscribe(
      (franchisee: ListPageWrapper<FranchiseeListItem>) => {
        this.pageWrapper = franchisee;
        this.franchisees = franchisee.items;
        this.pager = this.pagerService.getPager(
          franchisee.totalCount,
          franchisee.currentPage,
          franchisee.pageSize,
        );
        this.spinnerService.hide();
      },
      (err) => {
        this.spinnerService.hide();
        throw err;
      },
    );
  }

  public getQueryParams(): string{
    this.route.queryParams.subscribe(params => {
      this.queryParams = params.searchText;
    });
    return this.queryParams;
  }

  //Unsubscribe from subscriptions here
  public ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}
