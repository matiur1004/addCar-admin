import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { FranchiseeViewModel } from '@app-shared/models/franchisee-view-model.model';
import { AuthService } from '@app-shared/services/auth.new.service';
import { GlobalService } from '@app-shared/services/global.service';
import { UserRoles } from '@app-shared/models/enums';
import {VehicleViewModel} from "@app-shared/models/vehicle/vehicle-view-model.model";
import {VehicleService} from "@app-shared/services/vehicle/vehicle.service";
import {VehicleImageService} from "@app-shared/services/vehicle/vehicle-image.service";
import { MenuItem } from '../../../shared/services/navigation/navigation-config';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';
import {
  BreakpointObserver,
  BreakpointState
} from '@angular/cdk/layout';
import { BreadcrumbService } from 'app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public isActive: boolean;
  public isLoggedIn = true;
  public subscription: Subscription;
  public franchiseeDetailSubscription: Subscription;
  public vehicleSubscription: Subscription;
  
  public wideResolution: boolean = true;
  public get userName() {
    return this.authService.loggedUser;
  }
  public collapsed: boolean;
  public showMenu: string;
  public pushRightClass: string;
  public imagesCount: number;

  @Output() collapsedEvent = new EventEmitter<boolean>();
  public isnew: boolean;
  public isHome: boolean;
  public isusers: boolean;
  public iscontentmanagement: boolean;
  public isfranchis: boolean;
  public istemplatefields: boolean;
  public isVehicle: boolean;
  public isVehicleImages: boolean;
  public isVehicleDetails: boolean;
  public isSettings: boolean;


  public franchiseDetail: FranchiseeViewModel;
  public vehicleDetails: VehicleViewModel;
  public franchiseeUid: string;

  private _subscription: Subscription = new Subscription();

  public availableItems: MenuItem[] = [];
  public availableTopItems: MenuItem[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly vs: VehicleImageService,
    public readonly router: Router,
    private readonly globalService: GlobalService,
    navigationService: NavigationService,
    public breakpointObserver: BreakpointObserver,
    public breadCrumbService: BreadcrumbService) {
    this._subscription.add(navigationService.sideMenu.subscribe(a => { this.availableItems = a; this.breadCrumbService.sideMenuItems.next(a);}));
    this._subscription.add(navigationService.topMenu.subscribe(a => this.availableTopItems = a));

    this.franchiseDetail = null;
    this.vehicleDetails = null;
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isnew = router.url.indexOf('/new') > -1;
        this.isHome = router.url.indexOf('/home') > -1;
        this.isusers = router.url.indexOf('/users') > -1;
        this.iscontentmanagement = router.url.indexOf('/content-management') > -1;
        this.isfranchis = router.url.indexOf('/franchisees') > -1;
        this.istemplatefields = router.url.indexOf('/template-fields') > -1;
        this.isVehicle = router.url.indexOf('/vehicles') > -1;
        this.isVehicleImages = router.url.indexOf('/images') > -1;
        this.isVehicleDetails = router.url.indexOf('/vehicles/') > -1 && router.url.indexOf('/page') == -1;
        this.isSettings = router.url.indexOf('/settings') > -1;

        if (window.innerWidth <= 992 && this.isToggled()) {
          this.toggleSidebar();
        }
      }
    });
    this.vehicleSubscription = this.globalService._vehicleDetailsSource.subscribe(
      (vehicleDetails) => {
        this.vehicleDetails = vehicleDetails;
        this.vs.getVehicleCount(vehicleDetails.uid).subscribe((res) => {
          this.imagesCount = res;
        });
      },
    );
    this.franchiseeDetailSubscription = this.globalService._franchiseeDetailSource.subscribe(
      (franchiseeDetail) => {
        this.franchiseDetail = franchiseeDetail;
      },
    );
  }

  public ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 990px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.wideResolution = false;
        } else {
          this.wideResolution = true;
        }
      });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.subscription = this.authService.authNavStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.isActive = false;
    this.collapsed = false;
    this.showMenu = '';
    this.pushRightClass = 'push-right';
  }

  public eventCalled() {
    this.isActive = !this.isActive;
  }

  public addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  public toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  public isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  public toggleSidebar() {
    const dom: Element = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  public rltAndLtr() {
    const dom: Element = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  public onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }

  public ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
    this.franchiseeDetailSubscription.unsubscribe();
    this._subscription.unsubscribe();
  }

  public get showFranchiseItems(): boolean {
    return this.franchiseDetail && this.isfranchis;
  }

  public logout() {
    this.authService.logout().subscribe((res) => { });
  }

  public get hasUsersAccess(): boolean {
    return (
      this.authService.isUserInRole(UserRoles.AddCarAdmin) ||
      this.authService.isUserInRole(UserRoles.FranchiseeAdmin)
    );
  }

  public get hasFranchiseesAccess(): boolean {
    return (
      this.authService.isUserInRole(UserRoles.AddCarAdmin) ||
      this.authService.isUserInRole(UserRoles.AddCarUser)
    );
  }

  onMenuClick(menuItem: MenuItem): void {
    this.breadCrumbService.onChangeMenu(menuItem);
  }

  private getPicturesCount(vehicleDetails: VehicleViewModel): number {
    return vehicleDetails.categories.length;
  }
}
