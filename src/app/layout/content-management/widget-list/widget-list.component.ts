import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { Subscription } from 'rxjs';
import { WidgetListItem } from 'app/shared/models/widget/widget-list-item.model';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';
import { PageService } from 'app/shared/services/page-management/page.service';
import { PagerService } from 'app/shared/common/pager.service';
import { AuthService } from 'app/shared/services/auth.new.service';
import { UserRoles } from 'app/shared/models/enums';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver

  pageWrapper: ListPageWrapper<WidgetListItem>;
  pages: Array<WidgetListItem>;
  pager: any = {};
  private searchTextSubscription: Subscription;
  franchiseeUid: string;
  isFranchiseeUser: boolean = false;

  constructor(private defaultService: PageService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router, private navigationService: NavigationService,
    private notificationService: NotificationService,
    private readonly authService: AuthService,) {
  }

  ngOnInit(): void {
    if(this.authService.isUserInRole(UserRoles.FranchiseeAdmin)) {
      this.isFranchiseeUser = true;
    }
    this.navigationService.setContextVariable("entityName", "Widget", true);
    this.navigationService.setContextVariable("entityLink", "widgets", true);
    this.routeDataSubscription = this.route.data.subscribe((data: { pages: ListPageWrapper<WidgetListItem> }) => {
      this.pageWrapper = data.pages;
      this.pages = data.pages.items;
      this.pager = this.pagerService.getPager(data.pages.totalCount, data.pages.currentPage, data.pages.pageSize);
    });
    this.searchTextSubscription = this.route.queryParams.subscribe(values => {
      this.franchiseeUid = values['franchiseeUid'];
    });
    this.authService.isUserInRole(UserRoles.AddCarAdmin) ||
    this.authService.isUserInRole(UserRoles.FranchiseeAdmin)
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
    this.defaultService.getPages(this.pager.currentPage).subscribe((page: ListPageWrapper<WidgetListItem>) => {
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
