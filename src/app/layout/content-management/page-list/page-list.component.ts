// Code behind logic for list of PageListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { OnInit, Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

import { PagerService } from "@app-shared/common/pager.service";
import { ListPageWrapper } from "@app-shared/common/list-page-wrapper.model";
import { NotificationService } from "@app-shared/services/notification.service";
import { SpinnerOverlayService } from "@app-shared/services/spinner-overlay.service";
import { PageListItem } from '@app-shared/models/page-management/page-list-item.model';
import { PageService } from '@app-shared/services/page-management/page.service';
import { NavigationService } from "../../../shared/services/navigation/navigation.service";
import { UserRoles } from "app/shared/models/enums";
import { AuthService } from "app/shared/services/auth.new.service";


@Component({
  templateUrl: './page-list.component.html'
})

export class PageListComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver

  pageWrapper: ListPageWrapper<PageListItem>;
  pages: Array<PageListItem>;
  pager: any = {};
  private searchTextSubscription: Subscription;
  franchiseeUid: string;
  isFranchiseeUser: boolean = false;

  constructor(private defaultService: PageService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router, private navigationService: NavigationService,
    private notificationService: NotificationService, private authService: AuthService) {
  }

  ngOnInit(): void {
    if(this.authService.isUserInRole(UserRoles.FranchiseeAdmin)) {
      this.isFranchiseeUser = true;
    }
    
    this.navigationService.setContextVariable("entityName", "Page");
    this.navigationService.setContextVariable("entityLink", "pages");
    this.routeDataSubscription = this.route.data.subscribe((data: { pages: ListPageWrapper<PageListItem> }) => {
      this.pageWrapper = data.pages;
      this.pages = data.pages.items;
      this.pager = this.pagerService.getPager(data.pages.totalCount, data.pages.currentPage, data.pages.pageSize);
    });
    this.searchTextSubscription = this.route.queryParams.subscribe(values => {
      this.franchiseeUid = values['franchiseeUid'];
    });
  }

  deletePage(uid: string) {
    this.defaultService.deletePage(uid).subscribe((res) => {
      this.notificationService.showSuccess("The page was deleted successfully");
      this.reloadList();
    });
  }

  clonePage(uid: string) {
    this.defaultService.clonePage(uid).subscribe((res) => {
      this.notificationService.showSuccess("The page was cloned successfully");
      this.reloadList();
    });
  }

  private reloadList() {
    this.spinnerService.show();
    this.defaultService.getPages(this.pager.currentPage).subscribe((page: ListPageWrapper<PageListItem>) => {
      this.pageWrapper = page;
      this.pages = page.items;
      this.pager = this.pagerService.getPager(page.totalCount, page.currentPage, page.pageSize);
      this.spinnerService.hide();
    }, (err) => {
      this.spinnerService.hide();
      throw err;
    });
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
  }
}
