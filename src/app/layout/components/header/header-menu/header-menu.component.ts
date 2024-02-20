import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth.new.service';
import { FranchiseeService } from '../../../../shared/services/franchisee/franchisee.service';
import { MenuItem } from '../../../../shared/services/navigation/navigation-config';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnInit, OnDestroy {

  public activeTitle = "";

  private _subscription: Subscription = new Subscription();

  public availableItems: MenuItem[] = [];

  constructor(
    navigationService: NavigationService,
    private authService: AuthService,
    private franchiseService: FranchiseeService) {
    this._subscription.add(navigationService.topMenu.subscribe(a => this.availableItems = a));
  }

  //availableItems() {
  //  return this._items.filter(x => x.roles.some(r => this.authService.isUserInRole(r)) || x.roles.length == 0);
  //}

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
