import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from './navigation/navigation-config';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  sideMenuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject(null);

  private _menuItem: BehaviorSubject<MenuItem> = new BehaviorSubject(null);
  
  get menuItem$(): Observable<MenuItem> {
    return this._menuItem.asObservable();
  }

  get sideMenuItems$(): Observable<MenuItem[]> {
    return this.sideMenuItems.asObservable();
  }
  
  constructor() { }

  onChangeMenu(menuItem: MenuItem): void {
    this._menuItem.next(menuItem);
  }
}
