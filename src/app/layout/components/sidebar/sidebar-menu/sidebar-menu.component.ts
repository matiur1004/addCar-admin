import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from '../../../../shared/services/navigation/navigation-config';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnDestroy {

  private _subscription: Subscription = new Subscription();

  public availableItems: MenuItem[] = [];

  constructor(
    navigationService: NavigationService) {
    this._subscription.add(navigationService.sideMenu.subscribe(a => this.availableItems = a));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
